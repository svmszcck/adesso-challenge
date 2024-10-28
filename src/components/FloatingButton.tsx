import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type FloatingButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  iconColor: string;
  onPress: () => void;
};

const FloatingButton: React.FC<FloatingButtonProps> = ({
  icon,
  color,
  iconColor,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons name={icon} size={32} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: 20,
    right: 20,
    height: 60,
    borderRadius: 100,
  },
});

export default FloatingButton;
