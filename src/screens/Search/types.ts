import type { MovieType } from "@/services/types";

export type SearchViewProps = {
  defaultValue: string;
  value: string;
  setValue: (value: string) => void;
  handleSearch: () => void;
  localType: MovieType | undefined;
  setLocalType: (value: MovieType) => void;
  localYear: string | undefined;
  setLocalYear: (value: string) => void;
  resetFilters: () => void;
};
