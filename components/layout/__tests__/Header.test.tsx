import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@/components/layout/Header";

describe("Header Component", () => {
  it("renders logo with home link", () => {
    render(<Header />);

    const homeLink = screen.getByRole("link", { name: /book rec home/i });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders nav links with correct hrefs", () => {
    render(<Header />);

    const dashboardLinks = screen.getAllByRole("link", { name: /dashboard/i });
    expect(dashboardLinks[0]).toHaveAttribute("href", "/dashboard");
    const recLinks = screen.getAllByRole("link", { name: /recommendations/i });
    expect(recLinks[0]).toHaveAttribute("href", "/recommendations");
    const signInLinks = screen.getAllByRole("link", { name: /sign in\/up/i });
    expect(signInLinks[0]).toHaveAttribute("href", "/auth");
  });

  it("toggles mobile menu on hamburger click", () => {
    render(<Header />);

    const menuButton = screen.getByRole("button", {
      name: /open menu/i,
    });
    expect(menuButton).toBeInTheDocument();

    fireEvent.click(menuButton);

    expect(
      screen.getByRole("button", { name: /close menu/i }),
    ).toBeInTheDocument();
  });
});
