import { type ComponentProps } from "react";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";

const TabBarIcon = ({
  style,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>["name"]>) => {
  return <Ionicons size={24} style={[styles.icon, style]} {...rest} />;
};

const styles = StyleSheet.create({
  icon: {
    marginBottom: -3,
  },
});

export default TabBarIcon;
