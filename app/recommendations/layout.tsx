import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discover your next read",
  description:
    "Pick a book you love and get similar book recommendations based on subjects, authors, and metadata. See why each book was chosen.",
  openGraph: {
    title: "Discover your next read | Book Rec",
    description:
      "Pick a book you love and get similar book recommendations based on subjects, authors, and metadata.",
    type: "website",
    siteName: "Book Rec",
  },
};

export default function RecommendationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
