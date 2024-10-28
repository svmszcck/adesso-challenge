import React, { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";

import { loadData, clearData } from "@/utils/asyncStorage";
import type { MovieGridItem } from "@/services/types";
import { showAlert } from "@/utils/ui";
import { AlertMessages } from "@/constants";
import FavoritesView from "./view";

const Favorites = () => {
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

    setFavorites(result as MovieGridItem[]);
    setRefreshing(false);
  };

  const deleteFavorites = () => {
    showAlert(
      AlertMessages.CLEAR_FAVS_TITLE,
      AlertMessages.CLEAR_FAVS_MESSAGE,
      () => {
        clearData("movies");
        getFavorites();
      }
    );
  };

  const deleteWarning = () => {
    showAlert(AlertMessages.ERROR, AlertMessages.FAV_LIST_EMPTY_MESSAGE);
  };

  return (
    <FavoritesView
      {...{
        favorites,
        getFavorites,
        deleteFavorites,
        deleteWarning,
        refreshing,
      }}
    />
  );
};

export default Favorites;
