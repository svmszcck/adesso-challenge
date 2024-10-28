import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { router } from "expo-router";

import { Button, ThemedText } from "@/components";
import { ErrorMessages, Routes, Spacing } from "@/constants";
import Error from "@/assets/images/error.png";

const ErrorUI = () => {
  return (
    <View style={styles.container}>
      <Image
        source={Error}
        style={styles.image}
        accessibilityRole="image"
        accessible
        accessibilityLabel="Hata resmi"
      />
      <ThemedText
        type="subtitle"
        style={styles.errorText}
        accessible
        accessibilityLabel={ErrorMessages.GENERAL_ERROR}
      >
        {ErrorMessages.GENERAL_ERROR}
      </ThemedText>
      <Button
        title="ANA EKRANA GİT"
        accessibilityLabel="Ana ekrana git"
        onPress={() => router.navigate(Routes.HOME)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    marginBottom: Spacing.LARGE,
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default ErrorUI;
