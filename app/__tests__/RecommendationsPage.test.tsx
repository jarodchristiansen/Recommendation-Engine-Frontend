// app/__tests__/Home-page.test.tsx
import { render } from "@testing-library/react";
import RecommendationsPage from "../recommendations/page"; // Import the Home component
import "@testing-library/jest-dom"; // For additional matchers
import { SessionProvider } from "next-auth/react";

// Mock Next.js's router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

export const useSession = jest.fn();

// Mock fetch call
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        items: [
          {
            id: "1",
            name: "Song One",
            artist_name: "Artist One",
            image_url: "/image1.jpg",
            album: {
              images: [{ url: "/image1.jpg" }],
            },
          },
          {
            id: "2",
            name: "Song Two",
            artist_name: "Artist Two",
            image_url: "/image2.jpg",
            album: {
              images: [{ url: "/image2.jpg" }],
            },
          },
        ],
      }),
  })
) as jest.Mock;

describe("RecommendationsPagee", () => {
  it("matches the snapshot of the RecommendationsPage", () => {
    const { container } = render(
      <SessionProvider>
        <RecommendationsPage />
      </SessionProvider>
    );

    // Create a snapshot of the rendered HomePage
    expect(container).toMatchSnapshot();
  });
});
