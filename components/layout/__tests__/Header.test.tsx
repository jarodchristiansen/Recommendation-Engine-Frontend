import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@/components/layout/Header";

describe("Header Component", () => {
  beforeEach(() => {
    render(<Header />);
  });

  // snapshot test
  it("matches the snapshot of the Header", () => {
    const { container } = render(<Header />);

    // Create a snapshot of the rendered Header
    expect(container).toMatchSnapshot();
  });

  it("toggles mobile menu on hamburger click", () => {
    // Get the hamburger button by role
    const hamburgerButton = screen.getByRole("button");
    expect(hamburgerButton).toBeInTheDocument();

    // Simulate clicking the hamburger icon
    fireEvent.click(hamburgerButton);

    // Verify the mobile menu opened (using first 'home' link in mobile menu)
    const mobileHomeLink = screen.getAllByText("home")[1]; // The second 'home' is in mobile menu
    expect(mobileHomeLink).toBeInTheDocument();
  });

  it("navigates correctly when links are clicked", () => {
    // Get the first 'home' link in the header, ignoring other instances
    const homeLink = screen.getAllByText("home")[0]; // Header instance
    expect(homeLink.closest("a")).toHaveAttribute("href", "/");

    // Similarly, test other links
    const dashboardLink = screen.getAllByText("dashboard")[0];
    expect(dashboardLink.closest("a")).toHaveAttribute("href", "/dashboard");

    const recommendationsLink = screen.getAllByText("recommendations")[0];
    expect(recommendationsLink.closest("a")).toHaveAttribute(
      "href",
      "/recommendations"
    );

    const signInLink = screen.getAllByText("Sign In/Up")[0];
    expect(signInLink.closest("a")).toHaveAttribute("href", "/auth");
  });
});
