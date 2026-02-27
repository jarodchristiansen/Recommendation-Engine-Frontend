// Types for Open Library book search and recommendations (replacing track-centric types for the books migration).

/** One doc from Open Library search or from our recommendations API. */
export type SearchBookType = {
  key: string; // e.g. "/works/OL45804W"
  work_id: string; // normalized e.g. "OL45804W"
  title: string;
  author_name: string | string[];
  first_publish_year?: number;
  cover_i?: number;
  edition_count?: number;
  subject?: string[];
  ratings_average?: number;
  ratings_count?: number;
  cover_url?: string;
};

/** Book as returned in recommendations list (Zilliz: work_key, has_rating, shelf counts, cover_id; legacy: similarity_score, feature_difference). */
export type RecommendedBookType = {
  work_id?: string;
  work_key?: string;
  title: string;
  author_name: string;
  cover_url?: string | null;
  /** Open Library cover ID (preferred for covers.openlibrary.org/b/id/{id}-M.jpg). */
  cover_id?: number | null;
  cover_i?: number | null;
  subjects?: string;
  description?: string;
  avg_rating?: number;
  has_rating?: boolean;
  rating_count?: number;
  want_to_read_count?: number;
  currently_reading_count?: number;
  already_read_count?: number;
  total_shelf_count?: number;
  author_count?: number;
  subject_count?: number;
  cover_count?: number;
  similarity_score?: number;
  feature_difference?: {
    author_count: number;
    subject_count: number;
    cover_count: number;
  };
};

/** Request body for POST /api/recommendations and FastAPI POST /recommend. */
export type RecommendRequestSeed = {
  work_key: string;
  title: string;
  author_name: string;
  subjects: string[];
};

/** Response from POST /recommend (and GET /api/recommendations). */
export type RecommendResponse = {
  recommendations: RecommendedBookType[];
  fallback_used: boolean;
};

export type SelectedBookArrayType = SearchBookType[] | RecommendedBookType[] | [];

/** Shape used by RecommendCardGrid (mapped from API recommendation items). */
export type RecommendationCardItem = {
  id: string;
  name: string;
  subtext: string;
  image?: string;
  feature_difference?: Record<string, number>;
  similarity_score?: number;
  /** Zilliz: show star rating only when true; otherwise show "No ratings yet" or omit. */
  has_rating?: boolean;
  avg_rating?: number;
};
