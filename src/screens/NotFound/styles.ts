import { StyleSheet } from "react-native";

import Spacing from "@/constants/spacing";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.LARGE,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

export default styles;
