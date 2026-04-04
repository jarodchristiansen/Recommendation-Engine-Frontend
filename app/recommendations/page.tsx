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

  // Auto-scroll to "Your pick" section when a book is selected
  useEffect(() => {
    if (selectedBooks.length === 0 || !yourPickSectionRef.current) return;
    const t = window.setTimeout(() => {
      yourPickSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 150);
    return () => window.clearTimeout(t);
  }, [selectedBooks.length]);

  // Scroll results into view when shown
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
      ? {
        work_id: seed.work_id,
        key: `/works/${seed.work_id}`,
        title: seed.title,
        author_name: seed.author_name,
        ...(seed.subjects?.length ? { subject: seed.subjects } : {}),
      }
      : { work_id: workId, key: `/works/${workId}`, title: "A book you chose", author_name: "" };
    setSelectedBooks([book]);
    setCurrentStep(2);
    const t = window.setTimeout(() => setShowRecommendations(true), 0);
    return () => window.clearTimeout(t);
  }, [searchParams, selectedBooks.length]);

  const steps = [
    { step: 1, label: "Choose your book", description: "Search and pick one anchor title." },
    { step: 2, label: "Get matches", description: "Ranked by themes, era, and reception." },
  ] as const;

  return (
    <>
      {/* Dark hero header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        {/* Subtle teal glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 30% 50%, rgba(20,184,166,0.08) 0%, transparent 60%)",
          }}
          aria-hidden
        />
        <PageContainer className="relative z-10 py-10 lg:py-12">
          <header className="mb-8 max-w-2xl">
            <span className="inline-block text-accent text-xs font-semibold uppercase tracking-widest mb-3">
              Powered by Open Library
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-3">
              Find your next read
            </h1>
            <p className="text-slate-300 leading-relaxed max-w-xl">
              Start from a book you already love. We surface similar titles with a plain-English reason for every match—no account needed.
            </p>
          </header>

          <nav aria-label="Progress" className="max-w-sm">
            <ol className="flex list-none items-start gap-0 p-0">
              {steps.map((s, i) => {
                const done = currentStep > s.step;
                const current = currentStep === s.step;
                return (
                  <li key={s.step} className="flex min-w-0 flex-1 flex-col items-center">
                    <div className="flex w-full items-center">
                      {i > 0 ? (
                        <div
                          className={`h-0.5 min-h-[2px] flex-1 rounded-full transition-colors duration-300 ${currentStep > steps[i - 1]!.step ? "bg-accent" : "bg-slate-600"}`}
                          aria-hidden
                        />
                      ) : null}
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                          done
                            ? "bg-accent text-white"
                            : current
                              ? "bg-accent text-white shadow-lg shadow-accent/30"
                              : "bg-slate-700 text-slate-400"
                        }`}
                        aria-current={current ? "step" : undefined}
                      >
                        {done ? <span aria-hidden>✓</span> : s.step}
                      </span>
                      {i < steps.length - 1 ? (
                        <div
                          className={`h-0.5 min-h-[2px] flex-1 rounded-full transition-colors duration-300 ${done ? "bg-accent" : "bg-slate-600"}`}
                          aria-hidden
                        />
                      ) : null}
                    </div>
                    <p className={`mt-2 text-center text-xs font-semibold leading-snug ${current ? "text-white" : "text-slate-400"}`}>
                      {s.label}
                    </p>
                    <p className="mt-0.5 hidden text-center text-xs text-slate-500 sm:block">{s.description}</p>
                  </li>
                );
              })}
            </ol>
          </nav>
        </PageContainer>
      </div>

      {/* Main content area */}
      <PageContainer as="main" className="py-10 lg:py-14">

        <section className="mb-10">
          <SearchBook
            onSelectBook={handleBookSelect}
            selectedBooks={selectedBooks}
            onClearSelection={handleClearSelection}
            maxSelection={1}
            showChangeBook={false}
            exampleQueries={["Dune", "Harry Potter", "The Great Gatsby", "Jane Austen"]}
          />
        </section>

        {/* Your pick / anchor card */}
        <div
          ref={yourPickSectionRef}
          className={`mb-8 scroll-mt-8 overflow-hidden rounded-2xl border transition-all duration-300 ${
            selectedBooks.length > 0
              ? "border-accent/40 bg-gradient-to-br from-teal-50/80 via-white to-white shadow-md"
              : "border-slate-200 bg-surface shadow-sm"
          }`}
        >
          <div className="border-b border-slate-200/80 bg-white/60 px-6 py-4 backdrop-blur-sm flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                {selectedBooks.length > 0 ? "Step 1 complete" : "Step 1"}
              </p>
              <h2 className="mt-0.5 text-lg font-semibold text-primary">
                {selectedBooks.length > 0 ? "Your anchor book" : "No book selected yet"}
              </h2>
            </div>
            {selectedBooks.length > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-semibold">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Ready to match
              </span>
            )}
          </div>

          {selectedBooks.length > 0 ? (
            <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start">
              <div className="relative w-28 h-40 sm:w-32 sm:h-48 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden shadow-md ring-1 ring-slate-200/50">
                {(() => {
                  const book = selectedBooks[0];
                  const coverUrl =
                    book.cover_url ||
                    (book.cover_i != null && book.cover_i >= 0 ? getCoverUrlFromId(book.cover_i) : null) ||
                    getCoverUrlFromWorkKey(book.key || (book.work_id ? `/works/${book.work_id}` : ""));
                  return coverUrl ? (
                    <Image src={coverUrl} layout="fill" objectFit="cover" alt={book.title} className="rounded-lg" unoptimized />
                  ) : (
                    <Image src={FALLBACK_COVER_PATH} layout="fill" objectFit="cover" alt="No cover image" className="rounded-lg" unoptimized />
                  );
                })()}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xl font-semibold text-primary leading-tight line-clamp-2 mb-1">{selectedBooks[0].title}</p>
                <p className="text-sm text-slate-600 mb-0.5">
                  {Array.isArray(selectedBooks[0].author_name)
                    ? (selectedBooks[0].author_name as string[]).join(", ")
                    : selectedBooks[0].author_name || "Unknown author"}
                </p>
                {selectedBooks[0].first_publish_year != null && (
                  <p className="text-xs text-slate-500 mb-2">Published {selectedBooks[0].first_publish_year}</p>
                )}
                {selectedBooks[0].subject && selectedBooks[0].subject.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3" aria-label="Subjects">
                    {selectedBooks[0].subject.slice(0, 5).map((s) => (
                      <span key={s} className="inline-block px-2 py-0.5 text-xs rounded-md bg-slate-100 text-slate-600">{s}</span>
                    ))}
                  </div>
                )}
                {selectedBooks[0].ratings_average != null && selectedBooks[0].ratings_average > 0 && (
                  <p className="text-sm text-amber-600 mb-3" aria-label="Average rating">
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
                <p className="text-sm text-slate-500 leading-relaxed">
                  We&apos;ll match similar books by themes, publication era, and reader reception.
                </p>
              </div>

              <Button size="small" variant="secondary" onClick={handleClearSelection} className="flex-shrink-0 self-start">
                Change book
              </Button>
            </div>
          ) : (
            <div className="mx-6 mb-6 mt-4 rounded-xl border border-dashed border-slate-200 bg-white/50 px-5 py-8 text-center">
              <p className="text-sm text-slate-500 leading-relaxed">
                Search above and pick one book. You can change your selection any time.
              </p>
            </div>
          )}
        </div>

        {/* CTA to get recommendations */}
        {selectedBooks.length > 0 && !showRecommendations && (
          <div className="mb-10 text-center">
            <Button
              variant="accent"
              size="large"
              className="min-h-[52px] min-w-[220px] shadow-lg shadow-accent/25 gap-2"
              onClick={() => {
                const book = selectedBooks[0];
                if (book?.work_id) {
                  addRecentSeed({
                    work_id: book.work_id,
                    title: book.title,
                    author_name: (Array.isArray(book.author_name) ? book.author_name.join(", ") : book.author_name) ?? "",
                    ...(Array.isArray(book.subject) && book.subject.length > 0
                      ? { subjects: book.subject.slice(0, 10) }
                      : {}),
                  });
                }
                setShowRecommendations(true);
                setCurrentStep(2);
              }}
            >
              Find similar books
              <svg className="w-4 h-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
            <p className="mt-3 text-sm text-slate-500">
              Matched by themes, era, and reception—with a plain-English explanation for every pick.
            </p>
          </div>
        )}

        {/* Results */}
        {showRecommendations && workId && selectedBooks[0] && (
          <section ref={resultsSectionRef} className="scroll-mt-6 border-t border-slate-200/90 pt-12">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="max-w-xl">
                <span className="inline-block text-accent text-xs font-semibold uppercase tracking-widest mb-2">
                  {fallbackUsed ? "Broadened match" : "Results"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
                  {fallbackUsed ? "Close matches by theme" : "Books like your pick"}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {fallbackUsed
                    ? "We widened the match to subject overlap so you still get useful suggestions when the catalog is thin."
                    : "Each card explains why it sits near your anchor—shared subjects, era, or reader reception."}
                </p>
              </div>

              {/* Matched-from pill */}
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm self-start sm:self-auto shrink-0">
                <div className="relative h-10 w-7 shrink-0 overflow-hidden rounded bg-slate-100 ring-1 ring-slate-200/80">
                  {(() => {
                    const b = selectedBooks[0];
                    const thumbUrl =
                      b.cover_url ||
                      (b.cover_i != null && b.cover_i >= 0 ? getCoverUrlFromId(b.cover_i) : null) ||
                      getCoverUrlFromWorkKey(b.key || (b.work_id ? `/works/${b.work_id}` : ""));
                    return thumbUrl ? (
                      <Image src={thumbUrl} layout="fill" objectFit="cover" alt="" className="rounded" unoptimized />
                    ) : (
                      <Image src={FALLBACK_COVER_PATH} layout="fill" objectFit="cover" alt="" className="rounded" unoptimized />
                    );
                  })()}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide leading-none mb-0.5">Anchor</p>
                  <p className="text-sm font-semibold text-primary truncate max-w-[140px]">{selectedBooks[0].title}</p>
                </div>
                <button
                  type="button"
                  onClick={handleClearSelection}
                  className="ml-1 shrink-0 text-xs font-semibold text-accent outline-none hover:underline focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
                >
                  Change
                </button>
              </div>
            </div>

            <DynamicDataDisplay
              endpoint="/api/recommendations"
              type="book-recommendations"
              seedBook={selectedBooks[0]}
              selectedItems={[]}
              setFallbackUsed={setFallbackUsed}
            />

            <div className="mt-12 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                variant="accent"
                onClick={() => {
                  handleClearSelection();
                  setCurrentStep(1);
                }}
              >
                Match a different book
              </Button>
              <Button variant="outline" href="/dashboard">
                Back to dashboard
              </Button>
            </div>
          </section>
        )}
      </PageContainer>
    </>
  );
};

export default RecommendationsPage;
