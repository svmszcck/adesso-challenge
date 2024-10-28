import { MovieType } from "@/services/types";
import type { ListItem } from "@/utils/modals/ListModal";
import { movieTypes } from "@/constants";
import type { InfiniteData } from "@tanstack/react-query";

export const calculateNextPageParam = <T>(
  lastPage: Array<T> | undefined,
  pages: (T[] | undefined)[]
): number | undefined => {
  return lastPage && lastPage.length > 0 ? pages.length + 1 : undefined;
};

// Increase image size if originalUrl is valid
export const updateImageSize = (
  originalUrl: string,
  newValue: number
): string | undefined => {
  const regex = /SX\d+\.jpg$/i;

  if (regex.test(originalUrl)) {
    const updatedUrl = originalUrl.replace(/SX\d+/i, `SX${newValue}`);

    return updatedUrl;
  } else {
    console.warn("The original string does not contain the required part.");

    return;
  }
};

export const generateYearRange = (
  startYear: number,
  endYear = new Date().getFullYear()
): string[] => {
  if (startYear > endYear) {
    throw new Error("Start year must be less than or equal to end year.");
  }

  const years = [];

  for (let year = endYear; year >= startYear; year--) {
    years.push(year.toString());
  }

  return years;
};

export const normalizeListData = (data: string[]): ListItem[] => {
  return data.map((item) => ({
    title: item,
    value: item,
  }));
};

export const getListItem = (
  data: ListItem[],
  value?: string
): ListItem | undefined => {
  return data.find((item) => item.value === value);
};

export const normalizeFilterText = (
  type?: MovieType,
  year?: string
): string => {
  if (!type && !year) return "-";

  let result = "";
  const title = getListItem(movieTypes, type)?.title;
  const titleExist = type && title;

  if (titleExist) {
    result = result.concat(`Tür: ${title}`);
  }

  if (year) {
    result = result.concat(`${titleExist ? " , " : ""}Yıl: ${year}`);
  }

  return result;
};

export const normalizeGenres = (genres?: string): string[] | undefined => {
  if (!genres) return;

  return genres.split(",");
};

export const parsePaginatedData = <T>(
  data: InfiniteData<T[] | undefined, unknown>
): T[] => {
  return data.pages.flat().filter((item) => item !== undefined);
};
