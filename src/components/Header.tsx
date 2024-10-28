import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ThemedText from "@/components/ThemedText";
import Spacing from "@/constants/spacing";

type HeaderProps = {
  title: string;
  icon?: keyof typeof Ionicons.glyphMap;
  action?: () => void;
};

const Header: React.FC<HeaderProps> = ({ title, icon, action }) => {
  return (
    <View style={styles.header}>
      {title && (
        <ThemedText type="title" style={styles.title}>
          {title}
        </ThemedText>
      )}
      {icon && (
        <TouchableOpacity activeOpacity={0.5} onPress={action}>
          <Ionicons name={icon} size={26} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: Spacing.LARGE,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  title: {
    marginBottom: Spacing.SMALL,
  },
});

export default Header;
