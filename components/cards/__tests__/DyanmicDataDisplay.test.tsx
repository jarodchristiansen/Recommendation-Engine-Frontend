import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DynamicDataDisplay from "@/components/cards/DynamicDataDisplay";
import { act } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";

// Mock fetch call
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        items: [
          {
            id: "1",
            name: "Song One",
            artist_name: "Artist One",
            image_url: "/image1.jpg",
            album: {
              images: [{ url: "/image1.jpg" }],
            },
          },
          {
            id: "2",
            name: "Song Two",
            artist_name: "Artist Two",
            image_url: "/image2.jpg",
            album: {
              images: [{ url: "/image1.jpg" }],
            },
          },
        ],
      }),
  })
) as jest.Mock;

describe("DynamicDataDisplay Component", () => {
  const defaultProps = {
    endpoint: "/api/recommendations",
    type: "track",
    selectedSongs: [],
    onSelectSong: jest.fn(),
    onClearSelection: jest.fn(),
  };

  beforeAll(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  it("displays loading animation while fetching data", () => {
    render(<DynamicDataDisplay {...defaultProps} />);
    expect(
      screen.getByText("Hold tight, we're crunching some numbers")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "This may take up to 60 seconds, but it’ll be worth the wait!"
      )
    ).toBeInTheDocument();
  });

  it("fetches and renders CardGrid when data is loaded and type is 'track'", async () => {
    render(<DynamicDataDisplay {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText("Song One")).toBeInTheDocument();
    });

    expect(screen.getByText("Song Two")).toBeInTheDocument();
  });

  it("renders RecommendCardGrid when type is 'recommendations'", async () => {
    const props = { ...defaultProps, type: "recommendations" };
    render(<DynamicDataDisplay {...props} />);

    await waitFor(() => {
      expect(screen.getByText("Artist One")).toBeInTheDocument();
    });
  });

  it("handles error state", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ error: "Failed to fetch data" }),
      })
    );

    render(<DynamicDataDisplay {...defaultProps} />);

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
      expect(screen.getByText("Song One")).toBeInTheDocument();
    });

    // Simulate clicking on a song
    const songOne = screen.getByText("Song One").closest("div");
    fireEvent.click(songOne!);

    expect(mockOnSelectSong).toHaveBeenCalled();
  });

  it("displays 'Clear Selection' button when there are selected songs", async () => {
    const selectedSongs = [
      {
        id: "1",
        name: "Song One",
        artist_name: "Artist One",
        image_url: "/image1.jpg",
      },
    ];
    render(
      <DynamicDataDisplay {...defaultProps} selectedSongs={selectedSongs} />
    );

    expect(screen.getByText("Clear Selection")).toBeInTheDocument();

    // Simulate clearing selection
    const clearButton = screen.getByText("Clear Selection");
    fireEvent.click(clearButton);

    expect(defaultProps.onClearSelection).toHaveBeenCalled();
  });

  it("renders correctly when no data is returned", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ items: [] }),
      })
    );

    render(<DynamicDataDisplay {...defaultProps} />);

    await waitFor(() => {
      expect(screen.queryByText("Song One")).not.toBeInTheDocument();
      expect(screen.queryByText("Song Two")).not.toBeInTheDocument();
    });
  });
});
