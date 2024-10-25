// app/__tests__/Home-page.test.tsx
import { render } from "@testing-library/react";
import Auth from "../auth/page"; // Import the Home component
import "@testing-library/jest-dom"; // For additional matchers
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

// Mock Next.js's router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

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

describe("Auth Page", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementationOnce(() => ({
      route: "/",
    }));
  });

  it("matches the snapshot of the AuthPage", () => {
    const { container } = render(
      <SessionProvider>
        <Auth />
      </SessionProvider>
    );

    // Create a snapshot of the rendered HomePage
    expect(container).toMatchSnapshot();
  });
});
