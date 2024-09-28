"use client";

import { useState } from "react";
import SearchTrack from "@/components/search/SearchTrack";
import DynamicDataDisplay from "@/components/cards/DynamicDataDisplay";
import { useSession } from "next-auth/react";

const RecommendationsPage = () => {
  const [selectedSongs, setSelectedSongs] = useState([]); // Track selected songs

  const { data: session } = useSession();

  // @ts-ignore: Working on defining types
  const handleSongSelect = (songs) => {
    setSelectedSongs(songs);
  };

  const handleClearSelection = () => {
    setSelectedSongs([]);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Generate Recommendations</h1>

      {/* Search for a Song */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Search for a Song</h2>
        <SearchTrack
          onSelectSong={handleSongSelect}
          selectedSongs={selectedSongs}
          onClearSelection={handleClearSelection}
        />
      </section>

      {/* Select from Categories
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Choose from Your Library
        </h2>
        <CategorySelection
          onSelectSong={handleSongSelect}
          selectedSongs={selectedSongs}
          onClearSelection={handleClearSelection}
        />
      </section> */}

      {/* Dynamic Data Display for Top Tracks */}
      {session && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Top Tracks</h2>
          <DynamicDataDisplay
            endpoint="/api/top/tracks"
            type="track"
            onSelectSong={handleSongSelect}
            selectedSongs={selectedSongs}
            onClearSelection={handleClearSelection}
          />
        </section>
      )}

      {/* Show selected songs */}
      <div>
        <h3>Selected Songs ({selectedSongs.length}/3):</h3>
        <ul>
          {selectedSongs.map((song, index) => (
            <li key={index}>
              {console.log({ song })}
              {song.name} by {song.subtext || song.artists[0]?.name} - Id:{" "}
              {song?.id}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecommendationsPage;
