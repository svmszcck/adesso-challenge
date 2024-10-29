import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Favorites from "@/screens/Favorites";
import { loadData } from "@/utils/asyncStorage";
import { showAlert } from "@/utils/ui";
import AlertMessages from "@/constants/alertMessages";
import ErrorMessages from "@/constants/errorMessages";

jest.mock(
  "@/utils/asyncStorage",
  () => require("@/utils/__mocks__/asyncStorage").default
);
jest.mock("@/utils/ui", () => require("@/utils/__mocks__/ui").default);

describe("Favorites Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockData = {
    imdbID: "1",
    Title: "Inception",
    Poster: "http://valid.url/image.jpg",
  };

  const Stack = createNativeStackNavigator();

  const renderScreen = () =>
    render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Favorites} />
        </Stack.Navigator>
      </NavigationContainer>
    );

  it("loads favorites on focus", async () => {
    const mockFavorites = [mockData];
    (loadData as jest.Mock).mockResolvedValueOnce(mockFavorites);

    renderScreen();

    await waitFor(() => {
      expect(loadData).toHaveBeenCalledWith("movies");
    });

    expect(screen.getByText("Inception")).toBeTruthy();
  });

  it("handles empty favorites", () => {
    (loadData as jest.Mock).mockResolvedValueOnce([]);

    renderScreen();

    expect(screen.getByText(ErrorMessages.NO_FAVORITE_DATA)).toBeTruthy();
  });

  it("shows warning if favorites list is empty", () => {
    renderScreen();

    fireEvent.press(screen.getByTestId("action-button"));

    expect(showAlert).toHaveBeenCalledWith(
      AlertMessages.ERROR,
      AlertMessages.FAV_LIST_EMPTY_MESSAGE
    );
  });
});
