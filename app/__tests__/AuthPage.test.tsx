// // app/__tests__/Home-page.test.tsx
// import { render, act } from "@testing-library/react";
// import Auth from "../auth/page"; // Import the Home component
// import "@testing-library/jest-dom"; // For additional matchers
// import { useRouter } from "next/router";
// import { SessionProvider } from "next-auth/react";

// // Mock Next.js's router
// // converts above vitest mock to jest mock
// jest.mock("next/navigation", () => ({
//   useRouter: jest.fn(() => ({
//     push: jest.fn(),
//     replace: jest.fn(),
//     prefetch: jest.fn(),
//   })),
//   useSearchParams: jest.fn(() => ({
//     // get: jest.fn(),
//   })),
//   usePathname: jest.fn(),
// }));

// // Mock fetch call
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () =>
//       Promise.resolve({
//         items: [
//           {
//             id: "1",
//             name: "Song One",
//             artist_name: "Artist One",
//             image_url: "/image1.jpg",
//             album: {
//               images: [{ url: "/image1.jpg" }],
//             },
//           },
//           {
//             id: "2",
//             name: "Song Two",
//             artist_name: "Artist Two",
//             image_url: "/image2.jpg",
//             album: {
//               images: [{ url: "/image2.jpg" }],
//             },
//           },
//         ],
//       }),
//   })
// ) as jest.Mock;

// describe("Auth Page", () => {
//   it("matches the snapshot of the AuthPage", async () => {
//     const { container } = await act(async () =>
//       render(
//         <SessionProvider>
//           <Auth />
//         </SessionProvider>
//       )
//     );

//     // Create a snapshot of the rendered HomePage
//     expect(container).toMatchSnapshot();
//   });
// });

// app/__tests__/AuthPage.test.tsx
import { render, act } from "@testing-library/react";
import Auth from "../auth/page";
import "@testing-library/jest-dom";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

// Mock Next.js's router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({})),
  usePathname: jest.fn(),
}));

// Mock global fetch function
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

// Mock the session to avoid fetching errors
jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  useSession: jest.fn(() => ({
    data: { user: { name: "Test User" } },
    status: "authenticated",
  })),
  SessionProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe("Auth Page", () => {
  it("matches the snapshot of the AuthPage", async () => {
    const { container } = await act(async () =>
      render(
        <SessionProvider>
          <Auth />
        </SessionProvider>
      )
    );

    expect(container).toMatchSnapshot();
  });
});
