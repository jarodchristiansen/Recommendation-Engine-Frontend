import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/layout/Footer";

describe("Footer Component", () => {
  it("displays the current year and copyright", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${currentYear} Book Rec\\. All rights reserved\\.`)),
    ).toBeInTheDocument();
  });

  it("renders footer nav with expected links", () => {
    render(<Footer />);

    expect(screen.getByRole("navigation", { name: /footer/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /recommendations/i })).toHaveAttribute(
      "href",
      "/recommendations",
    );
  });

  it("shows Book Rec tagline", () => {
    render(<Footer />);

    expect(screen.getByText(/discover your next read/i)).toBeInTheDocument();
  });
});
