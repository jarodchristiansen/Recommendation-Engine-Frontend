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
      <div className="relative w-full h-48 mb-4 bg-gray-100 rounded-lg overflow-hidden">
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
      <h4 className="text-lg font-bold text-gray-900 line-clamp-2">{book.title}</h4>
      <p className="text-sm text-gray-600">{authorDisplay(book)}</p>
      {book.first_publish_year && (
        <p className="text-xs text-gray-500">{book.first_publish_year}</p>
      )}
    </div>
  )
}


export default function SearchBook({
  onSelectBook,
  selectedBooks = [],
  onClearSelection,
  maxSelection = 1,
}: SearchBookProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchBookType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  const searchBooks = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}&limit=20`);
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

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-2 text-primary">Search for a book</h2>
      <p className="text-small text-slate-500 mb-4">
        Find a book you like to get similar book recommendations.
      </p>

      <div className="flex items-center space-x-4">
        <input
          type="text"
          className="border border-slate-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          placeholder="Title or author..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchBooks()}
        />
        <Button onClick={searchBooks} disabled={loading}>
          {loading ? "Searching…" : "Search"}
        </Button>
      </div>

      {selectedBooks?.length > 0 && (
        <div className="mt-4">
          <Button onClick={onClearSelection} variant="secondary">
            Clear selection
          </Button>
        </div>
      )}

      {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}

      <div className="mt-6">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.slice(0, 3).map((book, index) => (
              <BookEntry
                key={book.work_id || book.key || `${book.title}-${index}`}
                book={book}
                handleBookClick={handleBookClick}
                authorDisplay={authorDisplay}
                isSelected={isSelected}
              />

            ))}

            <button onClick={() => setShowMore(!showMore)}>Show More</button>

            {showMore && (
              <>
                {
                  results.slice(3, 20).map((book, index) => (
                    <BookEntry
                      key={book.work_id || book.key || `${book.title}-${index + 3}`}
                      book={book}
                      handleBookClick={handleBookClick}
                      authorDisplay={authorDisplay}
                      isSelected={isSelected}
                    />
                  ))
                }
              </>
            )}



          </div>
        ) : (
          !loading && (
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
