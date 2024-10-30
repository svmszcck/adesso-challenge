import { StyleSheet, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useThemeColor } from "@/hooks/useThemeColor";
import Spacing from "@/constants/spacing";
import Header from "./navigation/Header";

export type ScreenContainerProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  title?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  action?: () => void;
};

const ScreenContainer = ({
  style,
  lightColor,
  darkColor,
  title,
  icon,
  action,
  children,
}: ScreenContainerProps) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor }, style]}
      edges={["top", "left", "right"]}
    >
      {title && <Header title={title} icon={icon} action={action} />}
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: Spacing.LARGE,
    paddingBottom: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    marginBottom: Spacing.SMALL,
  },
});

export default ScreenContainer;
