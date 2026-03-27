// Proxies to recommendation-server book recommendations (Zilliz). POST /recommend with work_key + metadata.
import { NextRequest, NextResponse } from "next/server";

import { getRedisClient } from "../redis";

const CACHE_TTL_SEC = 3600 * 24 * 30; // 30 days
const CACHE_KEY_PREFIX = "rec:zilliz:";
const CACHE_KEY_VERSION = "v1";
/** Open Library work OL…W id inside a path or raw string */
const OL_WORK_KEY_RE = /OL\d+W/i;

function normalizeWorkKey(workId: string): string {
  const trimmed = workId.trim();
  const m = OL_WORK_KEY_RE.exec(trimmed);
  const id = m ? m[0].toUpperCase() : trimmed.replace(/^\/works\//, "");
  return id.startsWith("/") ? id : `/works/${id}`;
}

async function callRecommendService(body: {
  work_key: string;
  title: string;
  author_name: string;
  subjects: string[];
}): Promise<{ recommendations: unknown[]; fallback_used: boolean }> {
  const baseUrl = process.env.REC_SERVICE_URL || "http://localhost:8000";
  const token = process.env.REC_SERVICE_TOKEN;
  const url = `${baseUrl}/recommend`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(25000),
  });
  const data = (await res.json()) as {
    recommendations?: unknown[];
    fallback_used?: boolean;
    detail?: unknown;
  };
  if (!res.ok) {
    throw new Error(
      typeof data.detail === "string"
        ? data.detail
        : JSON.stringify(data.detail ?? data),
    );
  }
  return {
    recommendations: data.recommendations ?? [],
    fallback_used: data.fallback_used ?? false,
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const work_id = searchParams.get("work_id");

  if (!work_id?.trim()) {
    return NextResponse.json({ error: "work_id is required" }, { status: 400 });
  }

  const work_key = normalizeWorkKey(work_id);
  const cacheKey = `${CACHE_KEY_PREFIX}${work_key}:${CACHE_KEY_VERSION}`;

  try {
    const redisClient = getRedisClient();
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return NextResponse.json(JSON.parse(cached));
    }
  } catch {
    // proceed without cache
  }

  // GET is work_id-only; no Open Library fetch. Recommendations only when book is in Zilliz (Tier 1).
  const body = {
    work_key,
    title: "",
    author_name: "",
    subjects: [] as string[],
  };

  try {
    const response = await callRecommendService(body);
    try {
      const redisClient = getRedisClient();
      if (response.recommendations.length > 0) {
        await redisClient.set(
          cacheKey,
          JSON.stringify(response),
          "EX",
          CACHE_TTL_SEC,
        );
      }
    } catch {
      // ignore cache write errors
    }
    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json(
      {
        error: e instanceof Error ? e.message : "Recommendation service error",
      },
      { status: 502 },
    );
  }
}

export async function POST(request: NextRequest) {
  let body: {
    work_key: string;
    title?: string;
    author_name?: string;
    subjects?: string[];
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body?.work_key?.trim()) {
    return NextResponse.json(
      { error: "work_key is required" },
      { status: 400 },
    );
  }

  const work_key = normalizeWorkKey(body.work_key);
  const payload = {
    work_key,
    title: (body.title ?? "").trim(),
    author_name: (body.author_name ?? "").trim(),
    subjects: Array.isArray(body.subjects) ? body.subjects : [],
  };

  const cacheKey = `${CACHE_KEY_PREFIX}${work_key}:${CACHE_KEY_VERSION}`;

  try {
    const redisClient = getRedisClient();
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return NextResponse.json(JSON.parse(cached));
    }
  } catch {
    // proceed without cache
  }

  try {
    const response = await callRecommendService(payload);
    try {
      const redisClient = getRedisClient();
      if (response.recommendations.length > 0) {
        await redisClient.set(
          cacheKey,
          JSON.stringify(response),
          "EX",
          CACHE_TTL_SEC,
        );
      }
    } catch {
      // ignore
    }
    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json(
      {
        error: e instanceof Error ? e.message : "Recommendation service error",
      },
      { status: 502 },
    );
  }
}
