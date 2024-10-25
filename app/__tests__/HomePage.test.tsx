// app/__tests__/Home-page.test.tsx
import { render, screen } from "@testing-library/react";
import Home from "../page"; // Import the Home component
import "@testing-library/jest-dom"; // For additional matchers
import { useRouter } from "next/router";
// import { Button } from "@/components/layout/Button";

// Mock Next.js's router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Home", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementationOnce(() => ({
      route: "/",
    }));
  });

  it("matches the snapshot of the HomePage", () => {
    const { container } = render(<Home />);

    // Create a snapshot of the rendered HomePage
    expect(container).toMatchSnapshot();
  });
});
