"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SearchBook from "@/components/search/SearchBook";
import PageContainer from "@/components/layout/PageContainer";
import { getRecentSeeds } from "@/app/lib/recentSeeds";
import type { SearchBookType } from "@/app/types/book";
import Button from "@/components/layout/Button";

export default function Dashboard() {
  const recentSeeds = useMemo(() => getRecentSeeds(), []);
  const [selectedBook, setSelectedBook] = useState<SearchBookType | null>(null);

  return (
    <div className="bg-surface min-h-screen">
      <header className="bg-primary text-primary-foreground py-8">
        <PageContainer>
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">Your dashboard</h1>
            <Link href="/" className="text-slate-300 hover:text-white hover:underline">
              Back to home
            </Link>
          </div>
          <p className="text-base font-normal mt-2 text-slate-200">
            Discover books and get personalized recommendations.
          </p>
        </PageContainer>
      </header>

      <PageContainer as="main" className="py-16 lg:py-20">
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-primary mb-2">
            Discover books
          </h2>
          <p className="text-body font-normal text-slate-600 mb-4">
            Pick a book you like and we’ll recommend similar titles based on
            subjects, authors, and metadata.
          </p>
          <Link
            href="/recommendations"
            className="inline-block bg-accent hover:bg-accent-hover text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Get book recommendations →
          </Link>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-primary mb-4">
            Search books
          </h2>
          <SearchBook
            maxSelection={1}
            selectedBooks={selectedBook ? [selectedBook] : []}
            onSelectBook={(books) => setSelectedBook(books.length > 0 ? books[0] : null)}
            onClearSelection={() => setSelectedBook(null)}
          />
          {selectedBook && (
            <div className="mt-4">
              <Link
                href={`/recommendations?work_id=${encodeURIComponent(
                  selectedBook.work_id || (selectedBook.key || "").replace(/^\/works\//, "") || ""
                )}`}
              >
                <Button variant="accent">Get similar books</Button>
              </Link>
            </div>
          )}
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-primary mb-2">
            Your reading
          </h2>
          <div className="mt-4 p-6 bg-white shadow-md rounded-lg border border-slate-200">
            {recentSeeds.length > 0 ? (
              <>
                <p className="text-body font-normal text-slate-600 mb-4">
                  Recently used for recommendations. Click to find similar books again.
                </p>
                <ul className="space-y-3">
                  {recentSeeds.map((seed) => (
                    <li key={seed.work_id}>
                      <Link
                        href={`/recommendations?work_id=${encodeURIComponent(seed.work_id)}`}
                        className="text-accent hover:underline font-medium"
                      >
                        {seed.title}
                        {Array.isArray(seed.author_name)
                          ? ` by ${seed.author_name.join(", ")}`
                          : seed.author_name
                            ? ` by ${seed.author_name}`
                            : ""}
                      </Link>
                      <span className="text-slate-500 ml-2">— Find similar again</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-slate-600">
                Books you use for recommendations will appear here. Use the recommendations page to discover similar books from any title you search.
              </p>
            )}
          </div>
        </section>
      </PageContainer>
    </div>
  );
}
