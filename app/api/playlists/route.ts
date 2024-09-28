import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.json({ error: "No access token" }, { status: 401 });
  }

  const res = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });
  const playlists = await res.json();

  return NextResponse.json(playlists, { status: 200 });
}
