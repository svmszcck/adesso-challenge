import { StyleSheet, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import Header from "./Header";

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
    <SafeAreaView style={[styles.safeArea, { backgroundColor }, style]}>
      {title && <Header title={title} icon={icon} action={action} />}
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 20,
    paddingBottom: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    marginBottom: 10,
  },
});

export default ScreenContainer;
