import { useCallback, useState } from "react";
import Image from "next/legacy/image";
import { CardGridProps } from "@/app/types/commonProps";
import type { RecommendationCardItem } from "@/app/types/book";
import { FALLBACK_COVER_PATH, openLibraryWorkPageUrl } from "@/app/lib/covers";

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

const cardBaseClass =
  "group w-full text-left rounded-xl outline-none transition-[border-color,box-shadow] border border-slate-200 bg-white shadow-sm animate-card-fade-in hover:border-accent/50 hover:shadow-md overflow-hidden";

const RecommendCardGrid = ({
  items,
  handleItemClick,
  selectedItems,
  type,
  cardRole = "selectable",
}: CardGridProps) => {
  const listLabel =
    type === "mood-recommendations" ? "Mood-based book recommendations" : "Similar book recommendations";
  const [failedCoverIds, setFailedCoverIds] = useState<Set<string>>(new Set());
  const markCoverFailed = useCallback((id: string) => {
    setFailedCoverIds((prev) => new Set(prev).add(id));
  }, []);

  const isSelected = (item: RecommendationCardItem) => {
    return selectedItems?.some((s: unknown) => (s as { id?: string })?.id === item.id);
  };

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3" aria-label={listLabel}>
      {items.map((item: RecommendationCardItem, index) => {
        const itemId = item.id || `${item.name}-${index}`;
        const showFallback = !item?.image || failedCoverIds.has(itemId);
        const olUrl = openLibraryWorkPageUrl(item.id);
        const selected = isSelected(item);
        const delayStyle = { animationDelay: `${index * 45}ms` } as const;
        const rank = index + 1;
        const scorePercent = item.similarity_score != null ? Math.round(item.similarity_score * 100) : null;

        const coverBlock = (
          <div className="relative w-full overflow-hidden bg-slate-100" style={{ aspectRatio: "2/3", maxHeight: "260px" }}>
            {showFallback ? (
              <Image
                src={FALLBACK_COVER_PATH}
                alt=""
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 h-full w-full object-cover"
                unoptimized
              />
            ) : (
              <Image
                src={item.image!}
                layout="fill"
                objectFit="cover"
                alt={`Cover: ${item.name}`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                unoptimized={true}
                onError={() => markCoverFailed(itemId)}
              />
            )}
            {/* Rank badge */}
            <span
              className="absolute top-2.5 left-2.5 w-7 h-7 rounded-full bg-primary/80 backdrop-blur-sm text-white text-xs font-bold flex items-center justify-center shadow-md"
              aria-label={`Ranked #${rank}`}
            >
              {rank}
            </span>
          </div>
        );

        const body = (
          <>
            {coverBlock}
            <div className="p-5 flex flex-col flex-1">
              <h4 className="text-base font-semibold leading-snug text-primary mb-1">{item.name}</h4>
              <p className="text-sm text-slate-500 mb-2">{item.subtext}</p>

              {/* Subjects */}
              {item.subjects && (
                <div className="flex flex-wrap gap-1.5 mb-3" aria-label="Subjects">
                  {item.subjects
                    .split(/,\s*/)
                    .filter(Boolean)
                    .slice(0, 4)
                    .map((s) => (
                      <span
                        key={s}
                        className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
                      >
                        {s.trim()}
                      </span>
                    ))}
                </div>
              )}

              {/* Rating */}
              {item.has_rating === true && item.avg_rating != null && (
                <p className="text-sm text-amber-600 mb-2 flex items-center gap-1" aria-label="Average rating">
                  <span aria-hidden>★</span>
                  <span className="font-semibold">{item.avg_rating.toFixed(1)}</span>
                  <span className="text-slate-400 text-xs font-normal">/ 5</span>
                </p>
              )}

              {/* Explanation */}
              <div className="mt-auto">
                <p
                  className="mt-2 text-sm leading-relaxed text-slate-600 bg-slate-50 border-l-2 border-accent/50 pl-3 py-2 pr-2 rounded-r-md"
                  aria-label="Why this book is similar"
                >
                  {item.explanation ?? getWhySimilarText(item.feature_difference)}
                </p>

                {/* Description */}
                {item.description && (
                  <p className="mt-2 line-clamp-2 text-xs text-slate-400 leading-relaxed" aria-label="Book description">
                    {item.description}
                  </p>
                )}

                {/* Similarity score */}
                {scorePercent != null && (
                  <div className="mt-3" aria-label={`${scorePercent}% match to your pick`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-accent">{scorePercent}% match</span>
                      <span className="text-xs text-slate-400">to your pick</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-accent/70 transition-all duration-500"
                        style={{ width: `${scorePercent}%` }}
                        aria-hidden
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        );

        if (cardRole === "browse") {
          return (
            <article
              key={itemId}
              className={`${cardBaseClass} flex flex-col`}
              style={delayStyle}
              aria-label={`Recommendation: ${item.name}`}
            >
              {body}
              {olUrl ? (
                <div className="px-5 pb-5">
                  <a
                    href={olUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full rounded-lg border border-slate-200 bg-surface px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-accent hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    View on Open Library
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              ) : null}
            </article>
          );
        }

        return (
          <button
            key={itemId}
            type="button"
            onClick={() => handleItemClick(item)}
            className={`${cardBaseClass} flex flex-col cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
              selected ? "border-accent ring-1 ring-accent/25 shadow-md" : ""
            }`}
            style={delayStyle}
          >
            {body}
          </button>
        );
      })}
    </div>
  );
};

export default RecommendCardGrid;
