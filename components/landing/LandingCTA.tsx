"use client";

import { useRouter } from "next/navigation";
import Button from "../layout/Button";
import Image from "next/image";
import DashboardImage from "../../public/images/dashboard.png";
import Testimonial from "../cards/Testimonial";
import Link from "next/link";

const LandingCTA = () => {
  const router = useRouter();

  return (
    <>
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

            <Button variant="danger" onClick={() => router.push("/dashboard")}>
              Explore Dashboard
            </Button>
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

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-gray-50 to-white" />
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            What Our Users Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Testimonial
              quote="I love finding new artists, but have a pretty particular taste. This app has been great"
              name="Gavin Sampson"
              avatar="/images/avatar6.jpg"
            />
            <Testimonial
              quote="The customization options are amazing. I finally get the recommendations I care about, instead of just what is popular right now"
              name="Sandra Groves"
              avatar="/images/avatar.jpg"
            />
            <Testimonial
              quote="I have discovered a ton of new artists I never would have found otherwise. Highly recommend!"
              name="Alice Johnson"
              avatar="/images/avatar2.jpg"
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
            <Button onClick={() => router.push("/auth")} variant="danger">
              Start for Free
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default LandingCTA;
