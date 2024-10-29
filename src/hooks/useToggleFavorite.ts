import { useCallback, useState, Dispatch, SetStateAction } from "react";

import { debounce } from "@/utils/general";
import { addItem, removeItem, itemExists } from "@/utils/asyncStorage";
import type { MovieAPIResult } from "@/services/types";
import { showAlert } from "@/utils/ui";
import { AlertMessages } from "@/constants";

const DEBOUNCE_TIME = 300;

type ReturnType = {
  favorite: boolean;
  toggleFavorite: () => void;
  checkFavorite: () => Promise<void>;
};

const useToggleFavorite = (data: MovieAPIResult | undefined): ReturnType => {
  const [favorite, setFavorite] = useState<boolean>(false);

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

  const checkFavorite = async () => {
    if (!data) return;

    const result = await itemExists("movies", data?.imdbID);
    setFavorite(result);
  };

  return {
    favorite,
    toggleFavorite,
    checkFavorite,
  };
};

export default useToggleFavorite;
