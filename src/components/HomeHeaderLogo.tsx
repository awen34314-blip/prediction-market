'use client'

import HeaderLogo from '@/components/HeaderLogo'
import { usePathname } from '@/i18n/navigation'

export default function HomeHeaderLogo() {
  const pathname = usePathname()
  return <HeaderLogo asHeading={pathname === '/'} />
}
