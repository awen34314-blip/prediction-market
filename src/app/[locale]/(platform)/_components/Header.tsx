import HeaderMenu from '@/app/[locale]/(platform)/_components/HeaderMenu'
import HeaderSearch from '@/app/[locale]/(platform)/_components/HeaderSearch'
import HowItWorksDeferred from '@/app/[locale]/(platform)/_components/HowItWorksDeferred'
import HeaderLogo from '@/components/HeaderLogo'
import { cn } from '@/lib/utils'

export default async function Header() {
  return (
    <header data-windmarket-header className="top-0 z-30 bg-background lg:sticky">
      <div
        className={cn(
          `wm-header-inner relative z-50 container mx-auto flex min-h-15 w-full items-center justify-between gap-4 py-3 pb-1 md:min-h-17 md:pb-2`,
        )}
      >
        <HeaderLogo />
        <div className="wm-header-search hidden w-full items-center gap-2 lg:flex">
          <HeaderSearch />
        </div>
        <div className="min-w-0 shrink md:min-w-fit md:shrink-0">
          <div className="flex min-w-0 items-center gap-2">
            <HowItWorksDeferred />
            <HeaderMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
