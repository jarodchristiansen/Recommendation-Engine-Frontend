// File: app/api/create-playlist/route.ts
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(request: NextRequest) {
  // Fetch user session token
  const token = await getToken({ req: request });

  if (!token?.accessToken) {
    return NextResponse.json({ error: "No access token" }, { status: 401 });
  }

  const userId = token?.sub;

  if (!userId) {
    return NextResponse.json(
      { error: "Unable to retrieve user ID" },
      { status: 500 }
    );
  }
  const res = await request.json();

  const { playlistName, playlistDescription } = res;

  // Create a new playlist
  const createPlaylistRes = await fetch(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: playlistName,
        description: playlistDescription,
        public: false,
      }),
    }
  );

  if (!createPlaylistRes.ok) {
    const error = await createPlaylistRes.json();
    return NextResponse.json(
      { error: "Failed to create playlist", details: error },
      { status: createPlaylistRes.status }
    );
  }

  const createdPlaylist = await createPlaylistRes.json();

  // Adds tracks from recommendedTracks on Frontend to the created playlist
  const { id: playlistId } = createdPlaylist;
  const { trackUris } = res || {
    trackUris: ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh"],
  };

  const addTracksRes = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: trackUris,
      }),
    }
  );

  if (!addTracksRes.ok) {
    const error = await addTracksRes.json();
    return NextResponse.json(
      { error: "Failed to add trakcs to playlist", details: error },
      { status: addTracksRes.status }
    );
  }

  return NextResponse.json(createdPlaylist, { status: 200 });
}
