// components/recommendations/CategorySelection.tsx
import React from "react";

type CategorySelectionProps = {
  onSelectSong: (song: { name: string; artist: string }) => void;
  selectedSongs: { name: string; artist: string }[];
};

const CategorySelection = ({
  onSelectSong,
  selectedSongs,
}: CategorySelectionProps) => {
  // This would fetch and display categories like "Recently Played" or "Top Tracks"
  const categories = [
    {
      name: "Top Tracks",
      songs: [
        { name: "Track 1", artist: "Artist 1" },
        { name: "Track 2", artist: "Artist 2" },
      ],
    },
    {
      name: "Recently Played",
      songs: [{ name: "Track 3", artist: "Artist 3" }],
    },
  ];

  return (
    <div>
      {categories.map((category) => (
        <div key={category.name} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.songs.map((song) => (
              <li
                key={song.name}
                className={`cursor-pointer p-4 rounded-lg border ${
                  selectedSongs.includes(song) ? "bg-blue-100" : "bg-gray-100"
                }`}
                onClick={() => onSelectSong(song)}
              >
                {song.name} by {song.artist}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CategorySelection;
