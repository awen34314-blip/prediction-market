// Failed configuration reads must recover sooner than the 15-minute default.
// Keep expire at five minutes so fallback documents remain eligible for prerendering.
export const PUBLIC_CONFIG_FAILURE_CACHE_LIFE = {
  stale: 30,
  revalidate: 5,
  expire: 300,
} as const
