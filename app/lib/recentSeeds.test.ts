import {
  getRecentSeeds,
  addRecentSeed,
  findSeedByWorkId,
  type RecentSeed,
} from "./recentSeeds";

const STORAGE_KEY = "book-rec-recent-seeds";

describe("recentSeeds", () => {
  let storage: Record<string, string>;

  beforeEach(() => {
    storage = {};
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn((key: string) => storage[key] ?? null),
        setItem: jest.fn((key: string, value: string) => {
          storage[key] = value;
        }),
      },
      writable: true,
    });
  });

  it("getRecentSeeds returns empty array when localStorage is empty", () => {
    expect(getRecentSeeds()).toEqual([]);
  });

  it("getRecentSeeds returns parsed array from localStorage", () => {
    const seeds: RecentSeed[] = [
      { work_id: "OL1W", title: "Book One", author_name: "Author One" },
    ];
    storage[STORAGE_KEY] = JSON.stringify(seeds);
    expect(getRecentSeeds()).toEqual(seeds);
  });

  it("getRecentSeeds returns at most MAX_RECENT (5) items", () => {
    const seeds = Array.from({ length: 7 }, (_, i) => ({
      work_id: `OL${i}W`,
      title: `Book ${i}`,
      author_name: `Author ${i}`,
    }));
    storage[STORAGE_KEY] = JSON.stringify(seeds);
    expect(getRecentSeeds()).toHaveLength(5);
    expect(getRecentSeeds()[0].work_id).toBe("OL0W");
  });

  it("addRecentSeed adds seed and persists to localStorage", () => {
    addRecentSeed({
      work_id: "OL1W",
      title: "Dune",
      author_name: "Frank Herbert",
    });
    expect(getRecentSeeds()).toHaveLength(1);
    expect(getRecentSeeds()[0].title).toBe("Dune");
  });

  it("addRecentSeed moves existing seed to front", () => {
    addRecentSeed({
      work_id: "OL1W",
      title: "First",
      author_name: "A",
    });
    addRecentSeed({
      work_id: "OL2W",
      title: "Second",
      author_name: "B",
    });
    addRecentSeed({
      work_id: "OL1W",
      title: "First Updated",
      author_name: "A",
    });
    const seeds = getRecentSeeds();
    expect(seeds).toHaveLength(2);
    expect(seeds[0].work_id).toBe("OL1W");
    expect(seeds[0].title).toBe("First Updated");
  });

  it("findSeedByWorkId returns seed when present", () => {
    addRecentSeed({
      work_id: "OL1W",
      title: "Dune",
      author_name: "Frank Herbert",
    });
    const found = findSeedByWorkId("OL1W");
    expect(found).toBeDefined();
    expect(found?.title).toBe("Dune");
  });

  it("findSeedByWorkId returns undefined when not present", () => {
    addRecentSeed({
      work_id: "OL1W",
      title: "Dune",
      author_name: "Frank Herbert",
    });
    expect(findSeedByWorkId("OL999W")).toBeUndefined();
  });
});
