"use client";

import Button from "../layout/Button";
import PageContainer from "../layout/PageContainer";
import Image from "next/legacy/image";
import DashboardImage from "../../public/images/dashboard.png";
import Testimonial from "../cards/Testimonial";
import Link from "next/link";

const faqs = [
  {
    q: "Do I need an account?",
    a: "No. Just pick a book and go. No sign-up, no email, no password required.",
  },
  {
    q: "Where does the data come from?",
    a: "Book Rec is powered by Open Library—a free, open catalog with over 20 million books.",
  },
  {
    q: "How are recommendations chosen?",
    a: "We compare books by subjects, genre tags, authors, and metadata. No black-box algorithm—transparent matching every time.",
  },
  {
    q: "Is Book Rec really free?",
    a: "Yes, always. No premium tiers, no trials, no payment details required.",
  },
  {
    q: "How fast are results?",
    a: "Recommendations load in seconds. Search, pick a book, and see your results instantly.",
  },
  {
    q: "Can I save my picks?",
    a: "Yes. Create a free account to save books to your reading list and revisit them any time.",
  },
];

const LandingCTA = () => {
  return (
    <>
      {/* Product walkthrough */}
      <section
        id="how-it-works"
        className="py-16 md:py-24 bg-surface relative overflow-hidden scroll-mt-24"
      >
        <PageContainer className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <div className="lg:w-1/2 relative z-10 md:pr-8">
            <span className="inline-block text-accent text-sm font-semibold uppercase tracking-widest mb-4">
              In action
            </span>
            <h2 className="text-4xl font-semibold text-primary mb-6 leading-tight">
              Find books you&apos;ll actually love
            </h2>
            <p className="text-base text-slate-600 mb-8 leading-relaxed">
              Search by title or author, pick a book, and see recommendations
              based on subjects and metadata. Every suggestion comes with a short
              explanation—similar themes, era, or reception—so you know exactly
              why it fits.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Search any title or author from millions of books",
                "Recommendations ranked by genuine thematic similarity",
                "Plain-English reason for every suggestion",
                "Save picks to your reading list for later",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <svg
                    className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

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

          <div className="lg:w-1/2 relative">
            <p className="text-sm font-medium text-slate-500 mb-3">
              Your reading hub: recent picks and one-click recommendations
            </p>
            <div className="relative group rounded-xl overflow-hidden shadow-xl ring-1 ring-slate-900/10">
              <Image
                src={DashboardImage}
                alt="Book Rec dashboard showing search, recent reads, and links to get similar books"
                className="transform transition-all duration-500 group-hover:scale-[1.02]"
                width={800}
                height={500}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" aria-hidden />
            </div>
          </div>
        </PageContainer>

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-surface to-white" />
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <PageContainer>
          <div className="text-center mb-12">
            <span className="inline-block text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              What readers say
            </span>
            <h2 className="text-4xl font-semibold text-primary mb-4">
              Readers love Book Rec
            </h2>
            <p className="text-slate-500 text-base max-w-md mx-auto">
              Real feedback from people who found their next favorite book.
            </p>
          </div>

          {/* Featured quote */}
          <figure className="relative max-w-2xl mx-auto mb-12 px-8 py-10 bg-primary rounded-2xl text-white text-center shadow-lg overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(20,184,166,0.15) 0%, transparent 70%)",
              }}
              aria-hidden
            />
            <span className="relative z-10 block text-accent text-6xl font-serif leading-none mb-4" aria-hidden>&ldquo;</span>
            <blockquote className="relative z-10 text-xl font-medium leading-relaxed text-slate-100 italic mb-6">
              Seeing why each book was recommended—themes, era, and reception—makes the results feel transparent and useful.
            </blockquote>
            <figcaption className="relative z-10 flex items-center justify-center gap-3">
              <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20" aria-hidden>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.35 2.437c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.664 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.285-3.957z" />
                  </svg>
                ))}
              </div>
              <span className="text-slate-300 text-sm font-medium">Sandra Groves</span>
            </figcaption>
          </figure>

          {/* 3-column grid — excluding the featured one */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Testimonial
              quote="I have a particular taste in books. This app surfaces similar titles I'd never have found otherwise."
              name="Gavin Sampson"
              avatar="/images/avatar6.jpg"
            />
            <Testimonial
              quote="Found my next few reads in under 10 minutes. Highly recommend!"
              name="Alice Johnson"
              avatar="/images/avatar2.jpg"
            />
            <Testimonial
              quote="The open catalog means I can find obscure titles, not just the bestsellers everyone already knows."
              name="Marcus T."
              avatar="/images/avatar3.jpg"
            />
          </div>
        </PageContainer>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-surface border-t border-slate-200">
        <PageContainer>
          <div className="text-center mb-12">
            <span className="inline-block text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              Common questions
            </span>
            <h2 className="text-3xl font-semibold text-primary">
              Everything you need to know
            </h2>
          </div>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto">
            {faqs.map(({ q, a }) => (
              <div key={q} className="border-l-2 border-accent/30 pl-5">
                <dt className="font-semibold text-primary mb-2">{q}</dt>
                <dd className="text-slate-500 text-sm leading-relaxed">{a}</dd>
              </div>
            ))}
          </dl>
        </PageContainer>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-primary text-white relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(20,184,166,0.12) 0%, transparent 70%)",
          }}
          aria-hidden
        />
        {/* Decorative top edge */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" aria-hidden />

        <PageContainer className="relative z-10 text-center">
          <span className="inline-block text-accent text-sm font-semibold uppercase tracking-widest mb-4">
            Start now
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">
            Ready to discover your<br className="hidden sm:block" /> next favorite book?
          </h2>
          <p className="text-base text-slate-300 mb-2 max-w-md mx-auto leading-relaxed">
            See why each book was chosen—then find your next favorite read in
            minutes.
          </p>
          <p className="text-sm text-slate-500 mb-10">
            No account required. No data stored. Free Service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/recommendations">
              <Button variant="accent" size="large" className="shadow-xl shadow-accent/20">
                Get book recommendations
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="large"
                className="!bg-white !border-2 !border-white text-primary shadow-lg shadow-black/10 hover:!bg-primary hover:!border-primary hover:text-primary-foreground"
              >
                View dashboard
              </Button>
            </Link>
          </div>
          {/* Powered by badge */}
          <p className="mt-10 text-slate-600 text-xs flex items-center justify-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            Powered by{" "}
            <a
              href="https://openlibrary.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-slate-400 transition-colors"
            >
              Open Library
            </a>
          </p>
        </PageContainer>
      </section>
    </>
  );
};

export default LandingCTA;
