import { CardGridProps } from "@/app/types/commonProps";
import Image from "next/legacy/image";

/**
 * Legacy generic card grid (from music recommender). Not used in the book flow;
 * RecommendCardGrid is used instead. Kept for tests and possible future reuse.
 */
const CardGrid = ({
  items,
  handleItemClick,
  selectedItems,
  type,
}: CardGridProps) => {
  const isSelected = (item: { id?: string }) => {
    return selectedItems?.some(
      (selected) => (selected as { id?: string })?.id === item.id,
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item: any) => (
        <div
          key={item.id}
          onClick={() => handleItemClick(item)}
          className={`group p-4 border rounded-lg cursor-pointer transition-transform transform ${
            isSelected(item) ? "border-blue-500 scale-105" : "border-gray-200"
          } hover:border-blue-500 hover:scale-105`}
        >
          <div className="relative w-full h-48 mb-4">
            <Image
              src={item.image}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              alt={`${item.name} ${type}`}
              unoptimized={true} // Disable optimization for this image
            />
          </div>
          <h4 className="text-lg font-bold text-gray-900">{item.name}</h4>
          <p className="text-sm text-gray-600">{item.subtext}</p>
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
