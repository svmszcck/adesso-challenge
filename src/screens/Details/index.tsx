import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import { ErrorUI } from "@/components";
import { fetchMovie } from "@/services/movieService";
import { AlertMessages } from "@/constants";
import { updateImageSize } from "@/utils/data";
import { itemExists, addItem, removeItem } from "@/utils/asyncStorage";
import { showAlert } from "@/utils/ui";
import { debounce } from "@/utils/general";
import DetailsView from "./view";

const DEFAULT_IMAGE_SIZE = 1200;
const DEBOUNCE_TIME = 300;

const Details = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const navigation = useNavigation();
  const params = useLocalSearchParams<{ id: string }>();
  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: ["movie", params.id],
    queryFn: () => fetchMovie(params.id),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkFavorite();
    });

    return unsubscribe;
  }, [data]);

  const checkFavorite = async () => {
    if (!data) return;

    const result = await itemExists("movies", data?.imdbID);
    setFavorite(result);
  };

  const debouncedToggleFavorite = useCallback(
    debounce(() => {
      if (!data) return;

      const { Title, imdbID, Poster } = data;

      if (favorite) {
        removeItem("movies", data.imdbID);
        setFavorite(false);
        showAlert(AlertMessages.SUCCESS, AlertMessages.FAV_REMOVED_MESSAGE);
      } else {
        const parsedData = { Title, imdbID, Poster };

        addItem("movies", parsedData);
        setFavorite(true);
        showAlert(AlertMessages.SUCCESS, AlertMessages.FAV_ADDED_MESSAGE);
      }
    }, DEBOUNCE_TIME),
    [data, favorite, removeItem, addItem, setFavorite, showAlert]
  );

  const toggleFavorite = () => {
    debouncedToggleFavorite();
  };

  const imageURL = useMemo(
    () =>
      data?.Poster
        ? updateImageSize(data.Poster, DEFAULT_IMAGE_SIZE)
        : undefined,
    [data?.Poster]
  );

  if (isError) return <ErrorUI />;

  return (
    <DetailsView
      {...{
        isLoading,
        data,
        isModalVisible,
        setModalVisible,
        imageURL,
        favorite,
        toggleFavorite,
      }}
    />
  );
};

export default Details;
