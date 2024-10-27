import type { ListItem } from "@/utils/modals/ListModal";

export const calculateNextPageParam = <T>(
  lastPage: Array<T> | undefined,
  pages: any
): number | undefined => {
  return lastPage && lastPage.length > 0 ? pages.length + 1 : undefined;
};

export const updateImageSize = (
  originalUrl: string,
  newValue: number
): string | undefined => {
  // Regular expression to check for "SX" followed by digits before ".jpg"
  const regex = /SX\d+\.jpg$/i;

  // Check if the original string matches the regex
  if (regex.test(originalUrl)) {
    // Replace the value after SX using a regular expression
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

export const isValidUrl = (value?: string): boolean | undefined => {
  if (!value) return;

  let url;

  try {
    url = new URL(value);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};
