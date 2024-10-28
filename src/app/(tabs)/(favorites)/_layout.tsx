import { TouchableOpacity, StyleSheet } from "react-native";
import { Stack } from "expo-router/stack";
import { Ionicons } from "@expo/vector-icons";

import { ThemedText } from "@/components";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Layout() {
  const color = useThemeColor({}, "background");

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Favorites" }} />
      <Stack.Screen
        name="details"
        options={{ title: "Details", headerTitle: "" }}
      />
    </Stack>
  );
}
