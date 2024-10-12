// Type returned by search functionality/used for selecting songs
export type SearchTrackType = {
  subtext?: string;
  album: {
    album_type: string;
    artists: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
    available_markets: string[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: {
      height: number;
      url: string;
      width: number;
    }[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  };
  artists: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  feature_difference?: {
    popularity: number;
    danceability: number;
    energy: number;
    valence: number;
    loudness: number;
    key: number;
    speechiness: number;
  };
};

// Type returned in DynamicDataDisplay from recommendations endpoints
export type RecommendedTrackType = {
  id: string;
  name: string;
  subtext: string;
  feature_difference: {
    popularity: number;
    danceability: number;
    energy: number;
    valence: number;
    loudness: number;
    key: number;
    speechiness: number;
  };
  image?: string;
  track_id?: string;
  artist_name?: string;
  track_name?: string;
  danceability?: number;
  energy?: number;
  key?: number;
  loudness?: number;
  speechiness?: number;
  valence?: number;
  popularity?: number;
  similarity_score?: number;
};

export type SelectedArrayType = RecommendedTrackType[] | SearchTrackType[] | [];

export type TrackType = SearchTrackType | RecommendedTrackType;
