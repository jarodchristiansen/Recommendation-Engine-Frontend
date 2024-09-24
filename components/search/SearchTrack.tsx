"use client"; // This makes the component a Client Component

import Image from "next/image";
import { useState } from "react";

export default function SearchTrack() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const searchTrack = async () => {
    const res = await fetch(`/api/search?q=${query}`);
    const data = await res.json();

    console.log({ data });

    setResults(data.tracks.items);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-2xl font-bold mb-6">Search for a Track</h3>

      {/* Search Input */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter track name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all"
          onClick={searchTrack}
        >
          Search
        </button>
      </div>

      {/* Search Results */}
      <div className="mt-6">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((track) => (
              <div
                key={track.id}
                className="group p-4 border rounded-lg cursor-pointer transition-transform transform hover:border-blue-500 hover:scale-105"
              >
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={track.album.images[0]?.url}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    alt={`${track.name} album cover`}
                  />
                </div>
                <h4 className="text-lg font-bold text-gray-900">
                  {track.name}
                </h4>
                <p className="text-sm text-gray-600">
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
