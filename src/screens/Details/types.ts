import type { MovieAPIResult } from "@/services/types";

export type DetailsViewProps = {
  isLoading: boolean;
  data: MovieAPIResult | undefined;
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  imageURL: string | undefined;
  favorite: boolean;
  toggleFavorite: () => void;
};
