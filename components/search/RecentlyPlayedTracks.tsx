import Image from "next/image";
import { useEffect, useState } from "react";

const RecentlyPlayedTracks = () => {
  // eslint-disable-next-line no-explicit-any
  const [results, setResults] = useState<any[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

  const searchRecents = async () => {
    const res = await fetch(`/api/recently-played`);
    const data = await res.json();
    setResults(data.items);
  };

  useEffect(() => {
    searchRecents();
  }, []);

  const handleTrackClick = (trackId: string) => {
    setSelectedTrack(trackId);
    // This could later be extended to fetch recommendations based on the track.
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-2xl font-bold mb-6">Your Recently Played Tracks</h3>

      {results?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((track) => (
            <div
              key={track.played_at}
              onClick={() => handleTrackClick(track.track.id)}
              className={`group p-4 border rounded-lg cursor-pointer transition-transform transform ${
                selectedTrack === track.track.id
                  ? "border-blue-500 scale-105"
                  : "border-gray-200"
              } hover:border-blue-500 hover:scale-105`}
            >
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={track.track.album.images[0].url}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  alt={`${track.track.name} album cover`}
                />
              </div>
              <h4 className="text-lg font-bold text-gray-900">
                {track.track.name}
              </h4>
              <p className="text-sm text-gray-600">
                {track.track.artists
                  // eslint-disable-next-line no-explicit-any
                  .map((artist: any) => artist.name)
                  .join(", ")}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Loading your recently played tracks...</p>
      )}
    </div>
  );
};

export default RecentlyPlayedTracks;
