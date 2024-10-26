"use client"; // This makes the component a Client Component

import Image from "next/legacy/image";
import { useState } from "react";
import Button from "../layout/Button";

type SearchTrackProps = {
  onSelectSong?: (track: any) => void;
  selectedSongs?: any[];
  onClearSelection?: () => void;
};

export default function SearchTrack({
  onSelectSong,
  selectedSongs,
  onClearSelection,
}: SearchTrackProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const searchTrack = async () => {
    const res = await fetch(`/api/search?q=${query}`);
    const data = await res.json();

    setResults(data.tracks.items);
  };

  const isSelected = (track: any) => {
    return selectedSongs?.some((selectedSong) => selectedSong.id === track.id);
  };

  const handleTrackClick = (track: any) => {
    // If already selected, deselect it
    if (isSelected(track) && typeof onSelectSong === "function") {
      onSelectSong(
        selectedSongs?.filter((selected) => selected.id !== track.id)
      );
    } else {
      // Otherwise, select it
      //   @ts-expect-error selectedSongs may be undefined
      if (selectedSongs?.length < 3 && typeof onSelectSong === "function") {
        // onSelectSong([track]);
        // @ts-expect-error selectedSongs may be undefined
        onSelectSong([...selectedSongs, track]);
      }
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-2 text-gray-700">
        Search for a Song
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Use the search bar to find songs you like, or select from your top
        tracks below.
      </p>

      {/* Search Input */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter track name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Button onClick={() => searchTrack()}>Search</Button>
      </div>

      {/* Clear Selection Button */}
      {/* @ts-expect-error selectedSongs may be undefined*/}
      {selectedSongs?.length > 0 && (
        <div className="mt-4">
          <Button onClick={onClearSelection} variant="secondary">
            Clear Selection
          </Button>
        </div>
      )}

      {/* Search Results */}
      <div className="mt-6">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((track) => (
              <div
                key={track.id}
                onClick={() => handleTrackClick(track)}
                className={`group p-4 border rounded-lg cursor-pointer transition-transform transform hover:border-blue-500 hover:scale-105 ${
                  isSelected(track) ? "border-blue-500 bg-blue-50" : ""
                }`}
              >
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={track.album.images[0]?.url}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    alt={`${track.name} album cover`}
                    unoptimized={true} // Disable optimization for this image
                  />
                </div>
                <h4 className="text-lg font-bold text-gray-900">
                  {track.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {/* {eslint-disable-next-line no-explicit-any} */}
                  {track.artists.map((artist: any) => artist.name).join(", ")}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            No tracks found. Please try another search.
          </p>
        )}
      </div>
    </div>
  );
}
