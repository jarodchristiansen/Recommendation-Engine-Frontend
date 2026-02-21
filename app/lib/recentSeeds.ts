const STORAGE_KEY = "book-rec-recent-seeds";
const MAX_RECENT = 5;

export type RecentSeed = {
  work_id: string;
  title: string;
  author_name: string | string[];
};

export function getRecentSeeds(): RecentSeed[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.slice(0, MAX_RECENT) : [];
  } catch {
    return [];
  }
}

export function addRecentSeed(seed: RecentSeed): void {
  if (typeof window === "undefined") return;
  const list = getRecentSeeds();
  const rest = list.filter((s) => s.work_id !== seed.work_id);
  const next = [seed, ...rest].slice(0, MAX_RECENT);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export function findSeedByWorkId(workId: string): RecentSeed | undefined {
  return getRecentSeeds().find((s) => s.work_id === workId);
}
