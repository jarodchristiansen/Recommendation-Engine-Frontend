// app/__tests__/Home-page.test.tsx
import { render } from "@testing-library/react";
import Home from "../page"; // Import the Home component
import "@testing-library/jest-dom"; // For additional matchers

// converts above vitest mock to jest mock
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    // get: jest.fn(),
  })),
  usePathname: jest.fn(),
}));

describe("Home", () => {
  it("matches the snapshot of the HomePage", () => {
    const { container } = render(<Home />);

    // Create a snapshot of the rendered HomePage
    expect(container).toMatchSnapshot();
  });
});
