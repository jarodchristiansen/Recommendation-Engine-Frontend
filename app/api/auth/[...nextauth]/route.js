// DEPRECATED: Spotify OAuth removed for migration to Open Library (books).
// See MIGRATION_AND_ARCHITECTURE.md and MIGRATION_CHECKPOINT.md (in recommendation-server).
//
// REPLACEMENT PLAN:
// - Auth may become optional, or switch to another provider (e.g. email, GitHub) if user accounts are needed.
// - For a book-only portfolio app, anonymous use may be sufficient; remove auth or keep a no-op session.
// Current: NextAuth with no providers so sign-in is effectively disabled; session will be null.

import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    // Spotify provider removed. Add Open Library–compatible auth when required.
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) token.accessToken = account.access_token;
      return token;
    },
    async session({ session }) {
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 3600 * 4,
  },
});

export { handler as GET, handler as POST };
