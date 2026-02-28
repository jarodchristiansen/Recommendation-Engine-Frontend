import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import CardGrid from "../CardGrid";

import { mockTracks } from "../../../__mocks__/tracks";

describe("CardGrid", () => {
  const handleItemClick = jest.fn(); // Mock function for handling clicks
  const selectedItems = [mockTracks[0]]; // Pre-select the first song

  it("renders the items correctly", () => {
    render(
      <CardGrid
        items={mockTracks}
        handleItemClick={handleItemClick}
        selectedItems={[]}
        type="book-recommendations"
      />
    );

    // Check if the items are rendered
    expect(screen.getByText("Song One")).toBeInTheDocument();
    expect(screen.getByText("Song Two")).toBeInTheDocument();
    expect(screen.getByText("Song Three")).toBeInTheDocument();
  });

  it("applies selected class when a song is selected", () => {
    render(
      <CardGrid
        items={mockTracks}
        handleItemClick={handleItemClick}
        selectedItems={selectedItems}
        type="book-recommendations"
      />
    );

    // Check if the selected item has the correct class applied
    const selectedCard = screen.getByText("Song One").closest("div");
    expect(selectedCard).toHaveClass("border-blue-500 scale-105");
  });

  it("calls handleItemClick when an item is clicked", () => {
    render(
      <CardGrid
        items={mockTracks}
        handleItemClick={handleItemClick}
        selectedItems={[]}
        type="book-recommendations"
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
      <CardGrid
        items={[]}
        handleItemClick={handleItemClick}
        selectedItems={[]}
        type="book-recommendations"
      />
    );

    // Ensure no items are rendered
    expect(screen.queryByText("Song One")).not.toBeInTheDocument();
    expect(screen.queryByText("Song Two")).not.toBeInTheDocument();
    expect(screen.queryByText("Song Three")).not.toBeInTheDocument();
  });
});
