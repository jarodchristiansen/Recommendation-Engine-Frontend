import FeatureContainer from "@/components/landing/FeatureSection";
import "./index.css";

import LandingBanner from "@/components/landing/LandingBanner";
import LandingCTA from "@/components/landing/LandingCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Book Rec | Book Recommendation Engine",
    template: "%s | Book Recommendation Engine",
  },
  description:
    "Discover books similar to the ones you love. Get personalized book recommendations powered by Open Library.",
  keywords: [
    "book recommendations",
    "Open Library",
    "recommendation engine",
    "books",
  ],
  openGraph: {
    type: "website",
    siteName: "Book Rec",
  },
};

export default function Home() {
  return (
    <div className="bg-surface">
      <LandingBanner />

      <FeatureContainer />

      <LandingCTA />
    </div>
  );
}
