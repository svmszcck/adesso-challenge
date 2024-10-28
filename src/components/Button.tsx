import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";

import { ThemedText } from "@/components";
import { useThemeColor } from "@/hooks/useThemeColor";
import { FontSize } from "@/constants";

type ButtonProps = {
  title: string;
  accessibilityLabel?: string;
  onPress: () => void;
  style?: ViewStyle;
  isSmall?: boolean;
};

const CustomButton: React.FC<ButtonProps> = ({
  title,
  accessibilityLabel,
  onPress,
  style,
  isSmall,
}) => {
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonContainer,
        { backgroundColor: textColor, paddingVertical: isSmall ? 6 : 10 },
        style,
      ]}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
      accessible
      activeOpacity={0.8}
    >
      <ThemedText style={[styles.buttonText, { color: backgroundColor }]}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: FontSize.SMALL,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default CustomButton;
