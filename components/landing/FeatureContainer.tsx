import FeatureSection from "@/components/layout/FeatureSection";

import BanjoMusician from "../../public/images/banjo.jpeg";

import collaborativeIcon from "../../public/images/icons/collaborative.svg";
import contentBasedIcon from "../../public/images/icons/contentBased.svg";
import cosineSimilarityIcon from "../../public/images/icons/chart.svg";
import nmfIcon from "../../public/images/icons/matrix.svg";
import lessPopularIcon from "../../public/images/icons/discoverArtists.svg";
import customizeIcon from "../../public/images/icons/customize.svg";

const FeatureContainer = () => {
  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureSection
              title="Open Library"
              description="Search millions of books and get metadata (subjects, authors, covers) from the Open Library API."
              icon={contentBasedIcon}
            />
            <FeatureSection
              title="Content-Based Similarity"
              description="Recommendations are based on book attributes: subject count, author count, and cover data."
              icon={cosineSimilarityIcon}
            />
            <FeatureSection
              title="Explainable Results"
              description="See why each book was recommended with similarity scores and feature comparisons."
              icon={collaborativeIcon}
            />
            <FeatureSection
              title="Cosine Similarity"
              description="Books are compared in a feature space so you get titles that are genuinely similar."
              icon={nmfIcon}
            />
            <FeatureSection
              title="Discover Beyond Bestsellers"
              description="Find lesser-known titles that match your chosen book’s profile."
              icon={lessPopularIcon}
            />
            <FeatureSection
              title="No Login Required"
              description="Search and get recommendations without signing in. Optional auth can be added later."
              icon={customizeIcon}
            />
          </div>
        </div>
      </section>

      <section
        className="py-44 bg-gradient-to-b from-black to-gray-900 text-white relative bg-banner"
        style={{
          backgroundImage: `url(${BanjoMusician})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 text-center bg-black bg-opacity-25">
          <h2 className="text-4xl font-bold mb-6">
            Your Next Read Is One Click Away
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-300">
            Pick any book you like and get a list of similar titles. No account
            required—just search, select, and explore.
          </p>
        </div>
      </section>
    </>
  );
};

export default FeatureContainer;
