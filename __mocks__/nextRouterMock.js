// __mocks__/nextRouterMock.js

import { jest } from "@jest/globals";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({})),
  usePathname: jest.fn(),
}));
