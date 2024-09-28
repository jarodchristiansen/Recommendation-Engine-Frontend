import Image from "next/image";
import { useState } from "react";

type CardGridProps = {
  items: any[];
  handleItemClick: (id: string) => void;
  selectedSongs: [] | null;
  type: string;
};

// Generic Card Component for displaying tracks, artists, etc.
const CardGrid = ({
  items,
  handleItemClick,
  selectedSongs,
  type,
}: CardGridProps) => {
  // Checks if an item is already selected
  const isSelected = (track) => {
    return selectedSongs.some((selectedSong) => selectedSong.id === track.id);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => handleItemClick(item)}
          className={`group p-4 border rounded-lg cursor-pointer transition-transform transform ${
            isSelected(item) ? "border-blue-500 scale-105" : "border-gray-200"
          } hover:border-blue-500 hover:scale-105`}
        >
          <div className="relative w-full h-48 mb-4">
            <Image
              src={item.image}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              alt={`${item.name} ${type}`}
            />
          </div>
          <h4 className="text-lg font-bold text-gray-900">{item.name}</h4>
          <p className="text-sm text-gray-600">{item.subtext}</p>
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
