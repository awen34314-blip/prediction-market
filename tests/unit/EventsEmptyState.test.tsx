import { render, screen } from '@testing-library/react'
import { describe, expect, it, mock } from 'bun:test'

import EventsEmptyState from '@/app/[locale]/(platform)/event/[slug]/_components/EventsEmptyState'

void mock.module('@/app/[locale]/(platform)/_providers/FilterProvider', () => ({
  useFilters: () => ({ updateFilters: mock() }),
}))

describe('home empty state', () => {
  it.each(['new', 'trending'])('does not present the %s navigation slug as a market category', (tag) => {
    render(<EventsEmptyState tag={tag} searchQuery="" />)
    expect(screen.getByText('No events match your filters.')).toBeInTheDocument()
    expect(screen.queryByText(/category/)).not.toBeInTheDocument()
  })
})
