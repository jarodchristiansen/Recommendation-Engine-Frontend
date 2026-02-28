import { http, HttpResponse } from "msw";
import { searchDocs, recommendedBooks } from "../fixtures/books";

/** Default GET /api/search - Open Library-like shape with docs */
export const searchHandler = http.get(
  "*/api/search",
  ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    if (!q || !q.trim()) {
      return HttpResponse.json({ error: "Query is required" }, { status: 400 });
    }
    return HttpResponse.json({
      num_found: searchDocs.length,
      start: 0,
      docs: searchDocs,
    });
  },
);

/** Default GET /api/recommendations - recommendations + fallback_used */
export const recommendationsGetHandler = http.get(
  "*/api/recommendations",
  () =>
    HttpResponse.json({
      recommendations: recommendedBooks,
      fallback_used: false,
    }),
);

/** Default POST /api/recommendations */
export const recommendationsPostHandler = http.post(
  "*/api/recommendations",
  () =>
    HttpResponse.json({
      recommendations: recommendedBooks,
      fallback_used: false,
    }),
);

export const handlers = [
  searchHandler,
  recommendationsGetHandler,
  recommendationsPostHandler,
];
