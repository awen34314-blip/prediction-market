import type { ImageProps } from 'next/image'

import Image from 'next/image'

import { cn } from '@/lib/utils'

export function isEventMarketIconUrl(url: string | null | undefined) {
  const normalizedUrl = url?.trim() ?? ''
  return normalizedUrl.includes('/events/icons/') || normalizedUrl.includes('/markets/icons/')
}

export function isPublicCatalogIcon(src: ImageProps['src']) {
  if (typeof src !== 'string') {
    return false
  }
  try {
    const url = new URL(src)
    return (
      url.protocol === 'https:' &&
      url.hostname.endsWith('.supabase.co') &&
      /^\/storage\/v1\/object\/public\/kuest-assets\/icons\/source\/[^/]+\.png$/.test(url.pathname)
    )
  } catch {
    return false
  }
}

interface EventIconImageProps extends Omit<ImageProps, 'className' | 'fill' | 'height' | 'width'> {
  containerClassName?: string
  imageClassName?: string
}

export default function EventIconImage({
  src,
  alt,
  sizes = '100vw',
  containerClassName,
  imageClassName,
  unoptimized,
  ...props
}: EventIconImageProps) {
  if (typeof src === 'string' && !src.trim()) {
    return null
  }

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      <Image
        {...props}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        // Small public catalog icons already have CDN caching. Use the original
        // so their visibility does not depend on wsrv.nl's crawler restrictions.
        unoptimized={unoptimized ?? isPublicCatalogIcon(src)}
        className={cn('shrink-0 object-cover object-center', imageClassName)}
      />
    </div>
  )
}
