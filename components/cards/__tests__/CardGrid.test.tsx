import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import CardGrid from "../CardGrid";
import { recommendationCardItems } from "@/test/fixtures/books";

describe("CardGrid", () => {
  const handleItemClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the items correctly", () => {
    render(
      <CardGrid
        items={recommendationCardItems}
        handleItemClick={handleItemClick}
        selectedItems={[]}
        type="book-recommendations"
      />,
    );

    expect(screen.getByText("Book One")).toBeInTheDocument();
    expect(screen.getByText("Book Two")).toBeInTheDocument();
    expect(screen.getByText("Book Three")).toBeInTheDocument();
  });

  it("calls handleItemClick when an item is clicked", () => {
    render(
      <CardGrid
        items={recommendationCardItems}
        handleItemClick={handleItemClick}
        selectedItems={[]}
        type="book-recommendations"
      />,
    );

    const songTwo = screen.getByText("Book Two").closest("div");
    fireEvent.click(songTwo!);

    expect(handleItemClick).toHaveBeenCalledWith(recommendationCardItems[1]);
  });

  it("renders correctly with no items", () => {
    render(
      <CardGrid
        items={[]}
        handleItemClick={handleItemClick}
        selectedItems={[]}
        type="book-recommendations"
      />,
    );

    expect(screen.queryByText("Book One")).not.toBeInTheDocument();
    expect(screen.queryByText("Book Two")).not.toBeInTheDocument();
    expect(screen.queryByText("Book Three")).not.toBeInTheDocument();
  });

  it("when selectedItems includes an item, that item is still rendered", () => {
    render(
      <CardGrid
        items={recommendationCardItems}
        handleItemClick={handleItemClick}
        selectedItems={[recommendationCardItems[0]]}
        type="book-recommendations"
      />,
    );

    expect(screen.getByText("Book One")).toBeInTheDocument();
    expect(screen.getByText("Book Two")).toBeInTheDocument();
  });
});
