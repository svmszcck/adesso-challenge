import { useMemo, useState } from "react";
import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";

import { fetchMovies } from "@/services/movieService";
import { calculateNextPageParam } from "@/utils/data";
import type { MovieSummary } from "@/services/types";
import useStore from "@/store";
import HomeView from "./view";
import { isAxiosError } from "axios";

const Home = () => {
  const [refreshing, setsetRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const { type, setType, year, setYear, searchValue, resetFilters } =
    useStore();

  const {
    data,
    isFetched,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies", searchValue, type, year],
    queryFn: ({ pageParam }) => fetchMovies(searchValue, type, year, pageParam),
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, pages) =>
      calculateNextPageParam<MovieSummary>(lastPage, pages),
  });

  const resetData = () => {
    setsetRefreshing(true);
    queryClient.resetQueries({ queryKey: ["movies"] }).then(async () => {
      await refetch();
      setsetRefreshing(false);
    });
  };

  const movies = useMemo(() => {
    if (!data || !data.pages) return [];

    return data.pages.flat().filter((item) => item !== undefined);
  }, [data?.pages]);

  const noData = isError || (isFetched && isSuccess && movies.length === 0);

  return (
    <HomeView
      {...{
        type,
        setType,
        year,
        setYear,
        resetFilters,
        noData,
        hasNextPage,
        refreshing,
        isFetching,
        movies,
        resetData,
        fetchNextPage,
      }}
    />
  );
};

export default Home;
