// Book search via Open Library. Replaces Spotify search. See MIGRATION_CHECKPOINT.md.
// GET https://openlibrary.org/search.json?q=… (params: q, limit, page, fields). Cached in Redis.

import { NextResponse, NextRequest } from "next/server";
import { getRedisClient } from "../redis";

const OPEN_LIBRARY_SEARCH = "https://openlibrary.org/search.json";
const CACHE_TTL_SEC = 3600 * 24 * 90; // 90 days
const DEFAULT_LIMIT = 20;
const FIELDS =
  "key,title,author_name,first_publish_year,cover_i,edition_count,subject,ratings_average,ratings_count";

function buildCoverUrl(cover_i: number | undefined): string | undefined {
  if (cover_i == null || cover_i < 0) return undefined;
  return `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
}

function normalizeWorkId(key: string): string {
  const m = key.match(/OL\d+W/i);
  return m ? m[0].toUpperCase() : key;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const limit = Math.min(
    Number(searchParams.get("limit")) || DEFAULT_LIMIT,
    50,
  );
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  if (!q || !q.trim()) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  const cacheKey = `booksearch:${q.trim().toLowerCase()}:${limit}:${page}`;

  // Try cache with short timeout so missing/unreachable Redis doesn't hang the request
  let cached: string | null = null;
  try {
    const redisClient = getRedisClient();
    cached = await Promise.race([
      redisClient.get(cacheKey),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000)),
    ]);
  } catch (_) {
    // Redis unavailable or slow — proceed without cache
  }
  if (cached) {
    return NextResponse.json(JSON.parse(cached));
  }

  const params = new URLSearchParams({
    q: q.trim(),
    limit: String(limit),
    page: String(page),
    fields: FIELDS,
  });

  try {
    const res = await fetch(`${OPEN_LIBRARY_SEARCH}?${params}`, {
      headers: {
        "User-Agent":
          process.env.OPEN_LIBRARY_USER_AGENT || "RecommendationApp/1.0",
      },
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: "Open Library search failed", docs: [] },
        { status: 502 },
      );
    }
    const data = await res.json();
    const docs = (data.docs || []).map((d: Record<string, unknown>) => {
      const key = (d.key as string) || "";
      const cover_i = d.cover_i as number | undefined;
      return {
        ...d,
        work_id: normalizeWorkId(key),
        cover_url: buildCoverUrl(cover_i),
        author_name: d.author_name,
      };
    });
    const out = {
      num_found: data.num_found ?? data.numFound ?? 0,
      start: data.start ?? 0,
      docs,
    };
    // Cache in background; don't block or fail the response if Redis is down
    try {
      const redisClient = getRedisClient();
      await Promise.race([
        redisClient.set(cacheKey, JSON.stringify(out), "EX", CACHE_TTL_SEC),
        new Promise<void>((resolve) => setTimeout(() => resolve(), 2000)),
      ]);
    } catch (_) {
      // ignore
    }
    return NextResponse.json(out);
  } catch (err) {
    return NextResponse.json(
      { error: "Search failed", docs: [] },
      { status: 500 },
    );
  }
}
