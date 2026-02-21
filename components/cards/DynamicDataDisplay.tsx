import RecommendCardGrid from "@/components/cards/RecommendCardGrid";
import Button from "@/components/layout/Button";
import { useEffect, useMemo, useState } from "react";
import type { RecommendationCardItem } from "@/app/types/book";

type DynamicDataDisplayProps = {
  endpoint: string;
  type: "book-recommendations" | "recommendations";
  onSelectItems?: (items: unknown[]) => void;
  selectedItems: unknown[];
  onClearSelection?: () => void;
  setRecommendedItems?: (items: unknown[]) => void;
};

const DynamicDataDisplay = ({
  endpoint,
  type,
  onSelectItems,
  selectedItems,
  onClearSelection,
  setRecommendedItems,
}: DynamicDataDisplayProps) => {
  const [data, setData] = useState<unknown[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setError(null);
    const res = await fetch(endpoint);
    const result = await res.json();

    if (!res.ok) {
      setError(result?.detail ?? result?.error ?? "Request failed");
      setData([]);
      setRecommendedItems?.([]);
      return;
    }

    const items = result?.recommendations ?? result?.items ?? result;
    const list = Array.isArray(items) ? items : [];
    setData(list);
    setRecommendedItems?.(list);
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

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
      const workId = item.work_id as string | undefined;
      if (workId != null) {
        return {
          id: workId,
          name: (item.title as string) ?? "",
          subtext: (item.author_name as string) ?? "",
          image: (item.cover_url as string) ?? (item.cover_i != null && Number(item.cover_i) >= 0
            ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
            : undefined),
          feature_difference: item.feature_difference as Record<string, number> | undefined,
          similarity_score: item.similarity_score as number | undefined,
        };
      }
      // Fallback for unexpected API shape (book-only app; legacy id/name/subtext preserved for compatibility)
      return {
        id: (item.id as string) ?? "",
        name: (item.name as string) ?? (item.title as string) ?? "",
        subtext: (item.subtext as string) ?? (item.author_name as string) ?? "",
        image: (item.image as string) ?? (item.cover_url as string) ?? (item.image_url as string),
        feature_difference: item.feature_difference as Record<string, number> | undefined,
        similarity_score: item.similarity_score as number | undefined,
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
