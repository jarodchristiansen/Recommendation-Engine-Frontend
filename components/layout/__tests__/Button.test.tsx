// Button.test.tsx
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

// Describe block for grouping related tests
describe("Button Component", () => {
  it("renders correctly with default props", () => {
    render(<Button>Click Me</Button>);

    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("bg-red-500");
  });

  it("renders correctly with 'primary' variant", () => {
    render(<Button variant="primary">Primary</Button>);

    const buttonElement = screen.getByRole("button", { name: /primary/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("bg-blue-600");
  });

  it("handles the 'onClick' event", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const buttonElement = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when 'disabled' prop is true", () => {
    render(<Button disabled={true}>Disabled</Button>);

    const buttonElement = screen.getByRole("button", { name: /disabled/i });
    expect(buttonElement).toBeDisabled();
  });

  it("renders with different sizes", () => {
    render(<Button size="large">Large Button</Button>);

    const buttonElement = screen.getByRole("button", { name: /large button/i });
    expect(buttonElement).toHaveClass("px-8 py-4 text-lg");
  });

  it("applies custom classes for 'secondary' variant", () => {
    render(<Button variant="secondary">Secondary</Button>);

    const buttonElement = screen.getByRole("button", { name: /secondary/i });
    expect(buttonElement).toHaveClass("bg-gray-500");
  });
});
