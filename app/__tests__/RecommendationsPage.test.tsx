import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import RecommendationsPage from "../recommendations/page";

// Mock search params so we can control work_id per test
const mockSearchParams = {
  get: jest.fn(() => null),
};

jest.mock("next/navigation", () => ({
  // Preserve other exports if needed
  __esModule: true,
  ...jest.requireActual("next/navigation"),
  useSearchParams: () => mockSearchParams,
}));

// Mock recent seeds helpers
const mockFindSeedByWorkId = jest.fn();
jest.mock("../lib/recentSeeds", () => ({
  addRecentSeed: jest.fn(),
  findSeedByWorkId: (...args: unknown[]) => mockFindSeedByWorkId(...args),
}));

const renderPage = () =>
  render(
    <SessionProvider>
      <RecommendationsPage />
    </SessionProvider>,
  );

describe("RecommendationsPage", () => {
  beforeEach(() => {
    mockSearchParams.get.mockReturnValue(null);
    mockFindSeedByWorkId.mockReset();
  });

  it("renders initial state with no selected book", () => {
    renderPage();

    expect(
      screen.getByRole("heading", { name: /discover your next read/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("No book selected."),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("See similar books"),
    ).not.toBeInTheDocument();
  });

  it("preselects a book and shows recommendations when work_id is in the URL", async () => {
    mockSearchParams.get.mockImplementation((key: string) =>
      key === "work_id" ? "/works/OL_SEED_W" : null,
    );
    mockFindSeedByWorkId.mockReturnValue({
      work_id: "OL_SEED_W",
      title: "Seed Book",
      author_name: "Seed Author",
    });

    renderPage();

    await waitFor(() => {
      expect(screen.getByText(/Seed Book/)).toBeInTheDocument();
    });

    expect(
      screen.getByRole("button", { name: /see similar books/i }),
    ).toBeInTheDocument();
  });
});
