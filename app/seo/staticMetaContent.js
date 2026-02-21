// Legacy SEO content (App Router uses export metadata in each page).
// Used by MetaData.tsx if rendered; kept aligned with Book Rec product.

export const recommendationsPageMetaData = {
  title: "Discover your next read | Book Rec",
  description:
    "Pick a book you love and get similar book recommendations based on subjects, authors, and metadata. See why each book was chosen.",
  keywords: ["book recommendations", "Open Library", "recommendation engine", "books"],
  openGraph: {
    type: "website",
    site_name: "Book Rec",
  },
};

export const globalMetaData = {
  title: "Book Rec | Book Recommendation Engine",
  description:
    "Discover books similar to the ones you love. Get personalized book recommendations powered by Open Library.",
  keywords: [
    "book recommendations",
    "Open Library",
    "recommendation engine",
    "books",
  ],
  openGraph: {
    type: "website",
    siteName: "Book Rec",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@yourtwitterhandle",
  },
};

export const MetaDataTable = {
  recommendations: recommendationsPageMetaData,
  global: globalMetaData,
};
