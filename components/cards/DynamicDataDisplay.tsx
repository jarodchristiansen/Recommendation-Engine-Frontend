import RecommendCardGrid from "@/components/cards/RecommendCardGrid";
import Button from "@/components/layout/Button";
import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  RecommendationCardItem,
  RecommendRequestSeed,
  SearchBookType,
} from "@/app/types/book";
import { getCoverUrl } from "@/app/lib/covers";

/** Build recommend request body from a search-selected book (avoids Open Library fetch). */
function buildRecommendBody(book: SearchBookType): RecommendRequestSeed {
  const work_key = book.key?.startsWith("/works/") ? book.key : `/works/${book.work_id}`;
  const author_name =
    typeof book.author_name === "string"
      ? book.author_name
      : Array.isArray(book.author_name)
        ? book.author_name.join(", ")
        : "";
  const subjects = Array.isArray(book.subject) ? book.subject.slice(0, 10) : [];
  return {
    work_key,
    title: book.title ?? "",
    author_name,
    subjects,
  };
}

type DynamicDataDisplayProps = {
  endpoint: string;
  type: "book-recommendations" | "recommendations";
  /** When set, POST this seed to endpoint instead of GET. Use for book recommendations to avoid Open Library fetch. */
  seedBook?: SearchBookType | null;
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
  onSelectItems,
  selectedItems,
  onClearSelection,
  setRecommendedItems,
  setFallbackUsed,
}: DynamicDataDisplayProps) => {
  const [data, setData] = useState<unknown[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setError(null);
    const init: RequestInit = seedBook
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
      const err =
        typeof result?.error === "string"
          ? result.error
          : typeof result?.detail === "string"
            ? result.detail
            : result?.detail ?? result?.error
              ? JSON.stringify(result.detail ?? result.error)
              : "Request failed";
      setError(err);
      setData([]);
      setRecommendedItems?.([]);
      return;
    }

    const items = result?.recommendations ?? result?.items ?? result;
    const list = Array.isArray(items) ? items : [];
    setData(list);
    setRecommendedItems?.(list);
    setFallbackUsed?.(result.fallback_used ?? false);
  }, [endpoint, seedBook, setRecommendedItems, setFallbackUsed]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const isSelected = (item: { work_id?: string; id?: string }) => {
    const id = item?.work_id ?? item?.id;
    return selectedItems?.some(
      (s: unknown) => (s as { work_id?: string; id?: string })?.work_id === item.work_id ||
        (s as { id?: string })?.id === id
    );
  };

  const handleItemClick = (item: unknown) => {
    if (!onSelectItems) return;
    const i = item as { work_id?: string; id?: string };
    const id = i?.work_id ?? i?.id;
    if (isSelected(i)) {
      const filtered = (selectedItems as unknown[]).filter(
        (s: unknown) => (s as { work_id?: string; id?: string })?.work_id !== i.work_id && (s as { id?: string })?.id !== id
      );
      onSelectItems(filtered);
    } else if ((selectedItems?.length ?? 0) < 3) {
      onSelectItems([...(selectedItems ?? []), item]);
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
      };
    });
  }, [data]);

  return (
    <div className="mt-4 p-6 bg-white shadow-md rounded-lg">
      {selectedItems && (selectedItems as unknown[]).length > 0 && onClearSelection && (
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
          <Button type="button" variant="accent" size="small" onClick={() => fetchData()}>
            Try again
          </Button>
        </div>
      )}

      {!mappedItems.length && !error && (
        <div
          className="flex flex-col items-center text-center text-slate-500 py-12"
          aria-live="polite"
          aria-busy="true"
          role="status"
        >
          <div className="w-12 h-12 border-4 border-slate-200 border-t-accent rounded-full animate-spin mb-4" aria-hidden />
          <span className="text-xl font-semibold mb-2">
            Finding books that match your taste
          </span>
          <p className="text-sm max-w-sm">
            This can take a minute the first time. We&apos;re looking for similar reads based on themes, era, and reception.
          </p>
        </div>
      )}
    </div>
  );
};

export default DynamicDataDisplay;
