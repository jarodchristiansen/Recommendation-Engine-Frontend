import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Section from "../Section";

describe("Footer Component", () => {
  const props = {
    title: "Test Section",
    toggle: true,
    setToggle: jest.fn(),
    children: <p>Test Children</p>,
  };

  it("matches the snapshot of the Footer", () => {
    const { container } = render(<Section {...props} />);

    // Create a snapshot of the rendered Footer
    expect(container).toMatchSnapshot();
  });
});
