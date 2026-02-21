"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SearchBook from "@/components/search/SearchBook";
import DynamicDataDisplay from "@/components/cards/DynamicDataDisplay";
import Button from "@/components/layout/Button";
import PageContainer from "@/components/layout/PageContainer";
import { addRecentSeed, findSeedByWorkId } from "@/app/lib/recentSeeds";
import type { SearchBookType } from "../types/book";

const RecommendationsPage = () => {
  const searchParams = useSearchParams();
  const [selectedBooks, setSelectedBooks] = useState<SearchBookType[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendedBooks, setRecommendedBooks] = useState<unknown[]>([]);
  const [currentStep, setCurrentStep] = useState(1);

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

  useEffect(() => {
    const workId = searchParams.get("work_id");
    if (!workId || selectedBooks.length > 0) return;
    const seed = findSeedByWorkId(workId);
    const book: SearchBookType = seed
      ? { work_id: seed.work_id, key: `/works/${seed.work_id}`, title: seed.title, author_name: seed.author_name }
      : { work_id: workId, key: `/works/${workId}`, title: "This book", author_name: "" };
    setSelectedBooks([book]);
    setCurrentStep(2);
    setShowRecommendations(true);
  }, [searchParams]);

  const workId = selectedBooks[0]?.work_id || selectedBooks[0]?.key?.replace(/^\/works\//, "");

  const steps = [
    { step: 1, label: "Choose a book you love" },
    { step: 2, label: "See similar reads" },
  ];
  const selectedTitle = selectedBooks[0]?.title;

  return (
    <PageContainer as="main" className="py-16 lg:py-20">
      <h1 className="text-4xl font-bold mb-4 text-center text-primary">
        Discover your next read
      </h1>
      <p className="text-center text-body font-normal text-slate-500 mb-8">
        Pick a book you like—you can change it anytime. We’ll show similar reads with short explanations.
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
            className={`text-center px-4 py-2 rounded-lg min-h-[44px] inline-flex items-center justify-center ${
              s.step === currentStep
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
        />
      </section>

      <div className="bg-surface border border-gray-200 p-6 rounded-lg shadow-sm mb-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          Selected book
        </h3>
        {selectedBooks.length > 0 ? (
          <div className="flex justify-between items-center flex-wrap gap-2">
            <span className="text-gray-700">
              {selectedBooks[0].title}
              {Array.isArray(selectedBooks[0].author_name)
                ? ` by ${(selectedBooks[0].author_name as string[]).join(", ")}`
                : selectedBooks[0].author_name
                  ? ` by ${selectedBooks[0].author_name}`
                  : ""}
            </span>
            <Button size="small" variant="secondary" onClick={handleClearSelection}>
              Remove
            </Button>
          </div>
        ) : (
          <p className="text-slate-500 text-small">No book selected.</p>
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
                  author_name: book.author_name ?? "",
                });
              }
              setShowRecommendations(true);
              setCurrentStep(2);
            }}
          >
            See similar books
          </Button>
        </div>
      )}

      {showRecommendations && workId && (
        <section className="mt-16">
          <h2 className="text-3xl font-semibold mb-6 text-primary">
            {selectedTitle ? `Books similar to ${selectedTitle}` : "Recommended books"}
          </h2>
          <p className="text-body font-normal text-slate-500 mb-6 max-w-2xl">
            We picked these because they share similar themes and scope with your choice.
          </p>
          <DynamicDataDisplay
            endpoint={`/api/recommendations?work_id=${encodeURIComponent(workId)}`}
            type="book-recommendations"
            selectedItems={[]}
            setRecommendedItems={setRecommendedBooks}
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
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full font-semibold px-6 py-3 min-h-[44px] border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 outline-none"
            >
              Back to dashboard
            </Link>
          </div>
        </section>
      )}
    </PageContainer>
  );
};

export default RecommendationsPage;
