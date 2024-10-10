// File: app/api/recently-played/route.ts
import { NextRequest, NextResponse } from "next/server";

import { getRedisClient } from "../redis";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const track = searchParams.get("track");
  const recType = searchParams.get("recType") || "cosine-similarity";

  const redisClient = getRedisClient();
  const cacheKey = `track:${track}-recType:${recType}`; // Create a Redis key based on the query

  // // Try to get the cached result first
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    console.log(`Cache hit for track: ${track}`);
    return NextResponse.json(JSON.parse(cachedData)); // Return the cached result
  }

  const recServiceToken = process.env.REC_SERVICE_TOKEN;
  const url = process.env.REC_SERVICE_URL || "http://localhost:8000";

  const endUrl = `${url}/recommendations/${recType}/${track}?token=${recServiceToken}`;

  const res = await fetch(endUrl, {
    headers: {
      Authorization: `Bearer ${recServiceToken}`,
    },
  });

  const data = await res.json();

  console.log({ data });

  const response = {
    recommendations: data?.recommendations,
    target_features: data?.target_features,
  };

  if (response?.recommendations) {
    // Store the data in Redis and set it to expire after 1 hour (3600 seconds)
    await redisClient.set(
      cacheKey,
      JSON.stringify(response),
      "EX",
      3600 * 24 * 30
    );
  } else {
    return NextResponse.json(
      { error: "Server encountered an error, please try again later" },
      { status: 429 }
    );
  }

  return NextResponse.json(response, { status: 200 });
}
