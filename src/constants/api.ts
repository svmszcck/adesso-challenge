import { MovieType } from "@/services/types";

export const movieTypes: { title: string; value: MovieType }[] = [
  { title: "Movie", value: "movie" },
  { title: "Series", value: "series" },
  { title: "Episode", value: "episode" },
  { title: "Game", value: "game" },
];
