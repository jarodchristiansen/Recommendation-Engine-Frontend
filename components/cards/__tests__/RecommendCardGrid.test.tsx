import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RecommendCardGrid from "../RecommendCardGrid";

import { mockTracks } from "../../../__mocks__/tracks";

describe("RecommendCardGrid", () => {
  const handleItemClick = jest.fn(); // Mock function for handling clicks
  const selectedSongs = [mockTracks[0]]; // Pre-select the first song

  it("matches the snapshot of the RecommendCardGrid", () => {
    const { container } = render(
      <RecommendCardGrid
        items={mockTracks}
        handleItemClick={handleItemClick}
        selectedSongs={[]}
        type="track"
      />
    );

    // Create a snapshot of the rendered RecommendCardGrid
    expect(container).toMatchSnapshot();
  });

  it("applies selected class when a song is selected", () => {
    render(
      <RecommendCardGrid
        items={mockTracks}
        handleItemClick={handleItemClick}
        selectedSongs={selectedSongs}
        type="track"
      />
    );

    // Check if the selected item has the correct class applied
    const selectedCard = screen.getByText("Song One").closest("div");
    expect(selectedCard).toHaveClass("border-blue-500 scale-105");
  });

  it("calls handleItemClick when an item is clicked", () => {
    render(
      <RecommendCardGrid
        items={mockTracks}
        handleItemClick={handleItemClick}
        selectedSongs={[]}
        type="track"
      />
    );

    // Simulate clicking on the second song
    const songTwo = screen.getByText("Song Two").closest("div");
    fireEvent.click(songTwo!);

    // Check if the click handler was called with the right item
    expect(handleItemClick).toHaveBeenCalledWith(mockTracks[1]);
  });

  it("renders correctly with no items", () => {
    render(
      <RecommendCardGrid
        items={[]}
        handleItemClick={handleItemClick}
        selectedSongs={[]}
        type="track"
      />
    );

    // Ensure no items are rendered
    expect(screen.queryByText("Song One")).not.toBeInTheDocument();
    expect(screen.queryByText("Song Two")).not.toBeInTheDocument();
    expect(screen.queryByText("Song Three")).not.toBeInTheDocument();
  });
});
