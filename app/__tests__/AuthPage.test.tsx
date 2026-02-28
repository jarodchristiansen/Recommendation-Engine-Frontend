import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Auth from "../auth/page";
import { renderWithProviders } from "@/test/utils/render";

describe("Auth Page", () => {
  it("shows sign-in heading and AuthButton", () => {
    renderWithProviders(<Auth />);

    expect(
      screen.getByRole("heading", { name: /save your reading/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/sign in to save your list across devices/i),
    ).toBeInTheDocument();
  });

  it("shows link to recommendations", () => {
    renderWithProviders(<Auth />);

    const link = screen.getByRole("link", {
      name: /get book recommendations/i,
    });
    expect(link).toHaveAttribute("href", "/recommendations");
  });
});
