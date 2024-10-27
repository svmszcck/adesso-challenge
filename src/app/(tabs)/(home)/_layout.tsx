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
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen
        name="details"
        options={{ title: "Details", headerTitle: "" }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
