import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";

import Image from "@/components/Image";
import { isValidUrl } from "@/utils/validation";

jest.mock("@/utils/validation", () => ({
  isValidUrl: jest.fn(),
}));

describe("Image", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders placeholder when loading", () => {
    render(<Image />);

    expect(screen.getByTestId("placeholder-image")).toBeTruthy();
  });

  it("renders image when src is valid", () => {
    (isValidUrl as jest.Mock).mockReturnValue(true);
    render(<Image src="http://valid.url/image.jpg" />);

    expect(screen.getByTestId("custom-image")).toBeTruthy();
  });

  it("renders placeholder when src is invalid", () => {
    (isValidUrl as jest.Mock).mockReturnValue(false);
    render(<Image src="invalid-url" />);

    expect(screen.getByTestId("placeholder-image")).toBeTruthy();
  });

  it("renders gradient when withGradient is true and image is loaded", () => {
    (isValidUrl as jest.Mock).mockReturnValue(true);
    render(<Image src="http://valid.url/image.jpg" withGradient />);

    // Simulate the onLoadEnd event to indicate that the image has loaded
    fireEvent(screen.getByTestId("custom-image"), "loadEnd");

    expect(screen.getByTestId("gradient")).toBeTruthy();
  });

  it("matches snapshot", () => {
    (isValidUrl as jest.Mock).mockReturnValue(true);
    const { toJSON } = render(<Image src="http://valid.url/image.jpg" />);
    expect(toJSON()).toMatchSnapshot();
  });
});
