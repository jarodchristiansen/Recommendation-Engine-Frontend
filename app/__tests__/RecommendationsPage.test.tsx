// app/__tests__/Home-page.test.tsx
import { render, act } from "@testing-library/react";
import RecommendationsPage from "../recommendations/page"; // Import the Home component
import "@testing-library/jest-dom"; // For additional matchers
import { SessionProvider } from "next-auth/react";

describe("RecommendationsPagee", () => {
  it("matches the snapshot of the RecommendationsPage", async () => {
    const { container } = await act(async () =>
      render(
        <SessionProvider>
          <RecommendationsPage />
        </SessionProvider>
      )
    );

    // Create a snapshot of the rendered HomePage
    expect(container).toMatchSnapshot();
  });
});
