import { StyleSheet } from "react-native";

import { CommonColors, Spacing } from "@/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filter: {
    marginTop: Spacing.XLARGE,
    marginBottom: Spacing.SMALL,
  },
  filterPanel: {
    marginTop: Spacing.LARGE,
    padding: Spacing.MEDIUM,
    backgroundColor: CommonColors.GRAY_LIGHT,
    borderRadius: 20,
  },
  submitButton: {
    marginTop: Spacing.XXLARGE,
  },
});

export default styles;
