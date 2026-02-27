import type { RecommendationCardItem } from "./book";

// Shared props for card grids. Book-centric after migration (no track types).
export type CardGridProps = {
  items: RecommendationCardItem[];
  handleItemClick: (item: RecommendationCardItem) => void;
  selectedItems: RecommendationCardItem[];
  type: string;
};
