"use client";

import { useRouter } from "next/navigation";
import Button from "../layout/Button";

// To use a hero background image, add hero-books.jpg to public/images and set:
// const HERO_IMAGE_PATH = "/images/hero-books.jpg";
const HERO_IMAGE_PATH = "";

const NOISE_DATA_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

const LandingBanner = () => {
  const router = useRouter();

  const bgStyle = HERO_IMAGE_PATH
    ? {
        backgroundImage: `linear-gradient(135deg, rgba(30,41,59,0.92) 0%, rgba(15,23,42,0.88) 50%, rgba(28,25,23,0.9) 100%), url(${HERO_IMAGE_PATH})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1c1917 100%)",
      };

  return (
    <section className="relative bg-black text-white min-h-screen flex items-center justify-center">
      {/* Hero background */}
      <div className="absolute inset-0" style={bgStyle}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        {/* Paper-grain texture */}
        <div
          className="absolute inset-0 opacity-[0.6] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url("${NOISE_DATA_URL}")`, backgroundSize: "auto" }}
          aria-hidden
        />
        {/* Decorative radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(20,184,166,0.10) 0%, transparent 70%)",
          }}
          aria-hidden
        />
      </div>

      <div className="relative text-center z-10 py-20 px-4 pb-24 max-w-3xl mx-auto">
        {/* Badge pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/40 bg-accent/10 text-accent text-sm font-medium mb-8 backdrop-blur-sm">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden />
          Free · No sign-up required · Open catalog
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold px-3 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] [text-shadow:0_2px_20px_rgba(0,0,0,0.4)] mb-6">
          Discover your{" "}
          <span className="text-accent">next read</span>
        </h1>

        <p className="text-base sm:text-lg max-w-xl mx-auto text-slate-200/95 leading-relaxed mb-8">
          Pick a book you love and get similar recommendations—with a short
          explanation for every suggestion so you always know why it fits.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <Button
            onClick={() => router.push("/recommendations")}
            variant="accent"
            size="large"
            className="shadow-xl shadow-accent/25"
          >
            Get book recommendations
          </Button>
          <a
            href="#how-it-works"
            className="text-slate-300 hover:text-white font-medium transition-colors underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded"
          >
            See how it works
          </a>
        </div>

        {/* Trust chips */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-slate-400 text-sm mb-5">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            No account needed
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            20M+ books indexed
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            Transparent explanations
          </span>
        </div>
        {/* Privacy reassurance */}
        <p className="text-slate-600 text-xs flex items-center justify-center gap-1.5">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          No data stored. No tracking. No spam.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 text-xs tracking-widest uppercase" aria-hidden>
        <span>scroll</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </div>
    </section>
  );
};

export default LandingBanner;
