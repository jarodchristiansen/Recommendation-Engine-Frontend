import {
  RecommendedTrackType,
  SearchTrackType,
  SelectedArrayType,
} from "@/app/types/track";
import CardGrid from "@/components/cards/CardGrid";
import RecommendCardGrid from "@/components/cards/RecommendCardGrid";
import { useEffect, useMemo, useState } from "react";
import { FaRobot } from "react-icons/fa";

type DynamicDataDisplayProps = {
  endpoint: string;
  type: string;
  onSelectSong?: (track: any) => void;
  selectedSongs: SelectedArrayType;
  onClearSelection?: () => void;
};

const DynamicDataDisplay = ({
  endpoint,
  type,
  onSelectSong,
  selectedSongs,
  onClearSelection,
}: DynamicDataDisplayProps) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // const [targetFeatures, setTargetFeatures] = useState(null);

  const isRecommendationsType = type === "recommendations";

  type TrackType = RecommendedTrackType | SearchTrackType;

  const onSelectDefined = typeof onSelectSong !== "undefined";

  const fetchData = async () => {
    const res = await fetch(`${endpoint}`);
    const result = await res.json();

    if (!result?.error) {
      setData(result?.items || result?.recommendations || result); // Adjust if response is structured differently
      // setTargetFeatures(result?.target_features);

      return;
    }

    setError(result.error);
  };

  useEffect(() => {
    if (!data.length) {
      fetchData();
    }
  }, []);

  // Checks if an item is already selected
  const isSelected = (track: TrackType) => {
    return selectedSongs?.some(
      (selectedSong: TrackType) => selectedSong.id === track.id
    );
  };

  const handleItemClick = (track: any) => {
    if (isSelected(track) && onSelectDefined) {
      // Deselect if already selected
      const filteredSongs = selectedSongs.filter(
        (selected: any) => selected.id !== track.id
      );
      onSelectSong(filteredSongs);
    } else if (selectedSongs.length < 3 && onSelectDefined) {
      // Select a track
      const newSelection = [...selectedSongs, track];
      onSelectSong(newSelection);
    }
  };

  const mappedItems = useMemo(() => {
    if (!data?.length) return [];

    // Frontend does some heavy lifting for 2 datasets being merged
    // needs further refining on types
    return data.map((item: any) => {
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
            subtext: item?.artists
              ?.map((artist: any) => artist.name)
              .join(", "),
            image: item?.album?.images[0]?.url,
          };
        case "saved-track":
          return {
            id: item?.track?.id,
            name: item?.track?.name,
            subtext: item?.track?.artists
              .map((artist: any) => artist.name)
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
      {selectedSongs && selectedSongs?.length > 0 && (
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
          // targetFeatures={targetFeatures}
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
