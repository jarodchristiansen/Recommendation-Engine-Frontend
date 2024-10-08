import CardGrid from "@/components/cards/CardGrid";
import RecommendCardGrid from "@/components/cards/RecommendCardGrid";
import { useEffect, useMemo, useState } from "react";
import { FaRobot } from "react-icons/fa";

// Import a robot icon for the loading state

const DynamicDataDisplay = ({
  endpoint,
  type,
  onSelectSong = null,
  selectedSongs = null,
  onClearSelection = null,
}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const [targetFeatures, setTargetFeatures] = useState(null);

  const isRecommendationsType = type === "recommendations";

  const fetchData = async () => {
    const res = await fetch(`${endpoint}`);
    const result = await res.json();

    console.log({ result });

    if (!result?.error) {
      setData(result?.items || result?.recommendations || result); // Adjust if response is structured differently
      setTargetFeatures(result?.target_features);

      return;
    }

    setError(result.error);
  };

  useEffect(() => {
    if (!data.length) {
      fetchData();
    }
  }, []);

  console.log({ targetFeatures });

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
    } else if (selectedSongs?.length < 3) {
      // Select a track
      onSelectSong([...selectedSongs, track]);
    }
  };

  const mappedItems = useMemo(() => {
    if (!data?.length) return [];

    return data.map((item) => {
      switch (type) {
        case "recommendations":
          return {
            id: item.track_id,
            name: item.track_name,
            subtext: item.artist_name,
            image: item?.album?.images[0]?.url,
            feature_difference: item.feature_difference,
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

      {data.length > 0 && !error && !isRecommendationsType && (
        <CardGrid
          items={mappedItems}
          handleItemClick={handleItemClick}
          selectedSongs={selectedSongs}
          // selectedId={selectedItem}
          type={type}
        />
      )}

      {data.length > 0 && !error && isRecommendationsType && (
        <RecommendCardGrid
          items={mappedItems}
          handleItemClick={handleItemClick}
          selectedSongs={selectedSongs}
          targetFeatures={targetFeatures}
          // selectedId={selectedItem}
          type={type}
        />
      )}

      {error && (
        <div className="text-center text-red-500 text-2xl">{error}</div>
      )}

      {/* Loading Animation */}
      {!data.length && !error && (
        <div className="flex flex-col items-center text-center text-gray-500">
          <FaRobot className="animate-bounce text-5xl text-blue-500 mb-2" />
          <span className="text-xl font-semibold mb-2">
            Hold tight, we&apos;re crunching some numbers
          </span>
          <p className="text-sm">
            This may take up to 60 seconds, but it’ll be worth the wait!
          </p>
        </div>
      )}
    </div>
  );
};

export default DynamicDataDisplay;
