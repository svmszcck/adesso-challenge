import { StyleSheet } from "react-native";

import { CommonColors, FontSize, Spacing } from "@/constants";

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  contentContainer: {
    paddingBottom: 70,
  },
  backIcon: {
    position: "absolute",
    top: Spacing.LARGE,
    left: Spacing.LARGE,
  },
  details: {
    paddingHorizontal: Spacing.LARGE,
    paddingVertical: Spacing.SMALL,
  },
  loadingSpinner: {
    ...StyleSheet.absoluteFillObject,
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
    marginTop: 5,
  },
  subTitle: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 22,
  },
  subTitleText: {
    fontSize: FontSize.XSMALL,
  },
  genres: {
    flexDirection: "row",
    gap: Spacing.SMALL,
    marginTop: Spacing.SMALL,
    marginBottom: Spacing.LARGE,
  },
});

export default styles;
