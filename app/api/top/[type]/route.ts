// File: app/api/recently-played/route.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // const token = searchParams.get("q");

  const token = await getToken({ req: request as any });
  const type = searchParams.get("type");

  if (!token) {
    return NextResponse.json({ error: "No access token" }, { status: 401 });
  }

  const res = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${
      type || "medium_term"
    }`,
    {
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
      },
    }
  );
  const topTracks = await res.json();

  return NextResponse.json(topTracks, { status: 200 });
}
