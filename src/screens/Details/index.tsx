import React, { useState, useEffect, useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import { ErrorUI } from "@/components";
import { useThemeColor } from "@/hooks/useThemeColor";
import { fetchMovie } from "@/services/movieService";
import { AlertMessages } from "@/constants";
import { updateImageSize } from "@/utils/data";
import { itemExists, addItem, removeItem } from "@/utils/asyncStorage";
import { showAlert } from "@/utils/ui";
import DetailsView from "./view";

const Details = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const textColor = useThemeColor({}, "text");
  const params = useLocalSearchParams<{ id: string }>();
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["movie", params.id],
    queryFn: () => fetchMovie(params.id),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    checkFavorite();
  }, [data]);

  const checkFavorite = async () => {
    if (!data) return;

    const result = await itemExists("movies", data?.imdbID);

    setFavorite(result === true);
  };

  const toggleFavorite = () => {
    if (!data) return;

    const { Title, imdbID, Poster } = data;

    if (favorite) {
      removeItem("movies", data.imdbID);
      setFavorite(false);
      showAlert(AlertMessages.SUCCESS, "Film favorilerden kaldırıldı.");
    } else {
      const parsedData = { Title, imdbID, Poster };

      addItem("movies", parsedData);
      setFavorite(true);
      showAlert(AlertMessages.SUCCESS, "Film favorilere eklendi.");
    }
  };

  const imageURL = useMemo(
    () => (data?.Poster ? updateImageSize(data.Poster, 1200) : undefined),
    [data?.Poster]
  );

  if (error) return <ErrorUI />;

  return (
    <DetailsView
      {...{
        isLoading,
        data,
        isModalVisible,
        setModalVisible,
        favorite,
        toggleFavorite,
        imageURL,
        textColor,
      }}
    />
  );
};

export default Details;
