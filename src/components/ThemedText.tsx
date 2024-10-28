import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { FontSize } from "@/constants";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  isPale?: boolean;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  numberOfLines?: number;
};

const ThemedText = ({
  style,
  lightColor,
  darkColor,
  isPale = false,
  type = "default",
  numberOfLines,
  ...rest
}: ThemedTextProps) => {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    isPale ? "textPale" : "text"
  );

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      numberOfLines={numberOfLines}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  default: {
    fontSize: FontSize.XSMALL,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: FontSize.XSMALL,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: FontSize.XXLARGE,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: FontSize.LARGE,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: FontSize.XSMALL,
    color: "#0a7ea4",
  },
});

export default ThemedText;
