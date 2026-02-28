import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../page";

describe("Home", () => {
  it("shows hero heading and primary CTA", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /discover your next read/i }),
    ).toBeInTheDocument();
    const ctaButtons = screen.getAllByRole("button", {
      name: /get book recommendations/i,
    });
    expect(ctaButtons.length).toBeGreaterThanOrEqual(1);
    expect(ctaButtons[0]).toBeInTheDocument();
  });

  it("shows key features section", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /why book rec/i }),
    ).toBeInTheDocument();
  });

  it("shows ready to discover CTA", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /ready to discover books/i }),
    ).toBeInTheDocument();
  });
});
