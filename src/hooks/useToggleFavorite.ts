import { useMemo, useState } from "react";

import { debounce } from "@/utils/general";
import { addItem, removeItem, itemExists } from "@/utils/asyncStorage";
import type { MovieAPIResult } from "@/services/types";
import { showAlert } from "@/utils/ui";
import { AlertMessages } from "@/constants";

const DEBOUNCE_TIME = 100;

type ReturnType = {
  favorite: boolean;
  toggleFavorite: () => void;
  checkFavorite: () => Promise<void>;
};

const useToggleFavorite = (data: MovieAPIResult | undefined): ReturnType => {
  const [favorite, setFavorite] = useState<boolean>(false);

  const debouncedToggleFavorite = useMemo(
    () =>
      debounce(() => {
        if (!data) return;

        const { Title, imdbID, Poster } = data;

        if (favorite) {
          setFavorite(false);
          removeItem("movies", data.imdbID);
          showAlert(AlertMessages.SUCCESS, AlertMessages.FAV_REMOVED_MESSAGE);
        } else {
          const parsedData = { Title, imdbID, Poster };

          setFavorite(true);
          addItem("movies", parsedData);
          showAlert(AlertMessages.SUCCESS, AlertMessages.FAV_ADDED_MESSAGE);
        }
      }, DEBOUNCE_TIME),
    [data, favorite, setFavorite]
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
