import { Alert } from "react-native";
import {
  screenWidth,
  screenHeight,
  showAlert,
  showSuccessAlert,
  showErrorAlert,
} from "@/utils/ui";
import { AlertMessages } from "@/constants";

jest.mock("react-native", () => ({
  Alert: {
    alert: jest.fn(),
  },
  Dimensions: {
    get: jest.fn().mockReturnValue({
      width: 400,
      height: 800,
    }),
  },
}));

describe("UI Utility Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mock calls
  });

  it("should return the correct screen width", () => {
    expect(screenWidth()).toBe(400);
  });

  it("should return the correct screen height", () => {
    expect(screenHeight()).toBe(800);
  });

  describe("showAlert", () => {
    it("should display alert with correct title and content", () => {
      const title = "Test Title";
      const content = "Test Content";
      const action = jest.fn();

      showAlert(title, content, action);

      expect(Alert.alert).toHaveBeenCalledWith(
        title,
        content,
        expect.arrayContaining([
          expect.objectContaining({ text: "İptal" }),
          expect.objectContaining({ text: "Tamam" }),
        ]),
        { cancelable: true }
      );
    });

    it("should call action when okay button is pressed", () => {
      const action = jest.fn();
      showAlert("Test Title", "Test Content", action);

      const alertCall = (Alert.alert as jest.Mock).mock.calls[0]; // Get the alert call
      const buttons = alertCall[2]; // Get the buttons passed to the alert

      // Ensure buttons are defined and have expected length
      expect(buttons).toBeDefined();
      expect(buttons.length).toBeGreaterThan(0);

      buttons[1].onPress(); // Simulate pressing the okay button
      expect(action).toHaveBeenCalled(); // Check if action was called
    });

    it("should not call action if no action is provided", () => {
      showAlert("Test Title", "Test Content");

      const alertCall = (Alert.alert as jest.Mock).mock.calls[0];
      const buttons = alertCall[2];

      // Ensure buttons are defined and have expected length
      expect(buttons).toBeDefined();
      expect(buttons.length).toBeGreaterThan(0);

      buttons[0].onPress(); // Simulate pressing the okay button
      expect(Alert.alert).toHaveBeenCalledTimes(1); // Ensure Alert was called
    });
  });

  describe("showSuccessAlert", () => {
    it("should call showAlert with the correct parameters", () => {
      const content = "Success Message";

      showSuccessAlert(content);

      expect(Alert.alert).toHaveBeenCalledWith(
        AlertMessages.SUCCESS,
        content,
        expect.any(Array),
        { cancelable: true }
      );
    });
  });

  describe("showErrorAlert", () => {
    it("should call showAlert with the correct parameters", () => {
      const content = "Error Message";

      showErrorAlert(content);

      expect(Alert.alert).toHaveBeenCalledWith(
        AlertMessages.ERROR,
        content,
        expect.any(Array),
        { cancelable: true }
      );
    });
  });
});
