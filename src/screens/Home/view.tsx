import React from "react";
import { View, Image } from "react-native";
import { router } from "expo-router";

import {
  Button,
  ScreenContainer,
  Filter,
  ImageGrid,
  ThemedText,
} from "@/components";
import { Routes, ErrorMessages } from "@/constants";
import NoResult from "@/assets/images/no-result.png";
import styles from "./styles";
import type { HomeViewProps } from "./types";

const HomeView: React.FC<HomeViewProps> = (props) => {
  return (
    <ScreenContainer
      title="Filmler"
      icon="search"
      action={() => router.navigate(Routes.SEARCH)}
    >
      <Filter
        type={props.type}
        setType={props.setType}
        year={props.year}
        setYear={props.setYear}
        onClear={props.resetFilters}
      />

      {props.noData ? (
        <View style={styles.noData}>
          <Image source={NoResult} style={styles.image} />
          <ThemedText type="default" style={styles.errorText}>
            {ErrorMessages.NO_MOVIE_LIST_DATA}
          </ThemedText>
          <Button
            title="TEKRAR DENE"
            accessibilityLabel="Tekrar dene"
            onPress={props.resetData}
          />
        </View>
      ) : (
        <ImageGrid
          data={props.movies}
          hasNextPage={props.hasNextPage}
          fetchNextPage={() => props.fetchNextPage()}
          isFetching={props.isFetching}
          refetch={() => props.resetData()}
          refreshing={props.refreshing}
          paginated
        />
      )}
    </ScreenContainer>
  );
};

export default HomeView;
