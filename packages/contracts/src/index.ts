/**
 * @fireside-dashboard/contracts
 *
 * Public interface for frontend applications to consume types from the Bun Monorepo.
 * This package aggregates and re-exports types from multiple internal packages.
 *
 * @exports
 * - From `@fireside-dashboard/api`: `App`, `Auth` (Elysia app type for Eden, Better Auth type)
 *
 * @security
 * - Only TYPE exports from @fireside-dashboard/api (no runtime code)
 *
 * @usage Frontend apps (ui) should import from this package:
 * ```ts
 * import type { App } from "@fireside-dashboard/contracts";
 * ```
 */

// Re-export API types (type-only - App for Elysia app type for Eden)
export type { App } from "@fireside-dashboard/api";
