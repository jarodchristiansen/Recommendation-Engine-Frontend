import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to save your reading list across devices. You can still discover and get book recommendations without signing in.",
  openGraph: {
    title: "Sign in | Book Rec",
    description:
      "Sign in to save your reading list across devices. Book recommendations available without signing in.",
    type: "website",
    siteName: "Book Rec",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
