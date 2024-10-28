import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedText from "./ThemedText";

type BadgeProps = {
  title: string;
  style?: ViewStyle;
};

const Badge: React.FC<BadgeProps> = ({ title, style }) => {
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");

  return (
    <View
      style={[styles.badgeContainer, { backgroundColor: textColor }, style]}
    >
      <ThemedText
        type="defaultSemiBold"
        style={[styles.buttonText, { color: backgroundColor }]}
      >
        {title}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    alignSelf: "flex-start",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonText: {
    lineHeight: 20,
  },
});

export default Badge;
