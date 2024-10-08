/* eslint-disable @typescript-eslint/no-unused-expressions */

"use client";

import { useState } from "react";
import RecentlyPlayedTracks from "@/components/search/RecentlyPlayedTracks";
import DynamicDataDisplay from "@/components/cards/DynamicDataDisplay";

import Link from "next/link";
import SearchTrack from "@/components/search/SearchTrack";
import Button from "@/components/layout/Button";
import useRequireAuth from "../lib/useRequireAuth";

type SectionProps = {
  title: string;
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
  children: React.ReactNode;
};

export default function Dashboard() {
  const session = useRequireAuth();

  const [showRecentlyPlayed, setShowRecentlyPlayed] = useState(false);
  const [showTopTracks, setShowTopTracks] = useState(false);
  const [showTopArtists, setShowTopArtists] = useState(false);
  const [showSavedTracks, setShowSavedTracks] = useState(false);

  const [showAudioFeatures, setShowAudioFeatures] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-black text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Your Dashboard</h1>
            <Link href="/" className="text-blue-400 hover:underline">
              Back to Home
            </Link>
          </div>
          {session && (
            <p className="text-lg mt-2">Welcome back, {session.user?.name}!</p>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Recently Played Section
        <Section
          title="Recently Played Tracks"
          toggle={showRecentlyPlayed}
          setToggle={setShowRecentlyPlayed}
        >
          {showRecentlyPlayed && session && <RecentlyPlayedTracks />}
        </Section> */}

        {/* Top Tracks Section */}
        <Section
          title="Your Top Tracks"
          toggle={showTopTracks}
          setToggle={setShowTopTracks}
        >
          {showTopTracks && session && (
            <DynamicDataDisplay endpoint="/api/top/tracks" type="track" />
          )}
        </Section>

        {/* Top Artists Section */}
        <Section
          title="Your Top Artists"
          toggle={showTopArtists}
          setToggle={setShowTopArtists}
        >
          {showTopArtists && session && (
            <DynamicDataDisplay endpoint="/api/top/artists" type="artist" />
          )}
        </Section>

        {/* Saved Tracks Section */}
        <Section
          title="Your Saved Tracks"
          toggle={showSavedTracks}
          setToggle={setShowSavedTracks}
        >
          {showSavedTracks && session && (
            <DynamicDataDisplay
              endpoint="/api/saved-tracks"
              type="saved-track"
            />
          )}
        </Section>

        {/* Audio Features Section */}
        <Section
          title="Track Audio Features"
          toggle={showAudioFeatures}
          setToggle={setShowAudioFeatures}
        >
          {showAudioFeatures && session && (
            <DynamicDataDisplay endpoint="/api/audio-features" type="track" />
          )}
        </Section>

        <Section
          title="Search Tracks On Spotify"
          toggle={true}
          setToggle={setShowAudioFeatures}
        >
          <SearchTrack />
        </Section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold">Personalized Recommendations</h2>
          <div className="mt-4 p-6 bg-white shadow-md rounded-lg">
            <p className="text-lg text-gray-700">
              Coming soon: Get recommendations based on your listening habits.
            </p>
            <img
              src="/images/placeholder-recommendations.png"
              alt="Recommendations Preview"
              className="mx-auto mt-4 rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Visualization Section */}
        <section>
          <h2 className="text-2xl font-bold">Your Listening Stats</h2>
          <div className="mt-4 p-6 bg-white shadow-md rounded-lg">
            <p className="text-lg text-gray-700">
              Visualize your listening habits with upcoming features.
            </p>
            <img
              src="/images/placeholder-visualization.png"
              alt="Visualization Preview"
              className="mx-auto mt-4 rounded-lg shadow-lg"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

/* Reusable Section Component */
const Section = ({ title, toggle, setToggle, children }: SectionProps) => (
  <section className="mb-12">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Button onClick={() => setToggle(!toggle)}>
        {toggle ? "Hide" : "Show"}
      </Button>
    </div>
    {toggle && <div className="mt-6">{children}</div>}
  </section>
);
