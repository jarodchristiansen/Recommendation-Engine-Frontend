import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import CardGrid from "../CardGrid";
// import "@testing-library/jest-dom/extend-expect"; // for extended matchers

const mockItems = [
  {
    id: "1",
    name: "Song One",
    subtext: "Artist One",
    image: "/image1.jpg",
    track_id: "1",
    artist_name: "Artist One",
    track_name: "Song One",
    feature_difference: {
      popularity: 1,
      danceability: 1,
      energy: 1,
      valence: 1,
      loudness: 1,
      key: 1,
      speechiness: 1,
    },
    danceability: 1,
    energy: 1,
    key: 1,
    loudness: 1,
    speechiness: 1,
    valence: 1,
    popularity: 1,
    similarity_score: 1,
  },
  {
    id: "2",
    name: "Song Two",
    subtext: "Artist Two",
    image: "/image2.jpg",
    track_id: "2",
    artist_name: "Artist Two",
    track_name: "Song Two",
    feature_difference: {
      popularity: 2,
      danceability: 2,
      energy: 2,
      valence: 2,
      loudness: 2,
      key: 2,
      speechiness: 2,
    },
    danceability: 2,
    energy: 2,
    key: 2,
    loudness: 2,
    speechiness: 2,
    valence: 2,
    popularity: 2,
    similarity_score: 2,
  },
  {
    id: "3",
    name: "Song Three",
    subtext: "Artist Three",
    image: "/image3.jpg",
    track_id: "3",
    artist_name: "Artist Three",
    track_name: "Song Three",
    feature_difference: {
      popularity: 3,
      danceability: 3,
      energy: 3,
      valence: 3,
      loudness: 3,
      key: 3,
      speechiness: 3,
    },
    danceability: 3,
    energy: 3,
    key: 3,
    loudness: 3,
    speechiness: 3,
    valence: 3,
    popularity: 3,
    similarity_score: 3,
  },
];

describe("CardGrid", () => {
  const handleItemClick = jest.fn(); // Mock function for handling clicks
  const selectedSongs = [mockItems[0]]; // Pre-select the first song

  it("renders the items correctly", () => {
    render(
      <CardGrid
        items={mockItems}
        handleItemClick={handleItemClick}
        selectedSongs={[]}
        type="track"
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
        items={mockItems}
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
      <CardGrid
        items={mockItems}
        handleItemClick={handleItemClick}
        selectedSongs={[]}
        type="track"
      />
    );

    // Simulate clicking on the second song
    const songTwo = screen.getByText("Song Two").closest("div");
    fireEvent.click(songTwo!);

    // Check if the click handler was called with the right item
    expect(handleItemClick).toHaveBeenCalledWith(mockItems[1]);
  });

  it("renders correctly with no items", () => {
    render(
      <CardGrid
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
