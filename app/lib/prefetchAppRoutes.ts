/** Router from `useRouter()` (App Router); only `prefetch` is required. */
export type AppPrefetchRouter = { prefetch: (href: string) => void };

const APP_ROUTES_TO_PREFETCH = ["/recommendations", "/auth", "/dashboard"] as const;

export function prefetchAppRoutes(router: AppPrefetchRouter): void {
  for (const path of APP_ROUTES_TO_PREFETCH) {
    router.prefetch(path);
  }
}
