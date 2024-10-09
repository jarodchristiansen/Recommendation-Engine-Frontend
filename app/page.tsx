"use client"; // This makes the component a Client Component
import Link from "next/link";
import Image from "next/image";

import AudioHeroImage from "../public/images/audioboard-hero-2.jpg";
import BanjoMusician from "../public/images/banjo.jpeg";
import DashboardImage from "../public/images/dashboard.png";

import collaborativeIcon from "../public/images/icons/collaborative.svg";
import contentBasedIcon from "../public/images/icons/contentBased.svg";
import cosineSimilarityIcon from "../public/images/icons/chart.svg";
import nmfIcon from "../public/images/icons/matrix.svg";
import lessPopularIcon from "../public/images/icons/discoverArtists.svg";
import customizeIcon from "../public/images/icons/customize.svg";

import "./index.css";
import Button from "@/components/layout/Button";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import FeatureSection from "@/components/layout/FeatureSection";
import Testimonial from "@/components/cards/Testimonial";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="bg-gray-100">
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
            onClick={() => {
              if (session) {
                router.push("/recommendations");
              } else {
                router.push("/auth");
              }
            }}
            variant="danger"
          >
            Create Your Playlist
          </Button>
        </div>
      </section>

      {/* Features Section */}
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
              description="Analyzing song attributes like genre, tempo, and mood to match your preferences."
              icon={contentBasedIcon}
            />
            <FeatureSection
              title="Cosine Similarity"
              description="Identifying tracks that align with your taste based on vectorized song features."
              icon={cosineSimilarityIcon}
            />
            <FeatureSection
              title="NMF Models"
              description="Matrix factorization to reveal hidden patterns in music tastes."
              icon={nmfIcon}
            />
            <FeatureSection
              title="Less Popular Artist Highlighted"
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

      {/* Music Visualization Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            Music Visualization
          </h2>
          <div className="text-center">
            <p className="text-lg mb-6">
              Enjoy rich visualizations while listening to track samples. Each
              track generates unique, real-time waveforms and spectrums.
            </p>
            <img
              src="/images/waveform-example.png"
              alt="Music Visualization Example"
              className="mx-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section> */}

      {/* Control Dashboard Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 relative z-10 md:px-8">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Fine-Tune Your Recommendations
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              You are in control. Adjust the weight of different factors that
              matter to you, like reducing the influence of popularity or
              focusing more on specific genres.
            </p>
            <Link href="/dashboard">
              <Button variant="danger">Explore Dashboard</Button>
            </Link>
          </div>

          <div className="lg:w-1/2 mt-8 lg:mt-0 relative">
            <div className="relative group">
              <Image
                src={DashboardImage}
                alt="Dashboard Preview"
                className="rounded-lg shadow-lg transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl"
                width={800}
                height={500}
              />
            </div>
          </div>
        </div>

        {/* Add diagonal divider for smooth section transition */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-gray-50 to-white" />
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            What Our Users Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Testimonial
              quote="This platform completely changed the way I discover music. I love finding hidden gems!"
              name="John Doe"
              avatar="/images/user-avatar-1.jpg"
            />
            <Testimonial
              quote="The customization options are amazing. I finally get the recommendations I care about."
              name="Jane Smith"
              avatar="/images/user-avatar-2.jpg"
            />
            <Testimonial
              quote="The customization options are amazing. I finally get the recommendations I care about."
              name="Jane Smith"
              avatar="/images/user-avatar-2.jpg"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Sound?</h2>
          <p className="mb-6">
            I found my favorite new artist in less than 10 minutes! - Music Fan
          </p>
          <Link href="/auth">
            <Button
              onClick={() => console.log("Button clicked")}
              variant="danger"
            >
              Start for Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
