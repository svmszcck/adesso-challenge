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

export type PosterProps = Pick<
  DetailsViewProps,
  "data" | "imageURL" | "setModalVisible"
>;

export type InfoProps = Pick<DetailsViewProps, "data">;
