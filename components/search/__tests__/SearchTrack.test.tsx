// app/__tests__/SearchTrack.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchTrack from "../SearchTrack";
import "@testing-library/jest-dom";

// Mock fetch globally
global.fetch = jest.fn();

describe("SearchTrack Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders SearchTrack component with initial elements", () => {
    render(<SearchTrack selectedSongs={[]} />);
    expect(
      screen.getByPlaceholderText("Enter track name...")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Search/i })).toBeInTheDocument();
    expect(
      screen.getByText("No tracks found. Please try another search.")
    ).toBeInTheDocument();
  });

  it("updates query state on input change", () => {
    render(<SearchTrack />);
    const input = screen.getByPlaceholderText("Enter track name...");

    fireEvent.change(input, { target: { value: "test track" } });
    expect(input).toHaveValue("test track");
  });

  it("calls fetch with correct query on Search button click", async () => {
    // Mock fetch response
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        tracks: {
          items: [
            {
              id: "1",
              name: "Test Track",
              album: { images: [{ url: "test-url" }] },
              artists: [{ name: "Test Artist" }],
            },
          ],
        },
      }),
    });

    render(<SearchTrack />);
    const input = screen.getByPlaceholderText("Enter track name...");
    fireEvent.change(input, { target: { value: "test track" } });
    fireEvent.click(screen.getByRole("button", { name: /Search/i }));

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith("/api/search?q=test track")
    );
    await waitFor(() =>
      expect(screen.getByText("Test Track")).toBeInTheDocument()
    );
    expect(screen.getByText("Test Artist")).toBeInTheDocument();
  });

  it("calls onSelectSong with correct track when a track is clicked", async () => {
    const mockOnSelectSong = jest.fn();
    const selectedSongs = [{ id: "1", name: "Test Track" }];

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        tracks: {
          items: [
            {
              id: "2",
              name: "New Track",
              album: { images: [{ url: "test-url" }] },
              artists: [{ name: "New Artist" }],
            },
          ],
        },
      }),
    });

    render(
      <SearchTrack
        selectedSongs={selectedSongs}
        onSelectSong={mockOnSelectSong}
      />
    );

    // Trigger search
    const input = screen.getByPlaceholderText("Enter track name...");
    fireEvent.change(input, { target: { value: "new track" } });
    fireEvent.click(screen.getByRole("button", { name: /Search/i }));

    await waitFor(() =>
      expect(screen.getByText("New Track")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText("New Track"));

    await waitFor(() =>
      expect(mockOnSelectSong).toHaveBeenCalledWith([
        ...selectedSongs,
        {
          id: "2",
          name: "New Track",
          album: { images: [{ url: "test-url" }] },
          artists: [{ name: "New Artist" }],
        },
      ])
    );
  });

  it("calls onClearSelection when Clear Selection button is clicked", () => {
    const mockOnClearSelection = jest.fn();
    render(
      <SearchTrack
        selectedSongs={[{ id: "1", name: "Test Track" }]}
        onClearSelection={mockOnClearSelection}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Clear Selection/i }));
    expect(mockOnClearSelection).toHaveBeenCalledTimes(1);
  });
});
