// __mocks__/nextAuthMock.js

import { jest } from "@jest/globals";

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  useSession: jest.fn(() => ({
    data: { user: { name: "Test User" } },
    status: "authenticated",
  })),
  SessionProvider: ({ children }) => children,
}));
