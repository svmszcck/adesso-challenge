export type MovieType = "movie" | "series" | "episode" | "game";

type Rating = {
  Source: string;
  Value: string;
};

export type Movie = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: MovieType;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
};

export type MovieSummary = Pick<
  Movie,
  "Title" | "Year" | "imdbID" | "Type" | "Poster"
>;

export type MovieGridItem = Pick<MovieSummary, "Title" | "imdbID" | "Poster">;

export type SearchAPIResult = {
  Search: MovieSummary[];
  totalResults: string;
  Response: string;
};

export type MovieAPIResult = Movie & { Response: string };

export type ApiResponse = SearchAPIResult | MovieAPIResult;
