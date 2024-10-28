import { showErrorAlert } from "@/utils/ui";
import { ErrorMessages } from "@/constants";

import { getData } from "./apiClient";
import { SearchAPIResult, MovieAPIResult, MovieType } from "./types";

export const fetchMovies = async (
  searchValue: string,
  type?: MovieType,
  year?: string,
  page?: number
): Promise<SearchAPIResult["Search"] | undefined> => {
  try {
    if (!searchValue) {
      throw new Error("searchValue can't be empty");
    }

    const response = await getData<SearchAPIResult>("/", {
      r: "json",
      s: searchValue,
      type,
      y: year,
      page,
    });

    if (!response || !response.data) {
      console.error("There isn't any result");
      return;
    }

    return response.data.Search;
  } catch (error) {
    showErrorAlert(ErrorMessages.GENERAL_ERROR);
    console.error(error);
  }
};

export const fetchMovie = async (
  id: string
): Promise<MovieAPIResult | undefined> => {
  try {
    if (!id) {
      throw new Error("id can't be empty");
    }

    const response = await getData<MovieAPIResult>("/", {
      r: "json",
      i: id,
    });

    if (!response || !response.data) {
      console.error("There isn't any result");
      return;
    }

    return response.data;
  } catch (error) {
    showErrorAlert(ErrorMessages.GENERAL_ERROR);
    console.error(error);
  }
};
