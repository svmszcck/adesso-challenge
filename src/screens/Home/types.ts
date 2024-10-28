import type { MovieSummary, MovieType } from "@/services/types";

export type HomeViewProps = {
  type: string | undefined;
  setType: (value: MovieType) => void;
  year: string | undefined;
  setYear: (value: string) => void;
  resetFilters: () => void;
  noData: boolean;
  movies: MovieSummary[];
  hasNextPage: boolean;
  refreshing: boolean;
  isFetching: boolean;
  resetData: () => void;
  fetchNextPage: () => void;
};
