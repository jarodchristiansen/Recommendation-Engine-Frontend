// Shared props for card grids. Book-centric after migration (no track types).
export type CardGridProps = {
  items: { id?: string; name: string; subtext: string; image?: string; feature_difference?: Record<string, number>; similarity_score?: number }[];
  handleItemClick: (item: unknown) => void;
  selectedItems: unknown[];
  type: string;
};
