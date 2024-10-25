import FeatureContainer from "@/components/landing/FeatureSection";
import "./index.css";

import LandingBanner from "@/components/landing/LandingBanner";
import LandingCTA from "@/components/landing/LandingCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "SpotRec | Music Recommendation Engine",
    template: "%s | Music Recommendation Engine",
  },
  description:
    "Discover personalized music recommendations tailored to your taste.",
  keywords: [
    "music recommendations",
    "Spotify",
    "recommendation engine",
    "music app",
  ],
  openGraph: {
    type: "website",
    siteName: "Music Recommender",
  },
};

export default function Home() {
  return (
    <div className="bg-gray-100">
      <LandingBanner />

      <FeatureContainer />

      <LandingCTA />
    </div>
  );
}
