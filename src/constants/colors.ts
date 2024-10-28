export enum CommonColors {
  WHITE = "#ffffff",
  BLACK = "#1C1C27",
  GRAY = "#CCCCCC",
  GRAY_LIGHT = "#EEEEEE",
  GRAY_DARK = "#9BA1A6",
  GRAY_DARKER = "#687076",
  RED = "#DE3232",
  YELLOW = "#FFFF00",
  BLUE = "#0a7ea4",
  GREEN_DARK = "#364249",
  TEXT_PALE = "#9b9bab",
  TEXT_PALE_DARKER = "#898999",
}

export const Colors = {
  light: {
    text: CommonColors.GREEN_DARK,
    textPale: CommonColors.TEXT_PALE_DARKER,
    background: CommonColors.WHITE,
    tint: CommonColors.BLUE,
    icon: CommonColors.GRAY_DARKER,
    tabIconDefault: CommonColors.GRAY_DARKER,
    tabIconSelected: CommonColors.BLUE,
    separator: CommonColors.GRAY_LIGHT,
    activityIndicator: CommonColors.BLACK,
  },
  dark: {
    text: CommonColors.GRAY_LIGHT,
    textPale: CommonColors.TEXT_PALE,
    background: CommonColors.BLACK,
    tint: CommonColors.WHITE,
    icon: CommonColors.GRAY_DARK,
    tabIconDefault: CommonColors.GRAY_DARK,
    tabIconSelected: CommonColors.WHITE,
    separator: CommonColors.GRAY_DARKER,
    activityIndicator: CommonColors.GRAY_LIGHT,
  },
};
