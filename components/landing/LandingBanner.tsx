"use client";

import { useRouter } from "next/navigation";
import AudioHeroImage from "../../public/images/audioboard-hero-2.jpg";
import Button from "../layout/Button";

const LandingBanner = () => {
  const router = useRouter();

  return (
    <section className="relative bg-black text-white h-screen flex items-center justify-center audio-hero">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${AudioHeroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/75 to-transparent"></div>
      </div>

      <div className="relative text-center z-10">
        <h1 className="text-5xl font-bold px-3 drop-shadow-lg">
          Your Personalized Soundtrack Awaits
        </h1>
        <p className="text-lg max-w-xl mx-auto py-8 pb-12 px-8 md:px-0 text-gray-200">
          Discover new tracks and hidden gems with AI-powered recommendations
          made just for you.
        </p>
        <Button
          onClick={() => router.push("/recommendations")}
          variant="danger"
        >
          Create Your Playlist
        </Button>
      </div>
    </section>
  );
};

export default LandingBanner;
