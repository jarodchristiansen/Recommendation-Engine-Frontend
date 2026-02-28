/**
 * Test fixtures aligned with app/types/book.ts for search and recommendations API contracts.
 */

export const searchDocs = [
  {
    key: "/works/OL1W",
    work_id: "OL1W",
    title: "Book One",
    author_name: ["Author One"],
    first_publish_year: 2000,
    cover_i: 12345,
    cover_url: "https://covers.openlibrary.org/b/id/12345-M.jpg",
  },
  {
    key: "/works/OL2W",
    work_id: "OL2W",
    title: "Book Two",
    author_name: "Author Two",
    first_publish_year: 2001,
    cover_i: 12346,
    cover_url: "https://covers.openlibrary.org/b/id/12346-M.jpg",
  },
];

export const recommendedBooks = [
  {
    work_id: "1",
    title: "Book One",
    author_name: "Author One",
    cover_url: "/cover1.jpg",
    feature_difference: { author_count: 0, subject_count: 1 },
  },
  {
    work_id: "2",
    title: "Book Two",
    author_name: "Author Two",
    cover_url: "/cover2.jpg",
    feature_difference: { author_count: 0, subject_count: 2 },
  },
];

/** Shape for RecommendCardGrid / CardGrid (id, name, subtext, image). */
export const recommendationCardItems = [
  { id: "1", name: "Book One", subtext: "Author One", image: "/cover1.jpg" },
  { id: "2", name: "Book Two", subtext: "Author Two", image: "/cover2.jpg" },
  { id: "3", name: "Book Three", subtext: "Author Three", image: "/cover3.jpg" },
];
