// File: app/api/recently-played/route.ts
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest) {
  //   const token = request.headers.get("Authorization")?.split(" ")[1];
  //   const { searchParams } = new URL(request.url);

  //   const token = await getToken({ req: request });

  //   if (!token) {
  //     return NextResponse.json({ error: "No access token" }, { status: 401 });
  //   }

  const { searchParams } = new URL(request.url);
  const track = searchParams.get("track");

  //   const track = "7nCC5GpIFsJytMAwgVNz9o";

  const recServiceToken = process.env.REC_SERVICE_TOKEN;
  const url = process.env.REC_SERVICE_URL;

  const endUrl = `${url}/recommendations/cosine-similarity/${track}?token=${recServiceToken}`;

  const res = await fetch(endUrl, {
    headers: {
      Authorization: `Bearer ${recServiceToken}`,
    },
  });

  const data = await res.json();

  return NextResponse.json(data?.recommendations, { status: 200 });
}
