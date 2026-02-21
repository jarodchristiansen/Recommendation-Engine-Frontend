"use client";

import { signOut, useSession } from "next-auth/react";
import Button from "@/components/layout/Button";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-col items-center gap-6">
        <p className="text-body text-primary">Signed in as {session.user?.email}</p>
        <Button
          variant="danger"
          size="medium"
          onClick={() => signOut()}
          className="max-w-xs self-center"
        >
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <p className="text-body text-muted font-medium py-2 px-4 rounded-lg bg-secondary border border-slate-200">
      Sign in to save your list across devices (coming soon).
    </p>
  );
}
