import React, { memo } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ListRenderItem,
  RefreshControl,
} from "react-native";
import { Link } from "expo-router";

import { screenWidth } from "@/utils/ui";
import ThemedText from "@/components/ThemedText";
import type { MovieGridItem } from "@/services/types";
import Spacing from "@/constants/spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import CustomImage from "./Image";

const IMAGE_CONTAINER_OFFSET = 30;

type ImageGridProps = {
  data: MovieGridItem[];
  paginated?: boolean;
  fetchNextPage?: () => void;
  refetch?: () => void;
  isFetching?: boolean;
  refreshing?: boolean;
  hasNextPage?: boolean;
};

const ImageGridItem: React.FC<MovieGridItem> = memo(
  (item) => (
    <Link
      href={{
        pathname: "/details", // We can't use the enum value for this string
        params: { id: item.imdbID },
      }}
      asChild
    >
      <TouchableOpacity style={styles.imageContainer} activeOpacity={0.8}>
        <CustomImage src={item.Poster} style={styles.image} />
        <ThemedText numberOfLines={1} style={styles.title}>
          {item.Title}
        </ThemedText>
      </TouchableOpacity>
    </Link>
  ),
  (prevProps, nextProps) => prevProps.imdbID === nextProps.imdbID // re-render only when id changes
);

const ImageGrid: React.FC<ImageGridProps> = ({
  data,
  hasNextPage,
  fetchNextPage,
  refetch,
  isFetching,
  refreshing,
  paginated = false,
}) => {
  const activityIndicatorColor = useThemeColor({}, "activityIndicator");

  return data ? (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <ImageGridItem
          imdbID={item.imdbID}
          Poster={item.Poster}
          Title={item.Title}
        />
      )}
      keyExtractor={(item) => item.imdbID}
      numColumns={2}
      style={styles.gridContainer}
      contentContainerStyle={styles.gridContent}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews
      initialNumToRender={6}
      ListFooterComponent={
        paginated && isFetching && !refreshing ? (
          <ActivityIndicator color={activityIndicatorColor} size={30} />
        ) : null
      }
      ListFooterComponentStyle={styles.gridFooter}
      onEndReached={({ distanceFromEnd }) => {
        if (!paginated || distanceFromEnd < 0 || isFetching) return;

        hasNextPage && fetchNextPage?.();
      }}
      refreshControl={
        refreshing !== undefined ? (
          <RefreshControl refreshing={refreshing} onRefresh={refetch} />
        ) : undefined
      }
    />
  ) : null;
};

const styles = StyleSheet.create({
  gridContainer: {
    paddingTop: Spacing.SMALL,
  },
  gridContent: {
    justifyContent: "center",
    margin: -Spacing.SMALL,
    paddingBottom: 60,
  },
  gridFooter: {
    marginTop: Spacing.SMALL,
    paddingBottom: Spacing.LARGE,
  },
  imageContainer: {
    flex: 1,
    margin: Spacing.SMALL,
    marginBottom: 40,
    aspectRatio: 4 / 5,
    maxWidth: screenWidth / 2 - IMAGE_CONTAINER_OFFSET,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  title: {
    marginTop: 5,
  },
});

export default ImageGrid;
