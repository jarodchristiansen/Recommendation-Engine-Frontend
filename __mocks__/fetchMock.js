// __mocks__/fetchMock.js
import { jest } from "@jest/globals";

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
);
