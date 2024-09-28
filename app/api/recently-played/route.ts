// File: app/api/recently-played/route.ts
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest) {
  //   const token = request.headers.get("Authorization")?.split(" ")[1];
  const { searchParams } = new URL(request.url);
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.json({ error: "No access token" }, { status: 401 });
  }

  const res = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played",
    {
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
      },
    }
  );

  const data = await res.json();

  return NextResponse.json(data, { status: 200 });
}
