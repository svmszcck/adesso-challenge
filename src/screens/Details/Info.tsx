import React from "react";
import { View, ScrollView } from "react-native";

import { Badge, ThemedText } from "@/components";
import FontSize from "@/constants/fontSize";
import ErrorMessages from "@/constants/errorMessages";
import { normalizeGenres } from "@/utils/data";
import { isValidText } from "@/utils/validation";
import styles from "./styles";
import type { InfoProps } from "./types";

const Info: React.FC<InfoProps> = ({ data }) => {
  return (
    <View style={styles.details}>
      <ThemedText type="title" style={{ fontSize: FontSize.XLARGE }}>
        {data?.Title}
      </ThemedText>
      <View style={styles.info}>
        <View style={styles.subTitle}>
          <ThemedText>IMDb ID: </ThemedText>
          <ThemedText isPale style={styles.subTitleText}>
            {data?.imdbID || "-"}
          </ThemedText>
        </View>
        <ThemedText>|</ThemedText>
        <View style={styles.subTitle}>
          <ThemedText>Yıl: </ThemedText>
          <ThemedText isPale style={styles.subTitleText}>
            {data?.Year || "-"}
          </ThemedText>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.genres}
        showsHorizontalScrollIndicator={false}
        horizontal
        nestedScrollEnabled
      >
        {normalizeGenres(data?.Genre)?.map((genre) => (
          <Badge key={genre} title={genre} />
        ))}
      </ScrollView>

      <ThemedText isPale>
        {isValidText(data?.Plot)
          ? data?.Plot
          : ErrorMessages.NO_MOVIE_DESCRIPTION}
      </ThemedText>
    </View>
  );
};

export default Info;
