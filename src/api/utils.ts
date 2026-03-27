// src/api/utils.ts

/** Default simulated API latency in milliseconds */
export const DEFAULT_DELAY_MS = 200

/**
 * When VITE_INSTANT_MOCK=true, all mock API functions resolve immediately.
 * Set this in .env.local for tests or when you want instant data in development.
 */
export const INSTANT_MOCK =
  import.meta.env.VITE_INSTANT_MOCK === 'true'

/** Returns a Promise that resolves after `ms` milliseconds */
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Use this in every mock API function instead of delay() directly.
 * Skips the delay entirely when VITE_INSTANT_MOCK=true.
 *
 * @param ms - milliseconds to wait (default: DEFAULT_DELAY_MS)
 */
export const mockDelay = (ms: number = DEFAULT_DELAY_MS): Promise<void> =>
  INSTANT_MOCK ? Promise.resolve() : delay(ms)
