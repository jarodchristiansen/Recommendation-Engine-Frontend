/**
 * Open Library cover URLs. Static CDN — no API call.
 * Prefer cover_id (by id) when available; fall back to work_key (olid) when not.
 * Olid endpoint returns a blank image when no cover exists; use ?default=false to get 404 so we can show a fallback.
 */

const COVERS_BY_ID_BASE = "https://covers.openlibrary.org/b/id";
const COVERS_BY_OLID_BASE = "https://covers.openlibrary.org/b/olid";

/** Query param: return 404 instead of blank image when cover missing (so onError can show fallback). */
const DEFAULT_FALSE = "?default=false";

/** Build cover URL from Open Library cover ID (numeric). Returns null if invalid. Uses ?default=false so missing covers 404 and we can show placeholder. */
export function getCoverUrlFromId(
  coverId: number | null | undefined,
): string | null {
  if (coverId == null || coverId === 0 || Number.isNaN(Number(coverId)))
    return null;
  const id = Number(coverId);
  if (id < 0) return null;
  return `${COVERS_BY_ID_BASE}/${id}-M.jpg${DEFAULT_FALSE}`;
}

/** Build cover URL from work_key (e.g. /works/OL17930368W). Fallback when cover_id is missing. Uses ?default=false so missing covers 404 and we can show placeholder. */
export function getCoverUrlFromWorkKey(
  workKey: string | null | undefined,
): string | null {
  if (!workKey || typeof workKey !== "string") return null;
  const olid = workKey.replace(/^\/works\//, "").trim();
  return olid ? `${COVERS_BY_OLID_BASE}/${olid}-M.jpg${DEFAULT_FALSE}` : null;
}

/** Path to default "no cover" image in public. Use when cover URL fails to load or is missing. */
export const FALLBACK_COVER_PATH = "/images/no-cover-found.png";

/**
 * Best-available cover URL: only use when we have a numeric cover_id or cover_i.
 * We do NOT use work_key (olid) here because Open Library often returns a blank
 * image for olid, and ?default=false does not reliably 404 in all cases.
 * When only work_key is available, return null so the UI shows the fallback image.
 */
export function getCoverUrl(options: {
  cover_id?: number | null;
  cover_i?: number | null;
  work_key?: string | null;
}): string | null {
  return getCoverUrlFromId(options.cover_id ?? options.cover_i);
}

/** Public work page on openlibrary.org (for reader-facing detail links). */
export function openLibraryWorkPageUrl(workId: string | null | undefined): string | null {
  if (!workId || typeof workId !== "string") return null;
  const olid = workId.replace(/^\/works\//, "").trim();
  if (!olid) return null;
  return `https://openlibrary.org/works/${encodeURIComponent(olid)}`;
}
