// File: app/api/recently-played/route.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const token = await getToken({ req: request as any });

  if (!token) {
    return NextResponse.json({ error: "No access token" }, { status: 401 });
  }

  const res = await fetch(
    "https://api.spotify.com/v1/me/following?type=artist",
    {
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
      },
    }
  );
  const followedArtists = await res.json();

  return NextResponse.json(followedArtists, { status: 200 });
}
