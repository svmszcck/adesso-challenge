const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export enum CommonColors {
  WHITE = "#ffffff",
  BLACK = "#000000",
  GRAY_LIGHT = "#EEEEEE",
}

export const Colors = {
  light: {
    text: "#364249",
    textPale: "#898999",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    separator: "#eeeeee",
  },
  dark: {
    text: "#ECEDEE",
    textPale: "#9b9bab",
    background: "#1C1C27",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    separator: "#eeeeee",
  },
};
