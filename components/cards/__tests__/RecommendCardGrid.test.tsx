import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RecommendCardGrid from "../RecommendCardGrid";
import { recommendationCardItems } from "@/test/fixtures/books";

describe("RecommendCardGrid", () => {
  const handleItemClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls handleItemClick when an item is clicked", () => {
    render(
      <RecommendCardGrid
        items={recommendationCardItems}
        handleItemClick={handleItemClick}
        selectedItems={[]}
        type="book-recommendations"
      />,
    );

    const card = screen.getByText("Book Two").closest("button");
    fireEvent.click(card!);

    expect(handleItemClick).toHaveBeenCalledWith(recommendationCardItems[1]);
  });

  it("renders correctly with no items", () => {
    render(
      <RecommendCardGrid
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

  it("when selectedItems includes an item, that item is still rendered and clickable", () => {
    render(
      <RecommendCardGrid
        items={recommendationCardItems}
        handleItemClick={handleItemClick}
        selectedItems={[recommendationCardItems[0]]}
        type="book-recommendations"
      />,
    );

    expect(screen.getByText("Book One")).toBeInTheDocument();
    const bookOneCard = screen.getByText("Book One").closest("button");
    fireEvent.click(bookOneCard!);
    expect(handleItemClick).toHaveBeenCalled();
  });
});
