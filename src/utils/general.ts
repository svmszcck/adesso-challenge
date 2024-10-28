import { Platform } from "react-native";

export const isIOS = () => Platform.OS === "ios";

export const debounce = (
  callback: Function,
  wait: number
): ((...args: unknown[]) => void) => {
  let timeoutRef: number;

  return (...args: unknown[]) => {
    window.clearTimeout(timeoutRef);
    timeoutRef = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};
