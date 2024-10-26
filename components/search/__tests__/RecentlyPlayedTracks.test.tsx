// // components/search/__tests__/RecentlyPlayedTracks.test.tsx
// import { render, screen, waitFor, fireEvent } from "@testing-library/react";
// import RecentlyPlayedTracks from "../RecentlyPlayedTracks";
// import "@testing-library/jest-dom";
// import React from "react";

// // Mock global fetch function to simulate API response structure
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     ok: true,
//     status: 200,
//     json: () =>
//       Promise.resolve({
//         items: [
//           {
//             played_at: "2023-10-01T10:00:00.000Z",
//             track: {
//               id: "1",
//               name: "Test Track",
//               album: { images: [{ url: "/test-url" }] },
//               artists: [{ name: "Test Artist" }],
//             },
//           },
//         ],
//       }),
//   } as Response)
// );

// describe("RecentlyPlayedTracks Component", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("renders loading message initially", () => {
//     render(<RecentlyPlayedTracks />);
//     expect(
//       screen.getByText("Loading your recently played tracks...")
//     ).toBeInTheDocument();
//   });

//   it("fetches and displays recently played tracks", async () => {
//     render(<RecentlyPlayedTracks />);

//     // Check if fetch is called with the correct endpoint
//     await waitFor(() =>
//       expect(fetch).toHaveBeenCalledWith("/api/recently-played")
//     );

//     // Confirm that track name and artist name are displayed in the document
//     await waitFor(() => {
//       expect(screen.getByText("Test Track")).toBeInTheDocument();
//       expect(screen.getByText("Test Artist")).toBeInTheDocument();
//     });
//   });

//   it("highlights a track when clicked", async () => {
//     render(<RecentlyPlayedTracks />);

//     // Wait for track name to appear after fetching data
//     await waitFor(() =>
//       expect(screen.getByText("Test Track")).toBeInTheDocument()
//     );

//     // Simulate clicking the track to highlight it
//     const trackElement = screen.getByText("Test Track");
//     fireEvent.click(trackElement);

//     // Verify the selected track is highlighted with the appropriate class
//     expect(trackElement.parentElement).toHaveClass("border-blue-500 scale-105");
//   });
// });

// components/search/__tests__/RecentlyPlayedTracks.test.tsx
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import RecentlyPlayedTracks from "../RecentlyPlayedTracks";
import "@testing-library/jest-dom";
import React from "react";

// Mock global fetch function to simulate API response structure
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () =>
      Promise.resolve({
        items: [
          {
            played_at: "2023-10-01T10:00:00.000Z",
            track: {
              id: "1",
              name: "Test Track",
              album: { images: [{ url: "/test-url" }] },
              artists: [{ name: "Test Artist" }],
            },
          },
        ],
      }),
  } as Response)
);

describe("RecentlyPlayedTracks Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("fetches and displays recently played tracks", async () => {
    await act(async () => {
      render(<RecentlyPlayedTracks />);
    });

    // Check if fetch is called with the correct endpoint
    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith("/api/recently-played")
    );

    // Confirm that track name and artist name are displayed in the document
    await waitFor(() => {
      expect(screen.getByText("Test Track")).toBeInTheDocument();
      expect(screen.getByText("Test Artist")).toBeInTheDocument();
    });
  });

  it("highlights a track when clicked", async () => {
    await act(async () => {
      render(<RecentlyPlayedTracks />);
    });

    // Wait for track name to appear after fetching data
    await waitFor(() =>
      expect(screen.getByText("Test Track")).toBeInTheDocument()
    );

    // Simulate clicking the track to highlight it
    const trackElement = screen.getByText("Test Track");
    fireEvent.click(trackElement);

    // Verify the selected track is highlighted with the appropriate class
    expect(trackElement.parentElement).toHaveClass("border-blue-500 scale-105");
  });
});
