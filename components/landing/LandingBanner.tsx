"use client";

import { useRouter } from "next/navigation";
import Button from "../layout/Button";

// To use a hero background image, add hero-books.jpg to public/images and set:
// const HERO_IMAGE_PATH = "/images/hero-books.jpg";
const HERO_IMAGE_PATH = "";

// Grain texture: more visible than before but still subordinate to content
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
      backgroundSize: "cover",
      backgroundPosition: "center",
    };

  return (
    <section className="relative bg-black text-white min-h-screen flex items-center justify-center">
      {/* Hero background */}
      <div className="absolute inset-0 bg-cover bg-center" style={bgStyle}>
        {/* Gradient keeps text legible over texture */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
        {/* Paper-like grain: more noticeable, still subtle */}
        <div
          className="absolute inset-0 opacity-[1] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url("${NOISE_DATA_URL}")`, backgroundSize: "auto" }}
          aria-hidden
        />
      </div>

      <div className="relative text-center z-10 py-16 px-4 pb-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold px-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] [text-shadow:0_2px_20px_rgba(0,0,0,0.4)]">
          Discover your next read
        </h1>
        <p className="text-base sm:text-lg max-w-xl mx-auto pt-6 pb-4 px-4 md:px-0 text-slate-200/95 leading-relaxed">
          Pick a book you love and get similar recommendations—with a short
          explanation for every suggestion. No sign-up required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 pb-10">
          <Button
            onClick={() => router.push("/recommendations")}
            variant="accent"
            size="large"
            className="shadow-xl shadow-accent/20"
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
      </div>
    </section>
  );
};

export default LandingBanner;
