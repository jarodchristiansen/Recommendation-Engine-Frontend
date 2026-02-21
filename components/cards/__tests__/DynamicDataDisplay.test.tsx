import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import DynamicDataDisplay from "@/components/cards/DynamicDataDisplay";

const mockBookRecommendations = {
  recommendations: [
    { work_id: "1", title: "Book One", author_name: "Author One", cover_url: "/cover1.jpg", feature_difference: { author_count: 0, subject_count: 1 } },
    { work_id: "2", title: "Book Two", author_name: "Author Two", cover_url: "/cover2.jpg", feature_difference: { author_count: 0, subject_count: 2 } },
  ],
};

describe("DynamicDataDisplay Component", () => {
  const defaultProps = {
    endpoint: "/api/recommendations?work_id=OL1W",
    type: "book-recommendations" as const,
    selectedItems: [],
    onSelectItems: jest.fn(),
    onClearSelection: jest.fn(),
  };

  beforeEach(() => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockBookRecommendations),
    });
  });

  it("matches the snapshot of the DynamicDataDisplay", async () => {
    const { container } = await act(async () =>
      render(<DynamicDataDisplay {...defaultProps} />)
    );
    expect(container).toMatchSnapshot();
  });

  it("fetches and renders RecommendCardGrid when type is book-recommendations", async () => {
    await act(async () => {
      render(<DynamicDataDisplay {...defaultProps} />);
    });

    await waitFor(() => {
      expect(screen.getByText("Book One")).toBeInTheDocument();
    });
    expect(screen.getByText("Book Two")).toBeInTheDocument();
  });

  it("renders RecommendCardGrid when type is recommendations", async () => {
    const props = { ...defaultProps, type: "recommendations" as const };

    await act(async () => {
      render(<DynamicDataDisplay {...props} />);
    });

    await waitFor(() => {
      expect(screen.getByText("Author One")).toBeInTheDocument();
    });
  });

  it("handles error state", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: "Failed to fetch data" }),
      })
    );

    await act(async () => {
      render(<DynamicDataDisplay {...defaultProps} />);
    });

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch data")).toBeInTheDocument();
    });
  });

  it("handles item click and selection", async () => {
    const mockOnSelectSong = jest.fn();

    await act(async () => {
      render(
        <DynamicDataDisplay
          {...defaultProps}
          onSelectSong={mockOnSelectSong}
          selectedSongs={[]}
        />
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Book One")).toBeInTheDocument();
    });

    const bookOne = screen.getByText("Book One").closest("div");
    fireEvent.click(bookOne!);

    expect(mockOnSelectItems).toHaveBeenCalled();
  });

  it("displays Clear Selection button when there are selected items", async () => {
    const selectedItems = [{ work_id: "1", title: "Book One", author_name: "Author One" }];

    await act(async () => {
      render(
        <DynamicDataDisplay {...defaultProps} selectedItems={selectedItems} onClearSelection={defaultProps.onClearSelection} />
      );
    });

    expect(screen.getByText("Clear Selection")).toBeInTheDocument();

    const clearButton = screen.getByText("Clear Selection");
    fireEvent.click(clearButton);

    expect(defaultProps.onClearSelection).toHaveBeenCalled();
  });
});
