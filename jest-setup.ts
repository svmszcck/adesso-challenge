import { Dimensions } from "react-native";
import "@testing-library/react-native/extend-expect";
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

// jest.mock("react-native-safe-area-context", () => "SafeAreaView");

// Mock `@expo/vector-icons` to avoid issues with native icons
jest.mock("@expo/vector-icons", () => {
  return {
    Ionicons: jest.fn(() => null),
    // Mock other icons here as needed
  };
});

jest
  .spyOn(Dimensions, "get")
  .mockReturnValue({ width: 414, height: 818, scale: 2, fontScale: 2 });
