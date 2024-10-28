import { Stack } from "expo-router/stack";

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
      <Stack.Screen name="details" options={{ title: "Details" }} />
    </Stack>
  );
}
