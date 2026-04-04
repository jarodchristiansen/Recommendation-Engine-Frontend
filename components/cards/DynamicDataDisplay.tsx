import RecommendCardGrid from "@/components/cards/RecommendCardGrid";
import Button from "@/components/layout/Button";
import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  RecommendationCardItem,
  RecommendRequestSeed,
  SearchBookType,
} from "@/app/types/book";
import { getCoverUrl } from "@/app/lib/covers";
import { errorMessageFromApiBody } from "@/app/lib/apiErrors";

const LOADING_MESSAGES = [
  "Scanning themes and subjects…",
  "Matching by publication era…",
  "Ranking by reader reception…",
  "Almost ready…",
];

function authorNameFromBook(book: SearchBookType): string {
  const a = book.author_name;
  if (typeof a === "string") return a;
  if (Array.isArray(a)) return a.join(", ");
  return "";
}

function buildRecommendBody(book: SearchBookType): RecommendRequestSeed {
  const work_key = book.key?.startsWith("/works/") ? book.key : `/works/${book.work_id}`;
  const author_name = authorNameFromBook(book);
  const subjects = Array.isArray(book.subject) ? book.subject.slice(0, 10) : [];
  return { work_key, title: book.title ?? "", author_name, subjects };
}

type ItemIdFields = { work_id?: string; id?: string };

function itemIdFields(item: unknown): ItemIdFields | null {
  if (typeof item !== "object" || item === null) return null;
  const o = item as Record<string, unknown>;
  return {
    work_id: typeof o.work_id === "string" ? o.work_id : undefined,
    id: typeof o.id === "string" ? o.id : undefined,
  };
}

type DynamicDataDisplayProps = {
  endpoint: string;
  type: "book-recommendations" | "mood-recommendations";
  seedBook?: SearchBookType | null;
  moodPayload?: Record<string, unknown> | null;
  onSelectItems?: (items: unknown[]) => void;
  selectedItems: unknown[];
  onClearSelection?: () => void;
  setRecommendedItems?: (items: unknown[]) => void;
  setFallbackUsed?: (value: boolean) => void;
};

const SkeletonCard = () => (
  <div className="animate-pulse rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
    <div className="aspect-[2/3] max-h-52 w-full bg-slate-200" />
    <div className="p-5">
      <div className="h-4 bg-slate-200 rounded mb-2 w-4/5" />
      <div className="h-3 bg-slate-200 rounded mb-4 w-2/5" />
      <div className="flex gap-1.5 mb-4">
        <div className="h-5 w-14 bg-slate-100 rounded-md" />
        <div className="h-5 w-16 bg-slate-100 rounded-md" />
      </div>
      <div className="h-3 bg-slate-100 rounded mb-1.5 w-full" />
      <div className="h-3 bg-slate-100 rounded w-4/5" />
    </div>
  </div>
);

