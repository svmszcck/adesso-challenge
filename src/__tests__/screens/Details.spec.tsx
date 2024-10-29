import React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react-native";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import Details from "@/screens/Details";
import { itemExists, addItem, removeItem } from "@/utils/asyncStorage";
import { updateImageSize } from "@/utils/data";
import { ErrorMessages } from "@/constants";

jest.mock(
  "@tanstack/react-query",
  () => require("@/utils/__mocks__/react-query").default
);
jest.mock("expo-router", () => require("@/utils/__mocks__/router").default);
jest.mock(
  "@/utils/asyncStorage",
  () => require("@/utils/__mocks__/asyncStorage").default
);
jest.mock("@/services/movieService", () => ({
  fetchMovie: jest.fn(),
}));

describe("Details Component", () => {
  const mockData = {
    Title: "Inception",
    imdbID: "tt1375666",
    Poster: "https://m.media-amazon.com/images/M/MV5B@._V1_SX300.jpg",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useLocalSearchParams as jest.Mock).mockReturnValue({ id: "tt1375666" });
  });

  test("renders loading state initially", async () => {
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true, data: null });

    render(<Details />);

    expect(screen.getByTestId("loading-indicator")).toBeTruthy();
  });

  test("renders data and checks favorite state on load", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isError: false,
      isLoading: false,
    });

    (itemExists as jest.Mock).mockResolvedValueOnce(true);

    render(<Details />);

    await screen.findByText(mockData.Title);
    expect(itemExists).toHaveBeenCalledWith("movies", mockData.imdbID);
  });

  test("shows ErrorUI on error", () => {
    (useQuery as jest.Mock).mockReturnValue({ isError: true, data: null });

    render(<Details />);

    expect(screen.getByText(ErrorMessages.GENERAL_ERROR)).toBeTruthy();
  });

  test("toggles favorite state and shows correct alerts", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isError: false,
      isLoading: false,
    });
    (itemExists as jest.Mock).mockResolvedValueOnce(false); // Initial check shows not favorite

    render(<Details />);
    await screen.findByText(mockData.Title);

    fireEvent.press(screen.getByTestId("floating-bıtton"));

    await waitFor(() => {
      expect(addItem).toHaveBeenCalledWith("movies", {
        Title: mockData.Title,
        imdbID: mockData.imdbID,
        Poster: mockData.Poster,
      });
    });

    fireEvent.press(screen.getByTestId("floating-bıtton"));

    await waitFor(() => {
      expect(removeItem).toHaveBeenCalled();
    });
  });

  test("computes image URL correctly", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isError: false,
      isLoading: false,
    });

    render(<Details />);

    const imageUrl = updateImageSize(mockData.Poster, 1200);

    expect(screen.getByTestId("custom-image")).toHaveProp("source", {
      uri: imageUrl,
    });
  });
});
