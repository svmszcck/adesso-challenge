import Ionicons from "@expo/vector-icons/Ionicons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";

const TabBarIcon = ({
  style,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>["name"]>) => {
  return <Ionicons size={26} style={[{ marginBottom: -3 }, style]} {...rest} />;
};

export default TabBarIcon;
