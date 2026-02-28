"use client";

import Image from "next/legacy/image";
import { useState } from "react";
import Button from "../layout/Button";
import type { SearchBookType } from "@/app/types/book";

type SearchBookProps = {
  onSelectBook?: (books: SearchBookType[]) => void;
  selectedBooks?: SearchBookType[];
  onClearSelection?: () => void;
  maxSelection?: number;
  /** When false, hide the "Change book" button inside SearchBook (e.g. when the parent page shows it in "Your pick" card). Default true. */
  showChangeBook?: boolean;
  /** Optional example search terms shown when the user hasn't searched yet (e.g. ["Dune", "Harry Potter"]). Clicking a chip sets the query and runs search. */
  exampleQueries?: string[];
};

const BookEntry = ({
  book,
  handleBookClick,
  authorDisplay,
  isSelected
}) => {
  return (
    <div
      key={book.work_id || book.key || book.title}
      role="button"
      tabIndex={0}
      onClick={() => handleBookClick(book)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleBookClick(book);
        }
      }}
      className={`group p-4 border rounded-lg cursor-pointer transition-transform outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 hover:border-accent hover:scale-[1.02] ${isSelected(book) ? "border-accent bg-teal-50/50" : "border-slate-200"
        }`}
    >
      <div className="relative w-full h-48 mb-4 bg-slate-100 rounded-lg overflow-hidden">
        {book.cover_url || (book.cover_i != null && book.cover_i >= 0) ? (
          <Image
            src={book.cover_url || `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            alt={book.title}
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 text-small">
            No cover
          </div>
        )}
      </div>
      <h4 className="text-lg font-bold text-primary line-clamp-2">{book.title}</h4>
      <p className="text-sm text-slate-600">{authorDisplay(book)}</p>
      {book.first_publish_year && (
        <p className="text-xs text-slate-500">{book.first_publish_year}</p>
      )}
    </div>
  )
}


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
    const q = String(overrideQuery ?? query ?? "").trim();
    if (!q) {
      setResults([]);
      setError(null);
      setHasSearched(true);
      return;
    }
    setQuery(overrideQuery ?? query);
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
      setError("Search failed");
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

  const authorDisplay = (b: SearchBookType) =>
    Array.isArray(b.author_name) ? (b.author_name as string[]).join(", ") : (b.author_name as string) || "Unknown";

  const initialCount = 6;
  const hasMore = results.length > initialCount;
  const extraCount = Math.max(0, results.length - initialCount);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg border border-slate-200">
      <h2 className="text-2xl font-semibold mb-2 text-primary">Search for a book</h2>
      <p className="text-small text-slate-500 mb-4">
        Find a book you like to get similar book recommendations.
      </p>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </span>
          <input
            type="text"
            className="border border-slate-300 rounded-lg py-2 pl-10 pr-3 w-full focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            placeholder="Search by title or author (e.g. Dune, Jane Austen)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchBooks()}
          />
        </div>
        <Button onClick={searchBooks} disabled={loading}>
          {loading ? "Searching…" : "Search"}
        </Button>
      </div>

      {showChangeBook && selectedBooks?.length > 0 && (
        <div className="mt-4">
          <Button onClick={onClearSelection} variant="secondary">
            Change book
          </Button>
        </div>
      )}

      {exampleQueries && exampleQueries.length > 0 && !hasSearched && !loading && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-small text-slate-500">Try searching:</span>
          {exampleQueries.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => searchBooks(term)}
              className="rounded-full border border-slate-200 bg-secondary px-4 py-2 text-small font-medium text-primary hover:border-accent hover:bg-accent/10 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      )}

      {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}

      <div className="mt-6">
        {results.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="mt-6 flex justify-center" role="region" aria-label="Additional search results">
                <Button
                  variant="outline"
                  onClick={() => setShowMore(!showMore)}
                  aria-expanded={showMore}
                  aria-controls="search-results-extra"
                >
                  {showMore ? "Show less" : `Show ${extraCount} more result${extraCount !== 1 ? "s" : ""}`}
                </Button>
              </div>
            )}
            {showMore && hasMore && (
              <div
                id="search-results-extra"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
                role="region"
                aria-label="More search results"
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
          hasSearched && !loading && (
            <div className="rounded-lg border border-slate-200 bg-surface p-6 text-center">
              <p className="font-medium text-slate-700">No books found. Try another search.</p>
              <p className="text-small mt-2 text-slate-500">Try author name or a different spelling.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
