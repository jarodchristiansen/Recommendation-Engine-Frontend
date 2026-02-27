"use client";

import Button from "../layout/Button";
import PageContainer from "../layout/PageContainer";
import Image from "next/legacy/image";
import DashboardImage from "../../public/images/dashboard.png";
import Testimonial from "../cards/Testimonial";
import Link from "next/link";

const LandingCTA = () => {
  return (
    <>
      <section
        id="how-it-works"
        className="py-16 md:py-24 bg-surface relative overflow-hidden scroll-mt-24"
      >
        <PageContainer className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 relative z-10 md:px-8">
            <h2 className="text-4xl font-semibold text-gray-900 mb-6">
              Find similar books
            </h2>
            <p className="text-base font-normal text-gray-600 mb-8">
              Search by title or author, pick a book, and see recommendations
              based on subjects and metadata. Every suggestion comes with a short
              explanation—similar themes, era, or reception—so you know why it
              fits.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-baseline">
              <Link href="/recommendations">
                <Button variant="accent">Get book recommendations</Button>
              </Link>
              <Link
                href="/dashboard"
                className="text-muted hover:text-accent font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
              >
                Returning? Go to dashboard
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
            <p className="text-small font-medium text-slate-500 mb-3">
              Your reading hub: recent picks and one-click recommendations
            </p>
            <div className="relative group">
              <Image
                src={DashboardImage}
                alt="Book Rec dashboard showing search, recent reads, and links to get similar books"
                className="rounded-lg shadow-lg transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl"
                width={800}
                height={500}
              />
            </div>
          </div>
        </PageContainer>

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-surface to-white" />
      </section>

      <section className="py-16 md:py-24 bg-white">
        <PageContainer>
          <h2 className="text-4xl font-semibold text-center mb-16">
            What our users are saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Testimonial
              quote="I have a particular taste in books. This app surfaces similar titles I’d never have found otherwise."
              name="Gavin Sampson"
              avatar="/images/avatar6.jpg"
            />
            <Testimonial
              quote="Seeing why each book was recommended—themes, era, and reception—makes the results feel transparent and useful."
              name="Sandra Groves"
              avatar="/images/avatar.jpg"
            />
            <Testimonial
              quote="Found my next few reads in under 10 minutes. Highly recommend!"
              name="Alice Johnson"
              avatar="/images/avatar2.jpg"
            />
          </div>
        </PageContainer>
      </section>

      <section className="py-16 md:py-24 bg-primary text-white">
        <PageContainer className="text-center">
          <h2 className="text-4xl font-semibold mb-6">Ready to discover books?</h2>
          <p className="text-base font-normal mb-2">
            See why each book was chosen—then find your next favorite read in
            minutes.
          </p>
          <p className="text-small text-slate-300 mb-8">
            No account required. Pick a book and go.
          </p>
          <Link href="/recommendations">
            <Button variant="accent">Get book recommendations</Button>
          </Link>
        </PageContainer>
      </section>
    </>
  );
};

export default LandingCTA;
