import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/layout/Footer"; // Adjust path as necessary

describe("Footer Component", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  // snapshhot test
  it("matches the snapshot of the Footer", () => {
    const { container } = render(<Footer />);

    // Create a snapshot of the rendered Footer
    expect(container).toMatchSnapshot();
  });

  it("displays the current year", () => {
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} All rights reserved.`)
    ).toBeInTheDocument();
  });
});
