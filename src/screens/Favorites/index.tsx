import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { loadData, clearData } from "@/utils/asyncStorage";
import type { MovieGridItem } from "@/services/types";
import { showAlert } from "@/utils/ui";
import AlertMessages from "@/constants/alertMessages";
import FavoritesView from "./view";

const Favorites = () => {
  const [favorites, setFavorites] = useState<MovieGridItem[]>();
  const [refreshing, setRefreshing] = useState<boolean>();
  const navigation = useNavigation();

  const getFavorites = async () => {
    setRefreshing(true);
    const result = await loadData("movies");

    setFavorites(result as MovieGridItem[]);
    setRefreshing(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getFavorites();
    });

    return unsubscribe;
  }, []);

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
