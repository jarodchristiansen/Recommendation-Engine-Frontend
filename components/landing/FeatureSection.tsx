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
              title="Collaborative Filtering"
              description="Utilizing user interactions and behavior to generate your ideal playlist."
              icon={collaborativeIcon}
            />
            <FeatureSection
              title="Content-Based Filtering"
              description="Analyzing song attributes like genre, tempo, and mood to match your preferences based on your input"
              icon={contentBasedIcon}
            />
            <FeatureSection
              title="Calculating Similarity"
              description="Finding tracks similar to your favorites by plotting them in an n-dimensional space."
              icon={cosineSimilarityIcon}
            />
            <FeatureSection
              title="Machine Learning"
              description="Using advanced algorithms like NMF to generate recommendations based on your listening habits."
              icon={nmfIcon}
            />
            <FeatureSection
              title="Less Popular Artists Are Highlighted"
              description="Discover hidden gems, not just the same mainstream hits."
              icon={lessPopularIcon}
            />
            <FeatureSection
              title="Customizable Filters"
              description="Fine-tune your recommendations with adjustable weights for factors like popularity, genre, and tempo."
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
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 text-center bg-black bg-opacity-25">
          <h2 className="text-4xl font-bold mb-6">
            Highlighting Emerging Artists
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-300">
            Tired of hearing the same tracks on repeat? Our platform goes beyond
            mainstream recommendations, bringing attention to incredible yet
            underrepresented artists. Dive deep into music discovery!
          </p>
        </div>
      </section>
    </>
  );
};

export default FeatureContainer;
