import React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react-native";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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

describe("Details Screen", () => {
  const mockData = {
    Title: "Inception",
    imdbID: "tt1375666",
    Poster: "https://m.media-amazon.com/images/M/MV5B@._V1_SX300.jpg",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useLocalSearchParams as jest.Mock).mockReturnValue({ id: "tt1375666" });
  });

  const Stack = createNativeStackNavigator();

  const renderScreen = () =>
    render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    );

  test("renders loading state initially", async () => {
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true, data: null });

    renderScreen();

    expect(screen.getByTestId("loading-indicator")).toBeTruthy();
  });

  test("renders data and checks favorite state on load", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isError: false,
      isLoading: false,
    });

    (itemExists as jest.Mock).mockResolvedValueOnce(true);

    renderScreen();

    await screen.findByText(mockData.Title);

    await waitFor(() => {
      expect(itemExists).toHaveBeenCalledWith("movies", mockData.imdbID);
    });
  });

  test("shows ErrorUI on error", async () => {
    (useQuery as jest.Mock).mockReturnValue({ isError: true, data: null });

    renderScreen();

    await waitFor(() => {
      expect(screen.getByText(ErrorMessages.GENERAL_ERROR)).toBeTruthy();
    });
  });

  test("toggles favorite state and shows correct alerts", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isError: false,
      isLoading: false,
    });

    (itemExists as jest.Mock).mockResolvedValueOnce(false); // Initial check shows not favorite

    renderScreen();

    await screen.findByText(mockData.Title);

    fireEvent.press(screen.getByTestId("floating-button"));

    await waitFor(() => {
      expect(addItem).toHaveBeenCalledWith("movies", {
        Title: mockData.Title,
        imdbID: mockData.imdbID,
        Poster: mockData.Poster,
      });
    });

    fireEvent.press(screen.getByTestId("floating-button"));

    await waitFor(() => {
      expect(removeItem).toHaveBeenCalled();
    });
  });

  test("computes image URL correctly", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isError: false,
      isLoading: false,
    });

    renderScreen();

    const imageUrl = updateImageSize(mockData.Poster, 1200);

    await waitFor(() => {
      expect(screen.getByTestId("custom-image")).toHaveProp("source", {
        uri: imageUrl,
      });
    });
  });
});
