#!/usr/bin/env bash
set -euo pipefail

# Apply only changes since the recorded upstream revision. Comparing the entire
# fork tree to upstream would delete WindMarket's branding and SEO customizations.
if [[ -n "$(git status --porcelain)" ]]; then
  echo 'Refusing to sync a dirty working tree.' >&2
  exit 1
fi

target_commit=$(git rev-parse --verify "${1:-upstream/main}^{commit}")
sync_message=$(git log --topo-order -1 --format=%B --grep='^Upstream:')
base_commit=$(printf '%s\n' "$sync_message" | sed -nE 's/^Upstream: ([0-9a-f]{40})$/\1/p')
if [[ ! "$base_commit" =~ ^[0-9a-f]{40}$ ]]; then
  echo 'No unambiguous upstream baseline found; manual reconciliation is required.' >&2
  exit 1
fi
if [[ "$base_commit" == "$target_commit" ]]; then
  echo "Already synced to $target_commit."
  exit 0
fi
if ! git merge-base --is-ancestor "$base_commit" "$target_commit"; then
  echo 'Upstream does not descend from the recorded baseline; refusing to overwrite the fork.' >&2
  exit 1
fi

patch_file=$(mktemp)
trap 'rm -f "$patch_file"' EXIT
git diff --binary "$base_commit" "$target_commit" -- . ':(exclude).github/workflows/**' > "$patch_file"
if [[ -s "$patch_file" ]]; then
  # Three-way merge preserves fork edits and stops on conflicts before any push.
  git apply --3way --index < "$patch_file"
fi
git commit --allow-empty -m "Sync upstream ${target_commit:0:7}" -m "Upstream: $target_commit"
