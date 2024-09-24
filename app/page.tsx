"use client"; // This makes the component a Client Component
import Link from "next/link";

import AudioHeroImage from "../images/audioboard-hero-2.jpg";

import LesserKnownArtists from "../images/lesser-known-artists.jpg";
import IndieArtists from "../images/indie-musicians.jpg";
import BanjoMusician from "../images/banjo.jpeg";

import Image from "next/image";

import collaborativeIcon from "../images/icons/collaborative.svg";
import contentBasedIcon from "../images/icons/contentBased.svg";
import cosineSimilarityIcon from "../images/icons/chart.svg";
import nmfIcon from "../images/icons/matrix.svg";
import lessPopularIcon from "../images/icons/discoverArtists.svg";
import customizeIcon from "../images/icons/customize.svg";

import "./index.css";
import Button from "@/components/layout/Button";

type TestimonialProps = {
  quote: string;
  name: string;
  avatar: string;
};

type FeatureProps = {
  title: string;
  description: string;
  icon?: string;
};

export default function Home() {
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
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent"></div>{" "} */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/75 to-transparent"></div>

          {/* Gradient Overlay */}
        </div>

        <div className="relative text-center z-10">
          <h1 className="text-5xl font-bold px-3 drop-shadow-lg">
            Your Personalized Soundtrack Awaits
          </h1>
          <p className="text-lg max-w-xl mx-auto py-8 pb-12 px-8 md:px-0 text-gray-200">
            Discover new tracks and hidden gems with AI-powered recommendations
            made just for you.
          </p>
          <Link href="/auth">
            <Button
              onClick={() => console.log("Button clicked")}
              variant="primary"
            >
              Create Your Playlist
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Feature
              title="Collaborative Filtering"
              description="Utilizing user interactions and behavior to generate your ideal playlist."
              icon={collaborativeIcon}
            />
            <Feature
              title="Content-Based Filtering"
              description="Analyzing song attributes like genre, tempo, and mood to match your preferences."
              icon={contentBasedIcon}
            />
            <Feature
              title="Cosine Similarity"
              description="Identifying tracks that align with your taste based on vectorized song features."
              icon={cosineSimilarityIcon}
            />
            <Feature
              title="NMF Models"
              description="Matrix factorization to reveal hidden patterns in music tastes."
              icon={nmfIcon}
            />
            <Feature
              title="Less Popular Artist Highlighted"
              description="Discover hidden gems, not just the same mainstream hits."
              icon={lessPopularIcon}
            />
            <Feature
              title="Customizable Filters"
              description="Fine-tune your recommendations with adjustable weights for factors like popularity, genre, and tempo."
              icon={customizeIcon}
            />
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      {/* <section className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Highlighting Emerging Artists
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-300">
            Tired of hearing the same tracks on repeat? Our platform goes beyond
            mainstream recommendations, bringing attention to incredible yet
            underrepresented artists. Dive deep into music discovery!
          </p>
          <div className="relative mx-auto max-w-lg">
            <Image
              src={BanjoMusician}
              height={200}
              width={500}
              className="mx-auto h-18 w-18"
              alt={"artists"}
            />
          </div>
        </div>
      </section> */}

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

      {/* <section className="pt-12 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold pb-6">
            Highlighting Emerging Artists
          </h2>
          <p className="text-lg max-w-2xl mx-auto pb-16 text-gray-300">
            Tired of hearing the same tracks on repeat? Our platform goes beyond
            mainstream recommendations, bringing attention to incredible yet
            underrepresented artists. Dive deep into music discovery!
          </p>
        </div>
        <div>
          <Image
            src={BanjoMusician}
            height={500}
            width={1920}
            className="w-full h-60 object-cover"
            alt="emerging artists"
          />
        </div>
      </section> */}

      {/* Music Visualization Section */}
      <section className="py-20 bg-gray-50">
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
      </section>

      {/* Control Dashboard Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            Fine-Tune Your Recommendations
          </h2>
          <p className="text-lg text-center mb-6">
            You are in control. Adjust the weight of different factors that
            matter to you, like reducing the influence of popularity or focusing
            more on specific genres.
          </p>
          <div className="text-center">
            {/* Replace with a preview image */}
            <img
              src="/images/dashboard-preview.png"
              alt="Dashboard Preview"
              className="mx-auto rounded-lg shadow-lg"
            />
            <Link href="/dashboard">
              <Button onClick={() => console.log("Button clicked")}>
                {" "}
                Explore Dashboard
              </Button>
            </Link>
          </div>
        </div>
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
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Discover Your Sound?
          </h2>
          <Link href="/auth">
            <button className="bg-blue-500 text-white px-8 py-4 rounded-full hover:bg-blue-600 transition-all">
              Sign Up Now
            </button>
          </Link>
        </div>
      </section> */}

      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Sound?</h2>
          <p className="mb-6">
            "I found my favorite new artist in less than 10 minutes!" - Music
            Fan
          </p>
          <Link href="/auth">
            <Button onClick={() => console.log("Button clicked")}>
              Start for Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

const Testimonial = ({ quote, name, avatar }: TestimonialProps) => {
  return (
    <div className="text-center p-6 bg-gray-100 rounded-lg shadow-md">
      <img
        src={avatar}
        alt={`${name} avatar`}
        className="mx-auto h-16 w-16 rounded-full mb-4"
      />
      <p className="italic mb-4">{quote}</p>
      <h4 className="font-bold">{name}</h4>
    </div>
  );
};

const Feature = ({ title, description, icon = "" }: FeatureProps) => {
  return (
    <div className="text-center bg-gray-100 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {/* Add an icon here */}
      <div className="mb-4">
        <Image
          src={icon}
          alt={`${title} icon`}
          width={50}
          height={50}
          className="mx-auto h-18 w-18"
        />
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};
