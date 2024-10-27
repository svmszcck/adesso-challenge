import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ListRenderItem,
  RefreshControl,
} from "react-native";
import { Link } from "expo-router";

import { screenWidth } from "@/utils/ui";
import { ThemedText } from "@/components";
import CustomImage from "./Image";
import type { MovieGridItem } from "@/services/types";

type ImageGridProps = {
  data: MovieGridItem[];
  paginated?: boolean;
  fetchNextPage?: () => void;
  refetch?: () => void;
  isFetching?: boolean;
  refreshing?: boolean;
  hasNextPage?: boolean;
};

const ImageGrid: React.FC<ImageGridProps> = ({
  data,
  hasNextPage,
  fetchNextPage,
  refetch,
  isFetching,
  refreshing,
  paginated = false,
}) => {
  const renderItem: ListRenderItem<MovieGridItem> = ({ item }) => (
    <Link
      href={{
        pathname: "/(home)/details",
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
  );

  return data ? (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.imdbID}
      numColumns={2}
      style={styles.gridContainer}
      contentContainerStyle={styles.gridContent}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={
        paginated && isFetching && !refreshing ? (
          <ActivityIndicator color="black" size={30} />
        ) : null
      }
      ListFooterComponentStyle={styles.gridFooter}
      onEndReached={({ distanceFromEnd }) => {
        if (!paginated || distanceFromEnd < 0) return;

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
    marginTop: 10,
    paddingTop: 10,
  },
  gridContent: {
    justifyContent: "center",
    margin: -10,
    paddingBottom: 60,
  },
  gridFooter: {
    marginTop: 10,
    paddingBottom: 20,
  },
  imageContainer: {
    flex: 1,
    margin: 10,
    marginBottom: 40,
    aspectRatio: 4 / 5,
    maxWidth: screenWidth() / 2 - 30,
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
