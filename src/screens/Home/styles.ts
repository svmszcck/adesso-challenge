import { Spacing } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  noData: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
    aspectRatio: 1,
  },
  errorText: {
    marginBottom: Spacing.LARGE,
  },
});

export default styles;
