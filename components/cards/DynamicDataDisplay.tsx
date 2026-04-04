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
  "Matching themes…",
  "Checking similar eras…",
  "Ranking by reception…",
];

function authorNameFromBook(book: SearchBookType): string {
  const a = book.author_name;
  if (typeof a === "string") return a;
  if (Array.isArray(a)) return a.join(", ");
  return "";
}

/** Build recommend request body from a search-selected book (avoids Open Library fetch). */
function buildRecommendBody(book: SearchBookType): RecommendRequestSeed {
  const work_key = book.key?.startsWith("/works/") ? book.key : `/works/${book.work_id}`;
  const author_name = authorNameFromBook(book);
  const subjects = Array.isArray(book.subject) ? book.subject.slice(0, 10) : [];
  return {
    work_key,
    title: book.title ?? "",
    author_name,
    subjects,
  };
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
  /** When set, POST this seed to endpoint instead of GET. Use for book recommendations to avoid Open Library fetch. */
  seedBook?: SearchBookType | null;
  /** When set, POST this JSON payload directly (e.g. mood requests). Takes precedence over seedBook. */
  moodPayload?: Record<string, unknown> | null;
  onSelectItems?: (items: unknown[]) => void;
  selectedItems: unknown[];
  onClearSelection?: () => void;
  setRecommendedItems?: (items: unknown[]) => void;
  /** Called with Zilliz fallback_used so parent can show "Books like this one" vs "Books in a similar vein". */
  setFallbackUsed?: (value: boolean) => void;
};

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
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const fetchData = useCallback(async () => {
    setError(null);
    const init: RequestInit = moodPayload
      ? {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(moodPayload),
        }
      : seedBook
      ? {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(buildRecommendBody(seedBook)),
        }
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
  }, [endpoint, seedBook, moodPayload, setRecommendedItems, setFallbackUsed]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Rotate loading sub-message when in loading state (no data, no error)
  useEffect(() => {
    if (data.length > 0 || error) return;
    const interval = setInterval(() => {
      setLoadingMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 2500);
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

  return (
    <div className="mt-4 p-6 bg-white shadow-md rounded-lg border border-slate-200">
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
        />
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center" role="alert" aria-live="polite">
          <p className="text-base text-red-700 mb-4">{error}</p>
          <p className="text-small text-slate-600 mb-4">
            Having trouble? Try another book or go back to dashboard.
          </p>
          <Button type="button" variant="accent" size="small" onClick={() => fetchData()}>
            Try again
          </Button>
        </div>
      )}

      {!mappedItems.length && !error && (
        <output
          className="flex flex-col items-center text-center text-slate-500 py-12 block w-full"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="w-12 h-12 border-4 border-slate-200 border-t-accent rounded-full animate-spin mb-4" aria-hidden />
          <span className="text-xl font-semibold mb-2">
            Finding books that match your taste
          </span>
          <p className="text-sm max-w-sm mb-1" key={loadingMessageIndex}>
            {LOADING_MESSAGES[loadingMessageIndex]}
          </p>
          <p className="text-sm max-w-sm text-slate-400">
            This can take a minute the first time. We&apos;re looking for similar books based on themes, era, and reception.
          </p>
        </output>
      )}
    </div>
  );
};

export default DynamicDataDisplay;
