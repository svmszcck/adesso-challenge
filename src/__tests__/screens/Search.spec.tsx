import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { router } from "expo-router";
import useStore from "@/store";
import useFilter from "@/hooks/useFilter";
import { AlertMessages, Routes } from "@/constants";
import { showErrorAlert } from "@/utils/ui";
import Search from "@/screens/Search";

jest.mock("expo-router", () => require("@/utils/__mocks__/router").default);
jest.mock("@/store", () => require("@/utils/__mocks__/store").default);
jest.mock(
  "@/hooks/useFilter",
  () => require("@/utils/__mocks__/useFilter").default
);
jest.mock("@/utils/ui", () => require("@/utils/__mocks__/ui").default);

describe("Search Screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock initial values and methods

    (useFilter as jest.Mock).mockReturnValue({
      type: "",
      setType: jest.fn(),
      year: "",
      setYear: jest.fn(),
    });
  });

  it("renders correctly with default props", () => {
    render(<Search />);
    expect(screen.getByTestId("search-input")).toBeTruthy();
  });

  it("updates search input value", () => {
    render(<Search />);

    const input = screen.getByTestId("search-input");

    // Simulate text input
    fireEvent.changeText(input, "New Search Value");
    expect(input.props.value).toBe("New Search Value");
  });

  it("shows an error alert when search is triggered with empty values", () => {
    render(<Search />);

    const searchButton = screen.getByTestId("search-button");
    fireEvent.press(searchButton);

    expect(showErrorAlert).toHaveBeenCalledWith(
      AlertMessages.SEARCH_INVALID_MESSAGE
    );
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it("triggers search with valid values and navigates to the home route", () => {
    // Update mock filter values for this test
    (useFilter as jest.Mock).mockReturnValue({
      type: "movie",
      setType: jest.fn(),
      year: "2022",
      setYear: jest.fn(),
    });

    render(<Search />);

    // Set the search input
    fireEvent.changeText(screen.getByTestId("search-input"), "Test Search");

    const searchButton = screen.getByTestId("search-button");
    fireEvent.press(searchButton);

    expect(useStore.getState().setSearchValue).toHaveBeenCalledWith(
      "Test Search"
    );
    expect(useStore.getState().setType).toHaveBeenCalledWith("movie");
    expect(useStore.getState().setYear).toHaveBeenCalledWith("2022");
    expect(router.navigate).toHaveBeenCalledWith(Routes.HOME);
  });

  it("only updates store with entered values", () => {
    render(<Search />);

    // Set only the search input
    fireEvent.changeText(screen.getByTestId("search-input"), "Partial Search");

    const searchButton = screen.getByTestId("search-button");
    fireEvent.press(searchButton);

    expect(useStore.getState().setSearchValue).toHaveBeenCalledWith(
      "Partial Search"
    );
    expect(useStore.getState().setType).not.toHaveBeenCalled();
    expect(useStore.getState().setYear).not.toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(Routes.HOME);
  });
});
