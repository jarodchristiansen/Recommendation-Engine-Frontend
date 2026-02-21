"use client";

import AuthButton from "@/components/auth/AuthButton";
import Link from "next/link";

const AuthPage = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Save your reading (coming soon)
        </h1>
        <p className="text-body text-slate-600 mb-8">
          Sign in to save your list across devices and pick up where you left off. We’re working on it.
        </p>

        <div className="mb-8">
          <AuthButton />
        </div>

        <p className="text-small text-muted">
          You can discover and get book recommendations without signing in.
        </p>
        <Link
          href="/recommendations"
          className="mt-4 inline-block text-accent hover:text-accent-hover font-medium focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
        >
          Get book recommendations →
        </Link>
      </div>
    </div>
  );
};

export default AuthPage;
