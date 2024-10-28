import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { router } from "expo-router";

import { Button } from "@/components";
import { Routes } from "@/constants";
import Error from "@/assets/images/error.png";

const ErrorUI = () => {
  return (
    <View style={styles.container}>
      <Image source={Error} style={styles.image} />
      <Button
        title="GO TO HOME"
        accessibilityLabel="Go to Home"
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
  image: {
    width: 300,
    height: 300,
  },
});

export default ErrorUI;
