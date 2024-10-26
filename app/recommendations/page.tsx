"use client";

import { useEffect, useState } from "react";
import SearchTrack from "@/components/search/SearchTrack";
import DynamicDataDisplay from "@/components/cards/DynamicDataDisplay";
import { useSession } from "next-auth/react";
import Button from "@/components/layout/Button";
import Section from "@/components/layout/Section";
import { SearchTrackType } from "../types/track";

const RecommendationsPage = () => {
  type SongsType = SearchTrackType[];

  const { data: session } = useSession();

  const [selectedSongs, setSelectedSongs] = useState<SongsType>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendedTracks, setRecommendedTracks] = useState<any>([]);
  const [showTopTracks, setShowTopTracks] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const handleSongSelect = (songs: SongsType) => {
    setSelectedSongs(songs);
    setCurrentStep(songs.length > 0 ? 2 : 1);
  };

  const handleClearSelection = () => {
    setSelectedSongs([]);
    setShowRecommendations(false);
    setCurrentStep(1);
  };

  const savePlaylistToSpotify = async () => {
    if (!session) return;

    try {
      const playlistName = "SpotRec Recommendations";
      const playlistDescription = "Generated recommendations playlist";
      const trackUris = recommendedTracks.map(
        (track) => `spotify:track:${track.track_id}`
      );

      await fetch("/api/create-playlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playlistName, playlistDescription, trackUris }),
      });

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error("Error saving playlist:", error);
      alert("An error occurred while saving the playlist.");
    }
  };

  useEffect(() => {
    setShowRecommendations(false);
  }, [selectedSongs]);

  const steps = [
    { step: 1, label: "Select Songs" },
    { step: 2, label: "Build Recommendations" },
    { step: 3, label: "Save Playlist" },
  ];

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
        Discover New Music
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Select a few of your favorite songs and let us recommend tracks
        you&apos;ll love!
      </p>

      {/* Step Indicator */}
      <div className="flex justify-center mb-8 space-x-4">
        {steps.map((s) => (
          <div
            key={s.step}
            className={`text-center px-4 py-2 rounded-lg ${
              s.step === currentStep
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {s.label}
          </div>
        ))}
      </div>

      {/* Search for a Song */}
      <section className="mb-8">
        <SearchTrack
          onSelectSong={handleSongSelect}
          selectedSongs={selectedSongs}
          onClearSelection={handleClearSelection}
        />
      </section>

      {/* Top Tracks Section */}
      <Section
        title="Your Top Tracks"
        toggle={showTopTracks}
        setToggle={setShowTopTracks}
      >
        {showTopTracks && session && (
          <>
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
          </>
        )}
      </Section>

      {/* Selected Songs */}
      <div className="bg-gray-100 p-4 rounded-md shadow-sm mb-6">
        <h3 className="text-xl font-medium mb-2 text-gray-800">
          Selected Songs ({selectedSongs.length}/3):
        </h3>
        <ul className="space-y-2">
          {selectedSongs.map((song, index) => (
            <li
              key={index}
              className="flex justify-between items-center animate-fadeIn"
            >
              <span className="text-gray-700">
                {song.name} by {song.subtext || song.artists[0]?.name}
              </span>
              <Button
                size="small"
                onClick={() =>
                  handleSongSelect(
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
      {selectedSongs.length > 0 && (
        <div className="text-center mb-6">
          <Button
            onClick={() => {
              setShowRecommendations(true);
              setCurrentStep(3);
            }}
          >
            Build Recommendations
          </Button>
        </div>
      )}

      {/* Display Recommendations */}
      {showRecommendations && selectedSongs.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Your Recommendations
          </h2>
          <DynamicDataDisplay
            endpoint={`/api/recommendations?track=${selectedSongs[0]?.id}`}
            type="recommendations"
            selectedSongs={[]}
            setRecommendedTracks={setRecommendedTracks}
          />

          {recommendedTracks.length > 0 && (
            <div className="text-center mt-6">
              <Button onClick={savePlaylistToSpotify}>
                Save Recommendations to Spotify
              </Button>
            </div>
          )}
        </section>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
          Playlist saved to your Spotify account!
        </div>
      )}
    </main>
  );
};

export default RecommendationsPage;
