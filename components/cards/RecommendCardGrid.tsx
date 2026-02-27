import { useCallback, useState } from "react";
import Image from "next/legacy/image";
import { CardGridProps } from "@/app/types/commonProps";
import type { RecommendationCardItem } from "@/app/types/book";
import { FALLBACK_COVER_PATH } from "@/app/lib/covers";

/** Map backend feature keys to human-readable "why similar" phrases for readers. */
const FEATURE_LABELS: Record<string, string> = {
  author_count: "Similar depth of authorship",
  subject_count: "Similar themes",
  cover_count: "Well-established title",
  first_publish_year: "Similar era",
  ratings_average: "Similar reception",
};

function getWhySimilarText(featureDifference: Record<string, number> | undefined): string {
  if (!featureDifference || typeof featureDifference !== "object") {
    return "Similar in theme and scope.";
  }
  const phrases = Object.keys(featureDifference)
    .filter((key) => FEATURE_LABELS[key] && key !== "cover_count")
    .slice(0, 3)
    .map((key) => FEATURE_LABELS[key]);
  if (phrases.length === 0) return "Similar in theme and scope.";
  return phrases.join(", ") + ".";
}

const RecommendCardGrid = ({
  items,
  handleItemClick,
  selectedItems,
  type,
}: CardGridProps) => {
  const [failedCoverIds, setFailedCoverIds] = useState<Set<string>>(new Set());
  const markCoverFailed = useCallback((id: string) => {
    setFailedCoverIds((prev) => new Set(prev).add(id));
  }, []);

  const isSelected = (item: RecommendationCardItem) => {
    return selectedItems?.some((s: unknown) => (s as { id?: string })?.id === item.id);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item: RecommendationCardItem, index) => {
        const itemId = item.id || `${item.name}-${index}`;
        const showFallback = !item?.image || failedCoverIds.has(itemId);
        return (
          <div
            key={itemId}
            role="button"
            tabIndex={0}
            onClick={() => handleItemClick(item)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleItemClick(item);
              }
            }}
            className={`group p-6 border rounded-lg cursor-pointer transition-transform transform outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
              isSelected(item) ? "border-accent scale-[1.02]" : "border-slate-200"
            } hover:border-accent hover:scale-[1.02] bg-white shadow-sm`}
          >
            <div className="relative w-full aspect-[2/3] max-h-64 mb-4 bg-slate-100 rounded-lg overflow-hidden">
              {showFallback ? (
                <img
                  src={FALLBACK_COVER_PATH}
                  alt="No cover"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              ) : (
                <Image
                  src={item.image!}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  alt={`${item.name} ${type}`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  unoptimized={true}
                  onError={() => markCoverFailed(itemId)}
                />
              )}
            </div>
          <h4 className="text-lg font-bold text-primary">{item.name}</h4>
          <p className="text-small text-slate-600">{item.subtext}</p>

          {/* Zilliz: show ★ rating only when has_rating === true; never show 0 stars for unrated */}
          {item.has_rating === true && item.avg_rating != null && (
            <p className="mt-2 text-small text-amber-600" aria-label="Average rating">
              ★ {item.avg_rating.toFixed(1)}
            </p>
          )}
          {item.has_rating === false && (
            <p className="mt-2 text-small text-slate-400">No ratings yet</p>
          )}

          {/* Human-readable explanation instead of raw feature radar */}
          <p className="mt-3 text-small text-slate-500 italic" aria-label="Why this book is similar">
            {getWhySimilarText(item.feature_difference)}
          </p>

          {item.similarity_score != null && (
            <span className="inline-block mt-2 text-caption font-medium text-slate-400">
              {Math.round((item.similarity_score as number) * 100)}% match
            </span>
          )}
        </div>
        );
      })}
    </div>
  );
};

export default RecommendCardGrid;
