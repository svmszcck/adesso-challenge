import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";

import Button from "@/components/Button";

jest.mock("@/hooks/useThemeColor", () => ({
  useThemeColor: jest.fn((_, colorName) =>
    colorName === "text" ? "#ffffff" : "#009688"
  ),
}));

describe("Custom Button Component", () => {
  const mockOnPress = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with given props", () => {
    render(<Button title="Click Me" onPress={mockOnPress} />);

    expect(screen.getByText("Click Me")).toBeTruthy();
  });

  it("renders correctly with accessibility label", () => {
    render(
      <Button
        title="Click Me"
        onPress={mockOnPress}
        accessibilityLabel="Click Button"
      />
    );

    expect(screen.getByLabelText("Click Button")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    render(<Button title="Click Me" onPress={mockOnPress} />);

    fireEvent.press(screen.getByText("Click Me"));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("renders correctly with small size", () => {
    render(<Button title="Click Me" onPress={mockOnPress} isSmall />);

    expect(screen.getByText("Click Me")).toBeTruthy();
  });

  it("matches snapshot", () => {
    const { toJSON } = render(
      <Button title="Click Me" onPress={mockOnPress} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
