import { RecommendedTrackType, SelectedArrayType } from "./track";

export type CardGridProps = {
  items: any;
  handleItemClick: (item: RecommendedTrackType) => void;
  selectedSongs: SelectedArrayType;
  type: string;
};
