"use client";

import { useEffect, useState } from "react";
import SearchTrack from "@/components/search/SearchTrack";
import DynamicDataDisplay from "@/components/cards/DynamicDataDisplay";
import { useSession } from "next-auth/react";
import Button from "@/components/layout/Button";

import { SearchTrackType } from "../types/track";

const RecommendationsPage = () => {
  type SongsType = SearchTrackType[];

  const [selectedSongs, setSelectedSongs] = useState<SongsType>([]);
  const [showRecButton, setShowRecButton] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const { data: session } = useSession();

  const handleSongSelect = (songs: SongsType) => {
    setSelectedSongs(songs);
  };

  const handleClearSelection = () => {
    setSelectedSongs([]);
  };

  useEffect(() => {
    if (selectedSongs?.length >= 1) {
      setShowRecButton(true);
    } else {
      setShowRecButton(false);
      setShowRecommendations(false);
    }
  }, [selectedSongs]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
        Discover New Music
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Select a few of your favorite songs and let us recommend tracks
        you&apos;ll love!
      </p>

      {/* Search for a Song */}
      <section className="mb-8">
        <SearchTrack
          onSelectSong={handleSongSelect}
          selectedSongs={selectedSongs}
          onClearSelection={handleClearSelection}
        />
      </section>

      {/* Dynamic Data Display for Top Tracks */}
      {session && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">
            Your Top Tracks
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Select from your most-played songs to get personalized
            recommendations.
          </p>
          <DynamicDataDisplay
            endpoint="/api/top/tracks/"
            type="track"
            onSelectSong={handleSongSelect}
            selectedSongs={selectedSongs}
            onClearSelection={handleClearSelection}
          />
        </section>
      )}

      {/* Show selected songs */}
      <div className="bg-gray-100 p-4 rounded-md shadow-sm mb-6">
        <h3 className="text-xl font-medium mb-2 text-gray-800">
          Selected Songs ({selectedSongs.length}/3):
        </h3>
        <ul className="space-y-2">
          {selectedSongs.map((song, index) => (
            <li key={index} className="flex justify-between items-center">
              <span className="text-gray-700">
                {song.name} by {song?.subtext || song.artists[0]?.name}
              </span>
              <Button
                size="small"
                onClick={() =>
                  setSelectedSongs(
                    selectedSongs.filter((track) => track.id !== song.id)
                  )
                }
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Build Recommendations Button */}
      {showRecButton && (
        <div className="text-center mb-6">
          <Button onClick={() => setShowRecommendations(true)}>
            Build Recommendations
          </Button>
        </div>
      )}

      {/* Display Recommendations */}
      {showRecommendations && selectedSongs?.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Your Recommendations
          </h2>
          <DynamicDataDisplay
            endpoint={`/api/recommendations?track=${selectedSongs[0]?.id}`}
            type="recommendations"
            selectedSongs={[]}
          />
        </section>
      )}
    </div>
  );
};

export default RecommendationsPage;
