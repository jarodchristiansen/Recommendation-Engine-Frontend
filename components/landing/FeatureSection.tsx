import FeatureSection from "@/components/layout/FeatureSection";
import PageContainer from "@/components/layout/PageContainer";

import collaborativeIcon from "../../public/images/icons/collaborative.svg";
import contentBasedIcon from "../../public/images/icons/contentBased.svg";
import cosineSimilarityIcon from "../../public/images/icons/chart.svg";
import nmfIcon from "../../public/images/icons/matrix.svg";
import lessPopularIcon from "../../public/images/icons/discoverArtists.svg";
import customizeIcon from "../../public/images/icons/customize.svg";

const stats = [
  { value: "20M+", label: "books in catalog" },
  { value: "Free", label: "always, no tiers" },
  { value: "Instant", label: "results, no wait" },
  { value: "100%", label: "transparent picks" },
];

const steps = [
  {
    number: "01",
    title: "Pick a book you love",
    description: "Search by title or author. Select the book that best represents your taste.",
  },
  {
    number: "02",
    title: "Get tailored recommendations",
    description:
      "We analyze subjects, themes, and metadata to surface titles that genuinely align with your pick.",
  },
  {
    number: "03",
    title: "Understand why each fits",
    description:
      "Every suggestion comes with a plain-English explanation—similar themes, era, or reception—so you choose with confidence.",
  },
];

const FeatureContainer = () => {
  return (
    <>
      {/* Stats strip */}
      <div className="bg-white border-y border-slate-200">
        <PageContainer>
          <dl className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-200">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center justify-center py-8 px-4 text-center">
                <dt className="text-3xl font-bold text-primary mb-1">{value}</dt>
                <dd className="text-sm text-slate-500">{label}</dd>
              </div>
            ))}
          </dl>
        </PageContainer>
      </div>

      <section className="py-16 md:py-24 bg-surface">
        <PageContainer>
          <div className="text-center mb-14">
            <h2 className="text-4xl font-semibold text-primary mb-4">Built for book lovers</h2>
            <p className="text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
              Discover reads that match your taste—not just what&apos;s trending.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureSection
              title="See why we recommend"
              description="Every suggestion comes with a short explanation—similar themes, era, or reception—so you can trust the fit."
              icon={contentBasedIcon}
            />
            <FeatureSection
              title="Based on what you love"
              description="Start with any book you like. We use it to find reads that match your taste in themes, scope, and style."
              icon={collaborativeIcon}
            />
            <FeatureSection
              title="Similarity you can trust"
              description="We compare books by subjects, authors, and metadata to surface titles that genuinely align with your pick."
              icon={cosineSimilarityIcon}
            />
            <FeatureSection
              title="Your reading, your pace"
              description="No rush. Discover your next read when you're ready; your list is here whenever you return."
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

      {/* How it works — numbered steps */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-white relative overflow-hidden">
        {/* Subtle teal glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(20,184,166,0.07) 0%, transparent 70%)",
          }}
          aria-hidden
        />
        <PageContainer className="relative z-10">
          <div className="text-center mb-14">
            <span className="inline-block text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              Simple process
            </span>
            <h2 className="text-4xl font-semibold mb-4">Three steps to your next read</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              No algorithms to configure, no profile to fill out. Just a book you love.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative">
            {/* Connecting line on md+ */}
            <div
              className="hidden md:block absolute top-6 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
              aria-hidden
            />
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/40 text-accent text-lg font-bold flex items-center justify-center mb-5 relative z-10">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>
    </>
  );
};

export default FeatureContainer;
