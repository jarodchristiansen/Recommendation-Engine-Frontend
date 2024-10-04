import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

import { getRedisClient } from "../redis"; // Use your Redis client from the helper file

async function getSpotifyToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${authString}`,
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();

  return data.access_token;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  let token = await getToken({ req: request });

  if (!token) {
    token = await getSpotifyToken(); // Get the access token dynamically
  }

  const params = new URLSearchParams({ q, type: "track" });

  const redisClient = getRedisClient();
  const cacheKey = `search:${q}`; // Create a Redis key based on the query

  // // Try to get the cached result first
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    console.log(`Cache hit for query: ${q}`);
    return NextResponse.json(JSON.parse(cachedData)); // Return the cached result
  }

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?${params}`,
      {
        headers: {
          Authorization: `Bearer ${token?.accessToken || token}`, // Use the token in search request
        },
      }
    );
    const data = await response.json();

    // Store the data in Redis and set it to expire after 1 hour (3600 seconds)
    await redisClient.set(cacheKey, JSON.stringify(data), "EX", 3600 * 24 * 30);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
