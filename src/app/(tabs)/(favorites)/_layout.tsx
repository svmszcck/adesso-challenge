import { Stack } from "expo-router/stack";

export default function Layout() {
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
