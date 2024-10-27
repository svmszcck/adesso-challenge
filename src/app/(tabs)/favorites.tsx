import { useState, useCallback } from "react";
import { StyleSheet } from "react-native";
import { useFocusEffect } from "expo-router";

import { ScreenContainer, ImageGrid } from "@/components";
import { loadData } from "@/utils/asyncStorage";
import { MovieGridItem } from "@/services/types";

export default function Favorites() {
  const [favorites, setFavorites] = useState<MovieGridItem[]>();
  const [refreshing, setRefreshing] = useState<boolean>();

  useFocusEffect(
    useCallback(() => {
      getFavorites();
    }, [])
  );

  const getFavorites = async () => {
    setRefreshing(true);
    const result = await loadData("movies");

    if (result) {
      setFavorites(result as MovieGridItem[]);
    }

    setRefreshing(false);
  };

  return (
    <ScreenContainer title="Favorites">
      {favorites && (
        <ImageGrid
          data={favorites}
          refetch={getFavorites}
          refreshing={refreshing}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({});
