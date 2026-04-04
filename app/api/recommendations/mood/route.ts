// Proxies to recommendation-server POST /recommend/mood (Feature 2: mood/vibe filter).
import { NextRequest, NextResponse } from "next/server";

import { getRedisClient, redisGetCached, redisSetCache } from "../../redis";

const CACHE_TTL_SEC = 3600 * 24;
const CACHE_VERSION = "v2";

function recommendBaseUrl(): string {
  return process.env.REC_SERVICE_URL?.trim() || "http://127.0.0.1:8000";
}

export async function POST(request: NextRequest) {
  let body: { mood: string; limit?: number };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const mood = body?.mood?.trim().toLowerCase();
  if (!mood) {
    return NextResponse.json({ error: "mood is required" }, { status: 400 });
  }

  const limit = Math.min(body.limit ?? 10, 20);
  const cacheKey = `mood:${mood}:limit${limit}:${CACHE_VERSION}`;

  const redisClient = getRedisClient();
  const cached = await redisGetCached(redisClient, cacheKey);
  if (cached) {
    return NextResponse.json(JSON.parse(cached));
  }

  const baseUrl = recommendBaseUrl();
  const token = process.env.REC_SERVICE_TOKEN;

  try {
    const res = await fetch(`${baseUrl.replace(/\/$/, "")}/recommend/mood`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ mood, limit }),
      signal: AbortSignal.timeout(25000),
    });

    const data = (await res.json()) as {
      mood?: string;
      recommendations?: unknown[];
      detail?: unknown;
    };

    if (!res.ok) {
      return NextResponse.json(
        {
          error:
            typeof data.detail === "string"
              ? data.detail
              : JSON.stringify(data.detail ?? data),
        },
        { status: res.status },
      );
    }

    if ((data.recommendations ?? []).length > 0) {
      await redisSetCache(
        redisClient,
        cacheKey,
        JSON.stringify(data),
        CACHE_TTL_SEC,
      );
    }

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      {
        error: e instanceof Error ? e.message : "Recommendation service error",
      },
      { status: 502 },
    );
  }
}
