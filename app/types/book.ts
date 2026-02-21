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

/** Book as returned in recommendations list (backend adds similarity_score, feature_difference). */
export type RecommendedBookType = {
  work_id: string;
  title: string;
  author_name: string;
  cover_url?: string | null;
  cover_i?: number | null;
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

export type SelectedBookArrayType = SearchBookType[] | RecommendedBookType[] | [];

/** Shape used by RecommendCardGrid (mapped from API recommendation items). */
export type RecommendationCardItem = {
  id: string;
  name: string;
  subtext: string;
  image?: string;
  feature_difference?: Record<string, number>;
  similarity_score?: number;
};
