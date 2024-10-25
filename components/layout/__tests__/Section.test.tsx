import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/layout/Footer"; // Adjust path as necessary
import Section from "../Section";

describe("Footer Component", () => {
  //   beforeEach(() => {
  //     render(<Footer />);
  //   });

  // snapshhot test

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
