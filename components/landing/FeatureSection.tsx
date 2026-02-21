import FeatureSection from "@/components/layout/FeatureSection";
import PageContainer from "@/components/layout/PageContainer";

import collaborativeIcon from "../../public/images/icons/collaborative.svg";
import contentBasedIcon from "../../public/images/icons/contentBased.svg";
import cosineSimilarityIcon from "../../public/images/icons/chart.svg";
import nmfIcon from "../../public/images/icons/matrix.svg";
import lessPopularIcon from "../../public/images/icons/discoverArtists.svg";
import customizeIcon from "../../public/images/icons/customize.svg";

const FeatureContainer = () => {
  return (
    <>
      <section className="py-16 md:py-24 bg-white">
        <PageContainer>
          <h2 className="text-4xl font-semibold text-center mb-16">Why Book Rec</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureSection
              title="Based on what you love"
              description="Start with any book you like. We use it to find reads that match your taste in themes, scope, and style."
              icon={collaborativeIcon}
            />
            <FeatureSection
              title="See why we recommend"
              description="Every suggestion comes with a short explanation—similar themes, era, or reception—so you can trust the fit."
              icon={contentBasedIcon}
            />
            <FeatureSection
              title="Similarity you can trust"
              description="We compare books by subjects, authors, and metadata to surface titles that genuinely align with your pick."
              icon={cosineSimilarityIcon}
            />
            <FeatureSection
              title="Your reading, your pace"
              description="No rush. Discover your next read when you’re ready; your list is here whenever you return."
              icon={nmfIcon}
            />
            <FeatureSection
              title="Diverse and deep catalog"
              description="From classics to lesser-known titles, discover a wide range of books beyond the same bestsellers."
              icon={lessPopularIcon}
            />
            <FeatureSection
              title="Your reading list"
              description="Save books and revisit your discoveries. Your reading list grows with you."
              icon={customizeIcon}
            />
          </div>
        </PageContainer>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-800 to-slate-900 text-white relative">
        <PageContainer className="relative z-10 py-8 text-center">
          <h2 className="text-4xl font-semibold mb-6">
            One book at a time
          </h2>
          <p className="text-lg font-normal max-w-2xl mx-auto mb-8 text-slate-300">
            Your next read matters. We focus on clarity and transparency—pick a book you love, see why we suggest each title, and choose with confidence.
          </p>
        </PageContainer>
      </section>
    </>
  );
};

export default FeatureContainer;
