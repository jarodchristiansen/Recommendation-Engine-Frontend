"use client";

import Image from "next/legacy/image";
import { useState } from "react";
import Button from "../layout/Button";
import type { SearchBookType } from "@/app/types/book";

type SearchBookProps = Readonly<{
  onSelectBook?: (books: SearchBookType[]) => void;
  selectedBooks?: SearchBookType[];
  onClearSelection?: () => void;
  maxSelection?: number;
  showChangeBook?: boolean;
  exampleQueries?: string[];
}>;

type BookEntryProps = Readonly<{
  book: SearchBookType;
  handleBookClick: (book: SearchBookType) => void;
  authorDisplay: (b: SearchBookType) => string;
  isSelected: (book: SearchBookType) => boolean;
}>;

const NoCoverPlaceholder = ({ title }: { title: string }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-100 to-slate-200 text-slate-400 gap-2 p-3">
    <svg className="w-8 h-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
    <span className="text-xs text-center leading-tight opacity-70 line-clamp-2">{title}</span>
  </div>
);

const BookEntry = ({ book, handleBookClick, authorDisplay, isSelected }: BookEntryProps) => {
  const selected = isSelected(book);
  return (
    <button
      type="button"
      onClick={() => handleBookClick(book)}
      className={`group w-full text-left border rounded-xl cursor-pointer transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 overflow-hidden ${
        selected
          ? "border-accent shadow-md shadow-accent/15 ring-1 ring-accent/20"
          : "border-slate-200 hover:border-accent/60 hover:shadow-md"
      }`}
    >
      {/* Cover */}
      <div className="relative w-full h-44 bg-slate-100 overflow-hidden">
        {book.cover_url || (book.cover_i != null && book.cover_i >= 0) ? (
          <Image
            src={book.cover_url || `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
            layout="fill"
            objectFit="cover"
            alt={book.title}
            unoptimized
          />
        ) : (
          <NoCoverPlaceholder title={book.title} />
        )}
        {/* Selected checkmark overlay */}
        {selected && (
          <div className="absolute inset-0 bg-accent/20 flex items-start justify-end p-2">
            <span className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shadow-md">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </div>
        )}
      </div>
      {/* Info */}
      <div className="p-4">
        <h4 className={`text-sm font-semibold leading-snug line-clamp-2 mb-1 ${selected ? "text-accent" : "text-primary group-hover:text-accent transition-colors"}`}>
          {book.title}
        </h4>
        <p className="text-xs text-slate-500 line-clamp-1">{authorDisplay(book)}</p>
        {book.first_publish_year && (
          <p className="text-xs text-slate-400 mt-0.5">{book.first_publish_year}</p>
        )}
      </div>
    </button>
  );
};


export default function SearchBook({
  onSelectBook,
  selectedBooks = [],
  onClearSelection,
  maxSelection = 1,
  showChangeBook = true,
  exampleQueries,
}: SearchBookProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchBookType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchBooks = async (overrideQuery?: string) => {
    const fromChip = typeof overrideQuery === "string" ? overrideQuery : undefined;
    const q = String(fromChip ?? query ?? "").trim();
    if (!q) {
      setResults([]);
      setError(null);
      setHasSearched(true);
      return;
    }
    setQuery(fromChip ?? query);
    setLoading(true);
    setError(null);
    setHasSearched(false);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=20`);
      const data = await res.json();
      if (data.error && !data.docs) {
        setError(data.error);
        setResults([]);
      } else {
        setResults(data.docs || []);
      }
    } catch {
      setError("Search failed. Check your connection and try again.");
      setResults([]);
    } finally {
      setLoading(false);
      setHasSearched(true);
    }
  };

  const isSelected = (book: SearchBookType) =>
    selectedBooks?.some((b) => (b.work_id || b.key) === (book.work_id || book.key));

  const handleBookClick = (book: SearchBookType) => {
    if (!onSelectBook) return;
    const id = book.work_id || (book.key || "").replace(/^\/works\//, "") || book.key;
    const toAdd = { ...book, work_id: id };
    if (isSelected(book)) {
      onSelectBook(selectedBooks.filter((b) => (b.work_id || b.key) !== (book.work_id || book.key)));
    } else if (selectedBooks.length < maxSelection) {
      onSelectBook([...selectedBooks, toAdd]);
    }
  };

  const authorDisplay = (b: SearchBookType) => {
    const a = b.author_name;
    const text = Array.isArray(a) ? a.join(", ") : a;
    return text || "Unknown author";
  };

  const initialCount = 6;
  const hasMore = results.length > initialCount;
  const extraCount = Math.max(0, results.length - initialCount);
  const moreResultsButtonLabel = showMore
    ? "Show fewer results"
    : `Show ${extraCount} more ${extraCount === 1 ? "result" : "results"}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="border-b border-slate-100 px-6 py-5">
        <h2 className="text-xl font-semibold text-primary mb-1">Start with a book you love</h2>
        <p className="text-sm text-slate-500">
          Search by title or author—then pick one book as your anchor. We&apos;ll find what reads like it.
        </p>
      </div>

      {/* Search input */}
      <div className="px-6 pt-5 pb-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </span>
            <input
              type="text"
              className="w-full border border-slate-300 rounded-xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-colors placeholder:text-slate-400"
              placeholder="e.g. Dune, Jane Austen, The Great Gatsby…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchBooks()}
            />
          </div>
          <Button onClick={searchBooks} disabled={loading} variant="primary" className="shrink-0">
            {loading ? "Searching…" : "Search"}
          </Button>
        </div>

        {showChangeBook && selectedBooks?.length > 0 && (
          <div className="mt-3">
            <Button onClick={onClearSelection} variant="secondary" size="small">
              Change book
            </Button>
          </div>
        )}

        {/* Example query chips */}
        {exampleQueries && exampleQueries.length > 0 && !hasSearched && !loading && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Try:</span>
            {exampleQueries.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => searchBooks(term)}
                className="rounded-full border border-slate-200 bg-secondary px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:border-accent hover:bg-accent/8 hover:text-accent outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        )}

        {error && (
          <p className="mt-3 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
            {error}
          </p>
        )}
      </div>

      {/* Results area */}
      <div className="px-6 pb-6">
        {loading ? (
          <div
            className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-surface py-14"
            role="status"
            aria-live="polite"
            aria-busy="true"
          >
            <div className="mb-4 h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-accent" aria-hidden />
            <p className="text-sm font-medium text-slate-700">Searching Open Library…</p>
            <p className="mt-1 max-w-xs text-center text-xs text-slate-500">Hang tight—fetching titles that match your query.</p>
          </div>
        ) : results.length > 0 ? (
          <>
            <p className="text-xs text-slate-400 mb-4 font-medium">
              {results.length} result{results.length !== 1 ? "s" : ""} — click a book to select it
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
              {results.slice(0, initialCount).map((book, index) => (
                <BookEntry
                  key={book.work_id || book.key || `${book.title}-${index}`}
                  book={book}
                  handleBookClick={handleBookClick}
                  authorDisplay={authorDisplay}
                  isSelected={isSelected}
                />
              ))}
            </div>
            {hasMore && (
              <div className="mt-5 flex justify-center">
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => setShowMore(!showMore)}
                  aria-expanded={showMore}
                  aria-controls="search-results-extra"
                >
                  {moreResultsButtonLabel}
                </Button>
              </div>
            )}
            {showMore && hasMore && (
              <div
                id="search-results-extra"
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 mt-4"
              >
                {results.slice(initialCount, 20).map((book, index) => (
                  <BookEntry
                    key={book.work_id || book.key || `${book.title}-${index + initialCount}`}
                    book={book}
                    handleBookClick={handleBookClick}
                    authorDisplay={authorDisplay}
                    isSelected={isSelected}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          hasSearched && (
            <div className="rounded-xl border border-slate-200 bg-surface p-8 text-center">
              <svg className="w-10 h-10 text-slate-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <p className="font-semibold text-slate-700 mb-1">No books matched that search</p>
              <p className="text-sm text-slate-500">
                Try the author&apos;s last name, a shorter title, or check spelling—Open Library&apos;s index can be picky.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
