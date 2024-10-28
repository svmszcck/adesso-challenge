import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText, ThemedView } from "@/components";
import { Routes } from "@/constants";
import styles from "./styles";

const NotFound = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView
        style={styles.container}
        accessible
        accessibilityRole="alert"
        accessibilityLabel="Sayfa Bulunamadı"
        accessibilityHint="Aradığınız sayfa bulunamadı. Ana ekrana gitmek için aşağıdaki bağlantıya tıklayın."
      >
        <ThemedText type="title" accessibilityRole="header">
          Bu sayfa mevcut değil
        </ThemedText>
        <Link
          href={Routes.HOME}
          style={styles.link}
          replace
          accessible
          accessibilityRole="button"
          accessibilityLabel="Ana sayfaya git"
        >
          <ThemedText type="link">Ana Sayfaya Git!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
};

export default NotFound;
