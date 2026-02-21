import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your dashboard",
  description:
    "Discover books and get personalized recommendations. View your recent reads and find similar books.",
  openGraph: {
    title: "Your dashboard | Book Rec",
    description:
      "Discover books and get personalized recommendations. View your recent reads and find similar books.",
    type: "website",
    siteName: "Book Rec",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
