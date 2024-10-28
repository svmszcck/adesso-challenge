import type { MovieGridItem } from "@/services/types";

export type FavoritesViewProps = {
  favorites: MovieGridItem[] | undefined;
  getFavorites: () => Promise<void>;
  deleteFavorites: () => void;
  deleteWarning: () => void;
  refreshing: boolean | undefined;
};
