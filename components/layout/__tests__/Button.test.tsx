import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Button Component", () => {
  it("renders with default props", () => {
    render(<Button>Click Me</Button>);

    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).not.toBeDisabled();
  });

  it("renders with variant and label", () => {
    render(<Button variant="primary">Primary</Button>);

    const buttonElement = screen.getByRole("button", { name: /primary/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("handles the onClick event", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const buttonElement = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled={true}>Disabled</Button>);

    const buttonElement = screen.getByRole("button", { name: /disabled/i });
    expect(buttonElement).toBeDisabled();
  });

  it("renders with size large", () => {
    render(<Button size="large">Large Button</Button>);

    expect(
      screen.getByRole("button", { name: /large button/i }),
    ).toBeInTheDocument();
  });

  it("renders secondary variant", () => {
    render(<Button variant="secondary">Secondary</Button>);

    expect(
      screen.getByRole("button", { name: /secondary/i }),
    ).toBeInTheDocument();
  });
});
