import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText, ThemedView } from "@/components";
import { Routes } from "@/constants";
import styles from "./styles";

const NotFound = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        <Link href={Routes.HOME} style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
};

export default NotFound;
