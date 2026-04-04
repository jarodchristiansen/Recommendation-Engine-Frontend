import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getRedisClient, redisGetCached, redisSetCache } from "../redis";

const CACHE_TTL_SEC = 3600 * 24 * 30;
const CACHE_KEY_PREFIX = "rec:zilliz:";
const CACHE_KEY_VERSION = "v2";
const OL_WORK_KEY_RE = /OL\d+W/i;

function normalizeWorkKey(workId: string): string {
  const trimmed = workId.trim();
  const m = OL_WORK_KEY_RE.exec(trimmed);
  const id = m ? m[0].toUpperCase() : trimmed.replace(/^\/works\//, "");
  return id.startsWith("/") ? id : `/works/${id}`;
}

function payloadFingerprint(parts: {
  title: string;
  author_name: string;
  subjects: string[];
}): string {
  const normalized = JSON.stringify({
    t: parts.title.trim(),
    a: parts.author_name.trim(),
    s: [...parts.subjects]
      .map((x) => String(x).trim().toLowerCase())
      .filter(Boolean)
      .sort(),
  });
  return createHash("sha256").update(normalized).digest("hex").slice(0, 12);
}

function recommendBaseUrl(): string {
  return process.env.REC_SERVICE_URL?.trim() || "http://127.0.0.1:8000";
}

async function callRecommendService(body: {
  work_key: string;
  title: string;
  author_name: string;
  subjects: string[];
}): Promise<{ recommendations: unknown[]; fallback_used: boolean }> {
  const baseUrl = recommendBaseUrl();
  const token = process.env.REC_SERVICE_TOKEN;
  const url = `${baseUrl.replace(/\/$/, "")}/recommend`;
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
  const fp = payloadFingerprint({ title: "", author_name: "", subjects: [] });
  const cacheKey = `${CACHE_KEY_PREFIX}${work_key}:${fp}:${CACHE_KEY_VERSION}`;

  const redisClient = getRedisClient();
  const cached = await redisGetCached(redisClient, cacheKey);
  if (cached) {
    return NextResponse.json(JSON.parse(cached));
  }

  const body = {
    work_key,
    title: "",
    author_name: "",
    subjects: [] as string[],
  };

  try {
    const response = await callRecommendService(body);
    if (response.recommendations.length > 0) {
      await redisSetCache(
        redisClient,
        cacheKey,
        JSON.stringify(response),
        CACHE_TTL_SEC,
      );
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

  const fp = payloadFingerprint(payload);
  const cacheKey = `${CACHE_KEY_PREFIX}${work_key}:${fp}:${CACHE_KEY_VERSION}`;

  const redisClient = getRedisClient();
  const cached = await redisGetCached(redisClient, cacheKey);
  if (cached) {
    return NextResponse.json(JSON.parse(cached));
  }

  try {
    const response = await callRecommendService(payload);
    if (response.recommendations.length > 0) {
      await redisSetCache(
        redisClient,
        cacheKey,
        JSON.stringify(response),
        CACHE_TTL_SEC,
      );
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
