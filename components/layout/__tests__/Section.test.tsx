import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Section from "../Section";

describe("Section", () => {
  const props = {
    title: "Test Section",
    toggle: true,
    setToggle: jest.fn(),
    children: <p>Test Children</p>,
  };

  it("renders title and children when toggle is true", () => {
    render(<Section {...props} />);

    expect(
      screen.getByRole("heading", { name: /test section/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Test Children")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /hide/i })).toBeInTheDocument();
  });

  it("calls setToggle when button is clicked", () => {
    render(<Section {...props} />);

    fireEvent.click(screen.getByRole("button", { name: /hide/i }));

    expect(props.setToggle).toHaveBeenCalledWith(false);
  });

  it("shows Show button when toggle is false", () => {
    render(<Section {...props} toggle={false} />);

    expect(screen.getByRole("button", { name: /show/i })).toBeInTheDocument();
    expect(screen.queryByText("Test Children")).not.toBeInTheDocument();
  });
});
