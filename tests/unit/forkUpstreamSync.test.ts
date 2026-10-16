import { afterEach, beforeEach, describe, expect, it } from 'bun:test'
import { execFileSync, spawnSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const script = resolve(import.meta.dir, '../../scripts/sync-upstream.sh')
// Hooks export repository-local variables. A fixture's cwd alone does not override
// GIT_DIR or GIT_COMMON_DIR, so remove them before creating or changing a test repo.
const repositoryEnvKeys = new Set(
  execFileSync('git', ['rev-parse', '--local-env-vars'], { encoding: 'utf8' }).trim().split('\n'),
)
const fixtureEnv = Object.fromEntries(Object.entries(process.env).filter(([key]) => !repositoryEnvKeys.has(key)))
let directory: string
let baseline: string

function git(...args: string[]) {
  return execFileSync('git', args, {
    cwd: directory,
    env: fixtureEnv,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim()
}

function write(path: string, content: string) {
  writeFileSync(join(directory, path), content)
}

function commit(message: string) {
  git('add', '.')
  git('commit', '-m', message)
  return git('rev-parse', 'HEAD')
}

function upstream(change: () => void) {
  git('switch', '-c', 'upstream-changes', baseline)
  change()
  const revision = commit('Upstream change')
  git('update-ref', 'refs/remotes/upstream/main', revision)
  git('switch', 'main')
  return revision
}

function sync() {
  return spawnSync('bash', [script], { cwd: directory, env: fixtureEnv, encoding: 'utf8' })
}

beforeEach(() => {
  directory = mkdtempSync(join(tmpdir(), 'windmarket-fork-sync-'))
  git('init', '-b', 'main')
  git('config', 'user.name', 'Sync Test')
  git('config', 'user.email', 'sync@example.invalid')
  git('config', 'commit.gpgsign', 'false')
  git('config', 'core.hooksPath', '/dev/null')
  mkdirSync(join(directory, '.github/workflows'), { recursive: true })
  write('.github/workflows/sync.yml', 'fork-owned workflow\n')
  write('page.txt', 'Original title\n' + 'body\n'.repeat(12) + 'Original footer\n')
  baseline = commit('Initial upstream')
  write('brand.txt', 'WindMarket\n')
  commit(`Retain fork branding\n\nUpstream: ${baseline}`)
  git('update-ref', 'refs/remotes/upstream/main', baseline)
})

afterEach(() => {
  rmSync(directory, { recursive: true, force: true })
})

describe('fork upstream synchronization', () => {
  it('preserves fork additions and merges independent edits in the same file', () => {
    write('page.txt', 'WindMarket title\n' + 'body\n'.repeat(12) + 'Original footer\n')
    commit('Customize title')
    const target = upstream(() => {
      write('page.txt', 'Original title\n' + 'body\n'.repeat(12) + 'Updated footer\n')
      write('.github/workflows/sync.yml', 'upstream workflow\n')
    })

    expect(sync().status).toBe(0)
    expect(readFileSync(join(directory, 'brand.txt'), 'utf8')).toBe('WindMarket\n')
    expect(readFileSync(join(directory, 'page.txt'), 'utf8')).toBe(
      'WindMarket title\n' + 'body\n'.repeat(12) + 'Updated footer\n',
    )
    expect(readFileSync(join(directory, '.github/workflows/sync.yml'), 'utf8')).toBe('fork-owned workflow\n')
    expect(git('log', '-1', '--format=%B')).toContain(`Upstream: ${target}`)
  })

  it('does not replace conflicting fork edits or create a commit', () => {
    write('page.txt', 'WindMarket title\n')
    commit('Customize page')
    upstream(() => write('page.txt', 'Different upstream title\n'))
    const before = git('rev-parse', 'HEAD')

    expect(sync().status).not.toBe(0)
    expect(git('rev-parse', 'HEAD')).toBe(before)
    expect(git('diff', '--name-only', '--diff-filter=U')).toBe('page.txt')
  })

  it('leaves an already synchronized fork unchanged', () => {
    const before = git('rev-parse', 'HEAD')
    expect(sync().status).toBe(0)
    expect(git('rev-parse', 'HEAD')).toBe(before)
    expect(git('status', '--porcelain')).toBe('')
  })

  it('refuses uncommitted local changes', () => {
    upstream(() => write('new.txt', 'upstream addition\n'))
    write('brand.txt', 'Uncommitted brand change\n')
    const before = git('rev-parse', 'HEAD')

    expect(sync().status).not.toBe(0)
    expect(git('rev-parse', 'HEAD')).toBe(before)
    expect(readFileSync(join(directory, 'brand.txt'), 'utf8')).toBe('Uncommitted brand change\n')
  })
})
