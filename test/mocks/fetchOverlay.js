/**
 * Default fetch implementation for tests that need API responses.
 * Matches MSW handler contract (same shape as test/fixtures/books.ts).
 */
const searchDocs = [
  { key: "/works/OL1W", work_id: "OL1W", title: "Book One", author_name: ["Author One"] },
  { key: "/works/OL2W", work_id: "OL2W", title: "Book Two", author_name: ["Author Two"] },
];
const recommendedBooks = [
  { work_id: "1", title: "Book One", author_name: "Author One", cover_url: "/cover1.jpg" },
  { work_id: "2", title: "Book Two", author_name: "Author Two", cover_url: "/cover2.jpg" },
];

function defaultFetch(url) {
  const u = typeof url === "string" ? url : url?.url;
  if (u && u.includes("/api/search")) {
    try {
      const urlObj = typeof u === "string" ? new URL(u, "http://localhost") : u;
      const q = urlObj.searchParams.get("q");
      if (q == null || String(q).trim() === "") {
        return Promise.resolve({
          ok: false,
          json: () => Promise.resolve({ error: "Query is required" }),
        });
      }
    } catch {
      return Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: "Query is required" }),
      });
    }
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ num_found: searchDocs.length, start: 0, docs: searchDocs }),
    });
  }
  if (u && u.includes("/api/recommendations")) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ recommendations: recommendedBooks, fallback_used: false }),
    });
  }
  return Promise.reject(new Error("Unhandled fetch in test"));
}

function install() {
  global.fetch = jest.fn(defaultFetch);
}

function uninstall() {
  global.fetch = undefined;
}

module.exports = { install, uninstall, defaultFetch };