const DynamicDataDisplay = ({
  endpoint,
  type,
  seedBook,
  moodPayload,
  onSelectItems,
  selectedItems,
  onClearSelection,
  setRecommendedItems,
  setFallbackUsed,
}: DynamicDataDisplayProps) => {
  const [data, setData] = useState<unknown[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const fetchData = useCallback(async () => {
    setError(null);
    setHasLoaded(false);
    const init: RequestInit = moodPayload
      ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(moodPayload) }
      : seedBook
      ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(buildRecommendBody(seedBook)) }
      : {};
    const res = await fetch(endpoint, init);
    const result = (await res.json()) as {
      recommendations?: unknown[];
      items?: unknown[];
      fallback_used?: boolean;
      detail?: unknown;
      error?: string;
    };

    if (!res.ok) {
      setError(errorMessageFromApiBody(result));
      setData([]);
      setRecommendedItems?.([]);
      return;
    }

    const items = result?.recommendations ?? result?.items ?? result;
    const list = Array.isArray(items) ? items : [];
    setData(list);
    setRecommendedItems?.(list);
    setFallbackUsed?.(result.fallback_used ?? false);
    setHasLoaded(true);
  }, [endpoint, seedBook, moodPayload, setRecommendedItems, setFallbackUsed]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (data.length > 0 || error) return;
    const interval = setInterval(() => {
      setLoadingMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [data.length, error]);

  const isSelected = (item: ItemIdFields) => {
    const id = item.work_id ?? item.id;
    return selectedItems.some((s) => {
      const f = itemIdFields(s);
      if (!f) return false;
      return f.work_id === item.work_id || f.id === id;
    });
  };

  const handleItemClick = (item: unknown) => {
    if (!onSelectItems) return;
    const i = itemIdFields(item);
    if (!i) return;
    const id = i.work_id ?? i.id;
    if (isSelected(i)) {
      const filtered = selectedItems.filter((s) => {
        const f = itemIdFields(s);
        if (!f) return true;
        return f.work_id !== i.work_id && f.id !== id;
      });
      onSelectItems(filtered);
    } else if (selectedItems.length < 3) {
      onSelectItems([...selectedItems, item]);
    }
  };

  const mappedItems: RecommendationCardItem[] = useMemo(() => {
    if (!Array.isArray(data) || !data.length) return [];
    return data.map((raw: unknown) => {
      const item = raw as Record<string, unknown>;
      const workId =
        (item.work_id as string | undefined) ??
        (item.work_key as string | undefined)?.replace(/^\/works\//, "");
      const workKey = (item.work_key as string | undefined) ?? (workId ? `/works/${workId}` : undefined);
      const coverUrl =
        (item.cover_url as string | undefined) ??
        getCoverUrl({
          cover_id: item.cover_id as number | undefined,
          cover_i: item.cover_i as number | undefined,
          work_key: workKey,
        }) ??
        undefined;
      const id = workId ?? (item.id as string) ?? "";
      return {
        id,
        name: (item.title as string) ?? (item.name as string) ?? "",
        subtext: (item.author_name as string) ?? (item.subtext as string) ?? "",
        image: coverUrl ?? (item.image as string),
        feature_difference: item.feature_difference as Record<string, number> | undefined,
        similarity_score: item.similarity_score as number | undefined,
        has_rating: item.has_rating as boolean | undefined,
        avg_rating: item.avg_rating as number | undefined,
        description: (item.description as string)?.trim() || undefined,
        subjects: (item.subjects as string)?.trim() || undefined,
        explanation: (item.explanation as string) || undefined,
      };
    });
  }, [data]);

  const isLoading = !hasLoaded && !error;

  return (
    <div>
      {selectedItems.length > 0 && onClearSelection && (
        <div className="mb-4">
          <Button variant="secondary" size="small" onClick={onClearSelection}>
            Clear Selection
          </Button>
        </div>
      )}

      {mappedItems.length > 0 && !error && (
        <RecommendCardGrid
          items={mappedItems}
          handleItemClick={handleItemClick}
          selectedItems={selectedItems ?? []}
          type={type}
          cardRole={onSelectItems ? "selectable" : "browse"}
        />
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50/90 p-6 text-center" role="alert" aria-live="polite">
          <svg className="w-8 h-8 text-red-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <p className="text-base font-semibold text-red-900 mb-1">Couldn&apos;t load recommendations</p>
          <p className="text-sm text-red-800/80 mb-4">{error}</p>
          <p className="text-sm text-slate-600 mb-4">
            Try a different anchor book, or come back in a moment.
          </p>
          <Button type="button" variant="accent" size="small" onClick={() => fetchData()}>
            Try again
          </Button>
        </div>
      )}

      {isLoading && (
        <div aria-live="polite" aria-busy="true">
          {/* Animated loading header */}
          <div className="flex flex-col items-center text-center mb-8 py-4">
            <div className="w-10 h-10 border-[3px] border-slate-200 border-t-accent rounded-full animate-spin mb-4" aria-hidden />
            <p className="text-base font-semibold text-slate-800 mb-1">
              Finding books that match your taste
            </p>
            <p className="text-sm text-slate-500 max-w-sm transition-all" key={loadingMessageIndex} aria-live="polite">
              {LOADING_MESSAGES[loadingMessageIndex]}
            </p>
          </div>

          {/* Skeleton grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      )}

      {/* Empty state: API returned 0 results */}
      {!isLoading && !error && mappedItems.length === 0 && data.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-surface p-10 text-center">
          <svg className="w-10 h-10 text-slate-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          <p className="font-semibold text-slate-700 mb-2">No matches found for this book</p>
          <p className="text-sm text-slate-500">
            The catalog may be thin for this title. Try a different book to find similar reads.
          </p>
        </div>
      )}
    </div>
  );
};

export default DynamicDataDisplay;
