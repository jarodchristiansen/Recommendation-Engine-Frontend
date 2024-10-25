// File: components/AuthButton.tsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-col items center gap-6">
        <p>Signed in as {session.user?.email}</p>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white p-2 max-w-xs self-center font-bold rounded-md"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("spotify")}
      className="bg-green-500 text-white p-2 max-w-sm font-bold rounded-md"
    >
      Sign in with Spotify
    </button>
  );
}
