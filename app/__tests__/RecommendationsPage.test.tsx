import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/react";
import RecommendationsPage from "../recommendations/page";
import { renderWithProviders } from "@/test/utils/render";
import { install as installFetchOverlay } from "@/test/mocks/fetchOverlay";

// Mock search params so we can control work_id per test
const mockSearchParams = {
  get: jest.fn(() => null),
};

jest.mock("next/navigation", () => ({
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

const renderPage = () => renderWithProviders(<RecommendationsPage />);

describe("RecommendationsPage", () => {
  beforeEach(() => {
    mockSearchParams.get.mockReturnValue(null);
    mockFindSeedByWorkId.mockReset();
    installFetchOverlay();
  });

  it("renders initial state with no selected book", () => {
    renderPage();

    expect(
      screen.getByRole("heading", { name: /discover your next read/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/pick a book above to get started/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /see similar books/i }),
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
