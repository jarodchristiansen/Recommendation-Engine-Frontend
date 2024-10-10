import Image from "next/image";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";

// Generic Card Component for displaying tracks, artists, etc.
const RecommendCardGrid = ({ items, handleItemClick, selectedSongs, type }) => {
  // Checks if an item is already selected
  const isSelected = (track) => {
    return selectedSongs?.some((selectedSong) => selectedSong?.id === track.id);
  };

  // Function to create data for the radar chart from feature differences
  const createRadarData = (item) => {
    console.log({ item });

    const featureDifference = item.feature_difference || {};
    return Object?.keys(featureDifference).map((feature) => {
      const value = Math.abs(featureDifference[feature]);

      return {
        feature,
        value,
      };
    });
  };

//   //   // Function to create data for the bar chart comparison
//   const createBarData = (item, targetFeatures) => {
//     return Object?.keys(targetFeatures).map((feature) => ({
//       feature,
//       target: targetFeatures[feature],
//       recommendation: item[feature],
//     }));
//   };

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
              unoptimized={true}
            />
          </div>
          <h4 className="text-lg font-bold text-gray-900">{item.name}</h4>
          <p className="text-sm text-gray-600">{item.subtext}</p>

          {/* Radar Chart for Feature Differences */}
          <div className="mt-4">
            <h5 className="text-sm font-semibold">Feature Difference</h5>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={createRadarData(item)} outerRadius="80%">
                <PolarGrid />
                <PolarAngleAxis dataKey="feature" />
                <PolarRadiusAxis />
                <Radar
                  name="Difference"
                  dataKey="value"
                  stroke="#f04949"
                  fill="#f04949"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart for Feature Comparison */}
          {/* <div className="mt-4">
            <h5 className="text-sm font-semibold">Feature Comparison</h5>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={createBarData(item, targetFeatures)}>
                <XAxis dataKey="feature" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="target" fill="#82ca9d" name="Target" />
                <Bar
                  dataKey="recommendation"
                  fill="#8884d8"
                  name="Recommended"
                />
              </BarChart>
            </ResponsiveContainer>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default RecommendCardGrid;
