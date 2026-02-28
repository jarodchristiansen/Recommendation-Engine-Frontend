import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBook from "./SearchBook";
import { install as installFetchOverlay } from "@/test/mocks/fetchOverlay";

describe("SearchBook", () => {
  const baseProps = {
    onSelectBook: jest.fn(),
    onClearSelection: jest.fn(),
    selectedBooks: [] as any[],
    maxSelection: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    installFetchOverlay();
  });

  it("does not show API results when query is empty and search is clicked", async () => {
    (global.fetch as jest.Mock).mockImplementation((url: string | Request) => {
      const u = typeof url === "string" ? url : (url as Request).url;
      if (u && u.includes("/api/search")) {
        try {
          const urlObj = new URL(u, "http://localhost");
          const q = urlObj.searchParams.get("q");
          if (q == null || String(q).trim() === "") {
            return Promise.resolve({
              ok: false,
              json: () => Promise.resolve({ error: "Query is required" }),
            });
          }
        } catch {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ num_found: 0, start: 0, docs: [] }),
          });
        }
      }
      const { defaultFetch } = require("@/test/mocks/fetchOverlay");
      return defaultFetch(url);
    });

    render(<SearchBook {...baseProps} />);

    const searchInput = screen.getByPlaceholderText(/title or author/i);
    fireEvent.change(searchInput, { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(
      await screen.findByText(/no books found\. try another search\./i, {}, { timeout: 3000 }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Book One")).not.toBeInTheDocument();
  });

  it("performs search and renders results", async () => {
    render(<SearchBook {...baseProps} />);

    fireEvent.change(screen.getByPlaceholderText(/title or author/i), {
      target: { value: "Tom Sawyer" },
    });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText("Book One")).toBeInTheDocument();
    });
    expect(screen.getByText("Book Two")).toBeInTheDocument();
  });

  it("shows an error message when API returns an error", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: "Search failed on server" }),
    });

    render(<SearchBook {...baseProps} />);

    fireEvent.change(screen.getByPlaceholderText(/title or author/i), {
      target: { value: "Bad Query" },
    });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Search failed on server"),
      ).toBeInTheDocument();
    });
  });

  it("renders empty state when no results and not loading", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ num_found: 0, start: 0, docs: [] }),
    });

    render(<SearchBook {...baseProps} />);

    fireEvent.change(screen.getByPlaceholderText(/title or author/i), {
      target: { value: "nonexistent" },
    });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/no books found\. try another search\./i),
      ).toBeInTheDocument();
    });
  });

  it("calls onSelectBook when a result is clicked and respects maxSelection", async () => {
    const onSelectBook = jest.fn();

    render(
      <SearchBook
        {...baseProps}
        onSelectBook={onSelectBook}
        selectedBooks={[]}
        maxSelection={1}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText(/title or author/i), {
      target: { value: "Book One" },
    });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText("Book One")).toBeInTheDocument();
    });

    const card =
      screen.getByText("Book One").closest("[role='button']") ??
      screen.getByText("Book One").closest("div");
    fireEvent.click(card!);

    expect(onSelectBook).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining({ work_id: "OL1W" })]),
    );
  });

  it("shows and triggers Clear selection button when there are selectedBooks", () => {
    const onClearSelection = jest.fn();

    render(
      <SearchBook
        {...baseProps}
        onClearSelection={onClearSelection}
        selectedBooks={[
          {
            key: "/works/OL1W",
            work_id: "OL1W",
            title: "Book One",
            author_name: "Author One",
          } as any,
        ]}
      />,
    );

    const clearButton = screen.getByRole("button", {
      name: /change book/i,
    });
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(onClearSelection).toHaveBeenCalled();
  });

  it("toggles additional results when Show More is clicked", async () => {
    const docs = Array.from({ length: 8 }).map((_, i) => ({
      key: `/works/OL${i + 1}W`,
      work_id: `OL${i + 1}W`,
      title: `Book ${i + 1}`,
      author_name: `Author ${i + 1}`,
    }));

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ num_found: 8, start: 0, docs }),
    });

    render(<SearchBook {...baseProps} />);

    fireEvent.change(screen.getByPlaceholderText(/title or author/i), {
      target: { value: "Book" },
    });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText("Book 1")).toBeInTheDocument();
    });

    const showMoreButton = screen.getByRole("button", {
      name: /show \d+ more result/i,
    });
    fireEvent.click(showMoreButton);

    await waitFor(() => {
      expect(screen.getByText("Book 7")).toBeInTheDocument();
    });
    expect(screen.getByText("Book 8")).toBeInTheDocument();
  });
});
