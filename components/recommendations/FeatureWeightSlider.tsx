// components/recommendations/FeatureWeightSlider.tsx
import React from "react";

const FeatureWeightSlider = ({ weights, onWeightChange }) => {
  const features = [
    "popularity",
    "danceability",
    "energy",
    "tempo",
    "duration_ms",
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {features.map((feature) => (
        <div key={feature} className="flex flex-col items-center">
          <label className="mb-2 font-semibold text-gray-700 capitalize">
            {feature}
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={weights[feature]}
            onChange={(e) =>
              onWeightChange(feature, parseFloat(e.target.value))
            }
            className="w-full"
          />
          <span className="mt-1 text-sm text-gray-500">
            Weight: {weights[feature]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FeatureWeightSlider;
