// Proxies to recommendation-server book recommendations. Book-only (work_id).
import { NextRequest, NextResponse } from "next/server";

import { getRedisClient } from "../redis";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const work_id = searchParams.get("work_id");

  if (!work_id?.trim()) {
    return NextResponse.json(
      { error: "work_id is required" },
      { status: 400 }
    );
  }

  const redisClient = getRedisClient();
  const cacheKey = `book:${work_id}-recType:cosine-similarity`;

  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    return NextResponse.json(JSON.parse(cachedData));
  }

  const recServiceToken = process.env.REC_SERVICE_TOKEN;
  const baseUrl = process.env.REC_SERVICE_URL || "http://localhost:8000";
  const path = `/recommendations/books/cosine-similarity/${encodeURIComponent(work_id.trim())}`;
  const endUrl = `${baseUrl}${path}?token=${recServiceToken}`;

  const res = await fetch(endUrl, {
    headers: { Authorization: `Bearer ${recServiceToken}` },
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      data?.detail ?? { error: "Recommendation service error" },
      { status: res.status }
    );
  }

  const response = {
    recommendations: data?.recommendations ?? [],
    target_features: data?.target_features ?? {},
  };

  if (response.recommendations.length > 0) {
    await redisClient.set(cacheKey, JSON.stringify(response), "EX", 3600 * 24 * 30);
  }

  return NextResponse.json(response, { status: 200 });
}
