export const isValidText = (text: unknown): boolean => {
  return (
    typeof text === "string" &&
    text !== "N/A" &&
    text !== undefined &&
    text !== null
  );
};

export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

export const isEmpty = (data: unknown[]): boolean => {
  return data.length === 0;
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