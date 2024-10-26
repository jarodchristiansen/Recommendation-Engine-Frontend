// app/__tests__/Home-page.test.tsx
import { render } from "@testing-library/react";
import Home from "../page"; // Import the Home component
import "@testing-library/jest-dom"; // For additional matchers

describe("Home", () => {
  it("matches the snapshot of the HomePage", () => {
    const { container } = render(<Home />);

    // Create a snapshot of the rendered HomePage
    expect(container).toMatchSnapshot();
  });
});
