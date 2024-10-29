import { useMemo, useState } from "react";
import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";

import { fetchMovies } from "@/services/movieService";
import type { MovieSummary } from "@/services/types";
import { calculateNextPageParam, parsePaginatedData } from "@/utils/data";
import { isEmpty } from "@/utils/validation";
import useStore from "@/store";
import HomeView from "./view";

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

  const movies = useMemo(() => {
    if (!data || !data.pages) return [];

    return parsePaginatedData(data);
  }, [data?.pages]);

  const resetData = () => {
    setsetRefreshing(true);
    queryClient.resetQueries({ queryKey: ["movies"] }).then(async () => {
      await refetch();
      setsetRefreshing(false);
    });
  };

  const noData = isError || (isFetched && isSuccess && isEmpty(movies));

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
