import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import Filter from "@/components/Filter";

describe("Filter Component", () => {
  const mockSetType = jest.fn();
  const mockSetYear = jest.fn();
  const mockOnClear = jest.fn();

  const defaultProps = {
    type: undefined,
    setType: mockSetType,
    year: undefined,
    setYear: mockSetYear,
    onClear: mockOnClear,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<Filter {...defaultProps} />);

    // Check that buttons and icons are displayed
    expect(screen.getByText("Tür")).toBeTruthy();
    expect(screen.getByText("Yayınlanma Yılı")).toBeTruthy();
  });

  it("opens type modal when 'Tür' button is pressed", () => {
    render(<Filter {...defaultProps} />);

    // Open type modal
    fireEvent.press(screen.getByText("Tür"));

    // Check if type modal opens
    expect(screen.getByText("Tür Seçerek Filtrele")).toBeTruthy();
  });

  it("opens year modal when 'Yayınlanma Yılı' button is pressed", () => {
    render(<Filter {...defaultProps} />);

    // Open year modal
    fireEvent.press(screen.getByText("Yayınlanma Yılı"));

    // Check if year modal opens
    expect(screen.getByText("Yıl Seçerek Filtrele")).toBeTruthy();
  });

  it("calls setType and closes type modal on selection", () => {
    render(<Filter {...defaultProps} />);

    // Open type modal and select a type
    fireEvent.press(screen.getByText("Tür"));
    fireEvent.press(screen.getByText("Film"));

    // Check if setType was called with the correct value
    expect(mockSetType).toHaveBeenCalledWith("movie");
  });

  it("calls setYear and closes year modal on selection", () => {
    render(<Filter {...defaultProps} />);

    // Open year modal and select a year
    fireEvent.press(screen.getByText("Yayınlanma Yılı"));
    fireEvent.press(screen.getByText("2022"));

    // Check if setYear was called with the correct value
    expect(mockSetYear).toHaveBeenCalledWith("2022");
  });

  it("renders clear button if type or year is set", () => {
    render(<Filter {...defaultProps} type="Action" />);

    // Check that the clear button is rendered
    expect(screen.getByText("Sıfırla")).toBeTruthy();
  });

  it("calls onClear when clear button is pressed", () => {
    render(<Filter {...defaultProps} type="Action" year="2022" />);

    // Press clear button
    fireEvent.press(screen.getByText("Sıfırla"));

    // Verify onClear callback
    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });

  it("matches snapshot", () => {
    const { toJSON } = render(
      <Filter
        type="movie"
        year="2018"
        setType={mockSetType}
        setYear={mockSetYear}
        onClear={mockOnClear}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
