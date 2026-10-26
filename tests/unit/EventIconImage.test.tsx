import { render, screen } from '@testing-library/react'
import { describe, expect, it, mock } from 'bun:test'
import { createElement } from 'react'

import EventIconImage, { isPublicCatalogIcon } from '@/components/EventIconImage'

void mock.module('next/image', () => ({
  default: function MockNextImage({ fill: _fill, unoptimized, ...props }: any) {
    return createElement('img', { ...props, 'data-unoptimized': String(unoptimized) })
  },
}))

describe('eventIconImage', () => {
  it('uses the small public catalog originals while preserving the optimizer for other images', () => {
    const src = 'https://assets.supabase.co/storage/v1/object/public/kuest-assets/icons/source/btc.png'
    render(<EventIconImage src={src} alt="Public catalog icon" />)
    expect(screen.getByAltText('Public catalog icon')).toHaveAttribute('data-unoptimized', 'true')
    expect(screen.getByAltText('Public catalog icon')).toHaveAttribute('src', src)
    const optimizedUrls = [
      '/images/logo.png',
      'https://cdn.example.com/photo.png',
      'https://assets.supabase.co/storage/v1/object/public/kuest-assets/photos/large.png',
      'https://assets.supabase.co.evil.example/storage/v1/object/public/kuest-assets/icons/source/btc.png',
    ]
    optimizedUrls.forEach((url) => {
      expect(isPublicCatalogIcon(url)).toBe(false)
    })
    render(<EventIconImage src={src} alt="Explicitly optimized icon" unoptimized={false} />)
    expect(screen.getByAltText('Explicitly optimized icon')).toHaveAttribute('data-unoptimized', 'false')
  })

  it('uses object-cover without forcing extra zoom by default', () => {
    const { container } = render(
      <EventIconImage src="/images/test.png" alt="Test event" sizes="40px" containerClassName="size-10 rounded-sm" />,
    )

    expect(container.firstChild).toHaveClass('relative', 'overflow-hidden', 'size-10', 'rounded-sm')
    expect(screen.getByAltText('Test event')).toHaveClass('object-cover', 'object-center')
    expect(screen.getByAltText('Test event')).not.toHaveClass('scale-[1.35]')
  })

  it('still merges custom image classes', () => {
    render(
      <EventIconImage
        src="/images/test.png"
        alt="Contained event"
        sizes="40px"
        imageClassName="rounded-md object-contain"
      />,
    )

    expect(screen.getByAltText('Contained event')).toHaveClass('rounded-md', 'object-contain')
  })
})
