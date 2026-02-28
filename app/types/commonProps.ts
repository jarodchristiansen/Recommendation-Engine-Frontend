import type { RecommendationCardItem } from "./book";

// Shared props for card grids. Book-centric after migration (no track types).
export type CardGridProps = {
  items: RecommendationCardItem[];
  handleItemClick: (item: RecommendationCardItem) => void;
  // Keep flexible so legacy callers can pass any shape; grids will cast as needed.
  selectedItems: unknown[];
  type: string;
};
