import { useState, useEffect, useMemo } from "react";
import CardGrid from "@/components/cards/CardGrid";

const DynamicDataDisplay = ({
  endpoint,
  type,
  onSelectSong = null,
  selectedSongs = null,
  onClearSelection = null,
}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch(`${endpoint}`);
      const result = await res.json();
      setData(result.items || result); // Adjust if response is structured differently
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    }
  };

  useEffect(() => {
    if (!data.length) {
      fetchData();
    }
  }, []);

  // Checks if an item is already selected
  const isSelected = (track) => {
    return selectedSongs?.some((selectedSong) => selectedSong.id === track.id);
  };

  // Handle item click: select or deselect
  const handleItemClick = (track) => {
    if (isSelected(track)) {
      // Deselect if already selected
      onSelectSong(
        selectedSongs.filter((selected) => selected.id !== track.id)
      );
    } else if (selectedSongs.length < 3) {
      // Select a track
      onSelectSong([...selectedSongs, track]);
    }
  };

  const mappedItems = useMemo(() => {
    if (!data.length) return [];

    return data.map((item) => {
      switch (type) {
        case "recommendations":
          return {
            id: item.track_id,
            name: item.track_name,
            subtext: item.artist_name,
            image: item?.album?.images[0]?.url,
          };

        case "track":
          return {
            id: item?.id,
            name: item?.name,
            subtext: item?.artists?.map((artist) => artist.name).join(", "),
            image: item?.album?.images[0]?.url,
          };
        case "saved-track":
          return {
            id: item?.track?.id,
            name: item?.track?.name,
            subtext: item?.track?.artists
              .map((artist) => artist.name)
              .join(", "),
            image: item?.track?.album?.images[0]?.url,
          };
        case "artist":
          return {
            id: item.id,
            name: item.name,
            subtext: "Artist",
            image: item.images[0]?.url,
          };
        default:
          return {};
      }
    });
  }, [data, handleItemClick]);

  console.log({ mappedItems, data });

  return (
    <div className="mt-4 p-6 bg-white shadow-md rounded-lg">
      {/* Clear Selection Button */}
      {selectedSongs?.length > 0 && (
        <div className="mb-4">
          <button
            onClick={onClearSelection}
            className="bg-gray-500 text-white py-2 px-4 rounded-full"
          >
            Clear Selection
          </button>
        </div>
      )}

      {data.length > 0 && !error && (
        <CardGrid
          items={mappedItems}
          handleItemClick={handleItemClick}
          selectedSongs={selectedSongs}
          // selectedId={selectedItem}
          type={type}
        />
      )}

      {error && (
        <div className="text-center text-red-500">
          Error fetching data. Please try again later.
        </div>
      )}

      {!data.length && !error && (
        <div className="text-center text-gray-500">Loading...</div>
      )}
    </div>
  );
};

export default DynamicDataDisplay;
