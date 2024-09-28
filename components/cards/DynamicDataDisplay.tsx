import { useState, useEffect, useMemo } from "react";
import CardGrid from "@/components/cards/CardGrid";

type DynamicDataDisplayProps = {
  endpoint: string;
  type: string;
  onSelectSong: (songs: any[]) => void;
  selectedSongs: any[];
  onClearSelection: () => void;
};

const DynamicDataDisplay = ({
  endpoint,
  type,
  onSelectSong,
  selectedSongs,
  onClearSelection,
}: DynamicDataDisplayProps) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch(`${endpoint}`);
      const result = await res.json();
      setData(result.items || result); // Adjust if response is structured differently
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!data.length) {
      fetchData();
    }
  }, []);

  // Checks if an item is already selected
  const isSelected = (track: any) => {
    return selectedSongs?.some((selectedSong) => selectedSong.id === track.id);
  };

  // Handle item click: select or deselect
  const handleItemClick = (track: any) => {
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
        case "track":
          return {
            id: item?.id,
            name: item?.name,
            subtext: item?.artists.map((artist) => artist.name).join(", "),
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

  // // Map data fields to match the CardGrid expectations
  // const mappedItems = data?.map((item) => {
  //   if (type === "track") {
  //     return {
  //       id: item?.id,
  //       name: item?.name,
  //       subtext: item?.artists.map((artist) => artist.name).join(", "),
  //       image: item?.album?.images[0]?.url,
  //     };
  //   } else if (type === "saved-track") {
  //     return {
  //       id: item?.track?.id,
  //       name: item?.track?.name,
  //       subtext: item?.track?.artists.map((artist) => artist.name).join(", "),
  //       image: item?.track?.album?.images[0]?.url,
  //     };
  //   } else if (type === "artist") {
  //     return {
  //       id: item.id,
  //       name: item.name,
  //       subtext: "Artist",
  //       image: item.images[0]?.url,
  //     };
  //   }
  //   return {};
  // });

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

      {data.length > 0 ? (
        <CardGrid
          items={mappedItems}
          handleItemClick={handleItemClick}
          selectedSongs={selectedSongs}
          // selectedId={selectedItem}
          type={type}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DynamicDataDisplay;
