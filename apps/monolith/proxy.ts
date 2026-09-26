import { createLocaleProxy } from '@fairgarden/indicators/proxy'
import { indicators as id } from '@fairgarden/id/lib/indicators'

// A deployment has one proxy, so locale detection for every mounted app runs
// here, at each app's root. An app's own proxy.ts is not mounted.
export const proxy = createLocaleProxy({ '/id': id })

// Written out rather than taken from `proxy.matcher`: Next reads this from
// the source at build time.
export const config = { matcher: ['/id'] }
