"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/legacy/image";
import { useSearchParams } from "next/navigation";
import SearchBook from "@/components/search/SearchBook";
import DynamicDataDisplay from "@/components/cards/DynamicDataDisplay";
import Button from "@/components/layout/Button";
import PageContainer from "@/components/layout/PageContainer";
import { addRecentSeed, findSeedByWorkId } from "@/app/lib/recentSeeds";
import { getCoverUrlFromId, getCoverUrlFromWorkKey, FALLBACK_COVER_PATH } from "@/app/lib/covers";
import type { SearchBookType } from "../types/book";

const RecommendationsPage = () => {
  const searchParams = useSearchParams();
  const [selectedBooks, setSelectedBooks] = useState<SearchBookType[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [, setRecommendedBooks] = useState<unknown[]>([]);
  const [fallbackUsed, setFallbackUsed] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const resultsSectionRef = useRef<HTMLElement | null>(null);
  const yourPickSectionRef = useRef<HTMLDivElement | null>(null);
  const workId = selectedBooks[0]?.work_id || selectedBooks[0]?.key?.replace(/^\/works\//, "");

  const handleBookSelect = (books: SearchBookType[]) => {
    setSelectedBooks(books);
    setCurrentStep(books.length > 0 ? 2 : 1);
  };

  const handleClearSelection = () => {
    setSelectedBooks([]);
    setShowRecommendations(false);
    setCurrentStep(1);
  };

  useEffect(() => {
    setShowRecommendations(false);
  }, [selectedBooks]);

  // When recommendations section is shown, scroll it into view so the user sees loading then results
  useEffect(() => {
    if (!showRecommendations || !workId) return;
    const el = resultsSectionRef.current;
    if (!el) return;
    const scrollTimer = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return () => window.clearTimeout(scrollTimer);
  }, [showRecommendations, workId]);

  useEffect(() => {
    const workId = searchParams.get("work_id");
    if (!workId || selectedBooks.length > 0) return;
    const seed = findSeedByWorkId(workId);
    const book: SearchBookType = seed
      ? { work_id: seed.work_id, key: `/works/${seed.work_id}`, title: seed.title, author_name: seed.author_name }
      : { work_id: workId, key: `/works/${workId}`, title: "A book you chose", author_name: "" };
    setSelectedBooks([book]);
    setCurrentStep(2);
    // Defer so the "reset showRecommendations on selectedBooks change" effect runs first, then we show results
    const t = window.setTimeout(() => setShowRecommendations(true), 0);
    return () => window.clearTimeout(t);
  }, [searchParams, selectedBooks.length]);

  const steps = [
    { step: 1, label: "Choose a book you love" },
    { step: 2, label: "See similar books" },
  ];

  return (
    <PageContainer as="main" className="py-16 lg:py-20">
      <h1 className="text-4xl font-bold mb-4 text-center text-primary">
        Discover your next read
      </h1>
      <p className="text-center text-body font-normal text-slate-500 mb-8">
        Pick a book you like—we’ll show similar books in a moment. You can change it anytime.
      </p>

      <div
        className="flex justify-center mb-8 gap-4"
        role="group"
        aria-label="Progress"
      >
        {steps.map((s) => (
          <div
            key={s.step}
            role="group"
            aria-label={`Step ${s.step} of 2: ${s.label}`}
            aria-current={s.step === currentStep ? "step" : undefined}
            className={`text-center px-4 py-2 rounded-lg min-h-[44px] inline-flex items-center justify-center ${s.step === currentStep
              ? "bg-accent text-white"
              : "bg-slate-200 text-slate-500"
              }`}
          >
            {s.label}
          </div>
        ))}
      </div>

      <section className="mb-16">
        <SearchBook
          onSelectBook={handleBookSelect}
          selectedBooks={selectedBooks}
          onClearSelection={handleClearSelection}
          maxSelection={1}
          showChangeBook={false}
          exampleQueries={["Dune", "Harry Potter", "The Great Gatsby"]}
        />
      </section>

      <div
        ref={yourPickSectionRef}
        className={`rounded-lg shadow-md mb-8 overflow-hidden border transition-colors scroll-mt-8 ${selectedBooks.length > 0
          ? "bg-gradient-to-br from-teal-50/80 to-white border-2 border-accent/40 shadow-lg"
          : "bg-surface border border-slate-200"
          }`}
      >
        <div className="px-6 pt-6 flex items-center justify-between gap-2 flex-wrap">
          {selectedBooks.length > 0 && (
            <p className="text-caption text-slate-500 font-medium" aria-hidden>Your starting point</p>
          )}
          <h3 className="text-xl font-semibold text-primary py-6">
            {selectedBooks.length > 0 ? "Your pick" : "Selected book"}
          </h3>
        </div>
        {selectedBooks.length > 0 ? (
          <div className="flex flex-col sm:flex-row gap-5 p-6 pt-3 sm:items-center">
            <div className="relative w-36 h-52 sm:w-40 sm:h-60 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden shadow-md ring-1 ring-slate-200/50">
              {(() => {
                const book = selectedBooks[0];
                const coverUrl =
                  book.cover_url ||
                  (book.cover_i != null && book.cover_i >= 0
                    ? getCoverUrlFromId(book.cover_i)
                    : null) ||
                  getCoverUrlFromWorkKey(book.key || (book.work_id ? `/works/${book.work_id}` : ""));
                return coverUrl ? (
                  <Image
                    src={coverUrl}
                    layout="fill"
                    objectFit="cover"
                    alt={book.title}
                    className="rounded-lg"
                    unoptimized
                  />
                ) : (
                  <Image
                    src={FALLBACK_COVER_PATH}
                    layout="fill"
                    objectFit="cover"
                    alt=""
                    className="rounded-lg"
                    unoptimized
                  />
                );
              })()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xl font-semibold text-primary leading-tight line-clamp-2">{selectedBooks[0].title}</p>
              <p className="text-small text-slate-600 mt-1">
                {Array.isArray(selectedBooks[0].author_name)
                  ? (selectedBooks[0].author_name as string[]).join(", ")
                  : selectedBooks[0].author_name || "Unknown author"}
              </p>
              {selectedBooks[0].first_publish_year != null && (
                <p className="text-caption text-slate-500 mt-0.5">Published {selectedBooks[0].first_publish_year}</p>
              )}
              {selectedBooks[0].subject && selectedBooks[0].subject.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2" aria-label="Subjects">
                  {selectedBooks[0].subject.slice(0, 5).map((s) => (
                    <span key={s} className="inline-block px-2 py-0.5 text-caption rounded-md bg-slate-100 text-slate-600">
                      {s}
                    </span>
                  ))}
                </div>
              )}
              {selectedBooks[0].ratings_average != null && selectedBooks[0].ratings_average > 0 && (
                <p className="mt-2 text-small text-amber-600" aria-label="Average rating">
                  ★ {selectedBooks[0].ratings_average.toFixed(1)}
                  {selectedBooks[0].ratings_count != null && selectedBooks[0].ratings_count > 0 && (
                    <span className="text-slate-500 font-normal ml-1">
                      ({selectedBooks[0].ratings_count >= 1000
                        ? `${(selectedBooks[0].ratings_count / 1000).toFixed(1)}k`
                        : selectedBooks[0].ratings_count} ratings)
                    </span>
                  )}
                </p>
              )}
              <p className="text-small text-slate-500 mt-1.5">We’ll find books similar to this one.</p>
            </div>
            <Button size="small" variant="secondary" onClick={handleClearSelection} className="flex-shrink-0">
              Change book
            </Button>
          </div>
        ) : (
          <div className="px-6 pb-6 pt-1 text-center sm:text-left border border-dashed border-slate-200 rounded-lg mx-6 mb-6 py-8">
            <p className="text-slate-500 text-small">
              Pick a book above to get started—search by title or author, then select one. We'll show similar books in a moment.
            </p>
          </div>
        )}
      </div>

      {selectedBooks.length > 0 && (
        <div className="text-center mb-8">
          <Button
            variant="accent"
            onClick={() => {
              const book = selectedBooks[0];
              if (book?.work_id) {
                addRecentSeed({
                  work_id: book.work_id,
                  title: book.title,
                  author_name: (Array.isArray(book.author_name) ? book.author_name.join(", ") : book.author_name) ?? "",
                });
              }
              setShowRecommendations(true);
              setCurrentStep(2);
            }}
          >
            See similar books
          </Button>
          <p className="text-small text-slate-500 mt-2">We'll match by themes, era, and reception.</p>
        </div>
      )}

      {showRecommendations && workId && selectedBooks[0] && (
        <section ref={resultsSectionRef} className="mt-16 scroll-mt-8">
          <h2 className="text-3xl font-semibold mb-6 text-primary">
            {fallbackUsed ? "Books in a similar vein" : "Books like this one"}
          </h2>
          <p className="text-body font-normal text-slate-500 mb-6 max-w-2xl">
            {fallbackUsed
              ? "We matched by theme and subject. These titles share similar topics with your choice."
              : "We picked these because they share similar themes and scope with your choice."}
          </p>
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 mb-6">
            <div className="relative w-10 h-[60px] flex-shrink-0 bg-slate-100 rounded overflow-hidden">
              {(() => {
                const b = selectedBooks[0];
                const thumbUrl =
                  b.cover_url ||
                  (b.cover_i != null && b.cover_i >= 0 ? getCoverUrlFromId(b.cover_i) : null) ||
                  getCoverUrlFromWorkKey(b.key || (b.work_id ? `/works/${b.work_id}` : ""));
                return thumbUrl ? (
                  <Image
                    src={thumbUrl}
                    layout="fill"
                    objectFit="cover"
                    alt=""
                    className="rounded"
                    unoptimized
                  />
                ) : (
                  <Image
                    src={FALLBACK_COVER_PATH}
                    layout="fill"
                    objectFit="cover"
                    alt=""
                    className="rounded"
                    unoptimized
                  />
                );
              })()}
            </div>
            <span className="text-small font-medium text-primary truncate flex-1 min-w-0">
              Based on: {selectedBooks[0].title}
            </span>
            <button
              type="button"
              onClick={handleClearSelection}
              className="text-small font-medium text-accent hover:underline outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded flex-shrink-0"
            >
              Change
            </button>
          </div>
          <DynamicDataDisplay
            endpoint="/api/recommendations"
            type="book-recommendations"
            seedBook={selectedBooks[0]}
            selectedItems={[]}
            setRecommendedItems={setRecommendedBooks}
            setFallbackUsed={setFallbackUsed}
          />
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Button
              variant="accent"
              onClick={() => {
                handleClearSelection();
                setCurrentStep(1);
              }}
            >
              Find similar to another book
            </Button>
            <Button variant="outline" href="/dashboard">
              Back to dashboard
            </Button>
          </div>
        </section>
      )}
    </PageContainer>
  );
};

export default RecommendationsPage;
