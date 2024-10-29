import React, { useState, useEffect, useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import { ErrorUI } from "@/components";
import { fetchMovie } from "@/services/movieService";
import { updateImageSize } from "@/utils/data";
import useToggleFavorite from "@/hooks/useToggleFavorite";
import DetailsView from "./view";

const DEFAULT_IMAGE_SIZE = 1200;

const Details = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const params = useLocalSearchParams<{ id: string }>();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["movie", params.id],
    queryFn: () => fetchMovie(params.id),
    refetchOnWindowFocus: false,
  });
  const { favorite, toggleFavorite, checkFavorite } = useToggleFavorite(data);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkFavorite();
    });

    return unsubscribe;
  }, [data]);

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
