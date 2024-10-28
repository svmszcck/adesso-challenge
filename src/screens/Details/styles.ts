import { StyleSheet } from "react-native";

import { CommonColors, Spacing } from "@/constants";

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  contentContainer: {
    paddingBottom: 70,
  },
  details: {
    padding: Spacing.LARGE,
  },
  loadingSpinner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
    objectFit: "cover",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: Spacing.LARGE,
    left: Spacing.LARGE,
  },
  ratingText: {
    color: CommonColors.WHITE,
    marginLeft: 5,
  },
  info: {
    flexDirection: "row",
    gap: Spacing.SMALL,
    marginBottom: Spacing.SMALL,
  },
  subTitle: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 22,
  },
  subTitleText: {
    fontSize: 15,
  },
  genres: {
    flexDirection: "row",
    gap: Spacing.SMALL,
    marginTop: Spacing.SMALL,
    marginBottom: Spacing.LARGE,
  },
});

export default styles;
