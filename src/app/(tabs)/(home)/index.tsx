import { useMemo, useState } from "react";
import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { router } from "expo-router";

import ScreenContainer from "@/components/ScreenContainer";
import { Filter, ImageGrid } from "@/components";
import { fetchMovies } from "@/services/movieService";
import { calculateNextPageParam } from "@/utils/data";
import type { MovieSummary } from "@/services/types";
import useFiter from "@/hooks/useFilter";
import useStore from "@/store";

export default function HomeScreen() {
  const [refreshing, setsetRefreshing] = useState(false);
  const queryClient = useQueryClient();
  // const { type, year, setType, setYear, resetFilters } = useStore();
  const { type, setType, year, setYear } = useFiter();

  const searchTerm = "avengers";

  const { data, isFetching, error, refetch, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["movies", searchTerm],
      queryFn: ({ pageParam }) => fetchMovies(searchTerm, pageParam),
      initialPageParam: 1,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) =>
        calculateNextPageParam<MovieSummary>(lastPage, pages),
    });

  const resetData = () => {
    setsetRefreshing(true);
    queryClient.resetQueries({ queryKey: ["movies"] }).then(() => {
      refetch();
      setsetRefreshing(false);
    });
  };

  const movies = useMemo(() => {
    if (!data || !data.pages) return [];

    return data.pages.flat().filter((item) => item !== undefined);
  }, [data?.pages]);

  return (
    <ScreenContainer
      title="Movies"
      icon="search"
      action={() => router.navigate("/(tabs)/search")}
    >
      <Filter
        type={type}
        setType={setType}
        year={year}
        setYear={setYear}
        onSubmit={() => {
          alert("filtered!");
        }}
      />

      <ImageGrid
        data={movies}
        hasNextPage={hasNextPage}
        fetchNextPage={() => fetchNextPage()}
        isFetching={isFetching}
        refetch={() => resetData()}
        refreshing={refreshing}
        paginated
      />
    </ScreenContainer>
  );
}
