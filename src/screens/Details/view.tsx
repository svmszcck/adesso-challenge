import React from "react";
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import {
  Badge,
  ScreenContainer,
  ThemedText,
  Image,
  FloatingButton,
} from "@/components";
import { CommonColors, ErrorMessages, FontSize } from "@/constants";
import { isValidText } from "@/utils/validation";
import ImageModal from "@/utils/modals/ImageModal";
import { useThemeColor } from "@/hooks/useThemeColor";
import styles from "./styles";
import type { DetailsViewProps } from "./types";
import { normalizeGenres } from "@/utils/data";

const renderPoster = (props: DetailsViewProps) => (
  <View>
    {props.data?.Poster && (
      <Pressable onPress={() => props.setModalVisible(true)}>
        <Image src={props.imageURL} style={styles.image} withGradient />
        {isValidText(props.data.imdbRating) &&
          isValidText(props.data.imdbVotes) && (
            <View style={styles.rating}>
              <Ionicons
                name="star"
                size={26}
                color={CommonColors.YELLOW}
                onPress={() => router.back()}
              />
              <Text style={[styles.ratingText, { fontSize: FontSize.LARGE }]}>
                {props.data.imdbRating}/10
              </Text>
              <Text style={[styles.ratingText, { fontSize: FontSize.XXSMALL }]}>
                ({props.data.imdbVotes} Oylama)
              </Text>
            </View>
          )}
      </Pressable>
    )}
    <Ionicons
      name="chevron-back"
      size={26}
      color={CommonColors.WHITE}
      style={styles.backIcon}
      onPress={() => router.back()}
    />
  </View>
);

const renderDetails = (props: DetailsViewProps) => (
  <View style={styles.details}>
    <ThemedText type="title" style={{ fontSize: FontSize.XLARGE }}>
      {props.data?.Title}
    </ThemedText>
    <View style={styles.info}>
      <View style={styles.subTitle}>
        <ThemedText>IMDb ID: </ThemedText>
        <ThemedText isPale style={styles.subTitleText}>
          {props.data?.imdbID || "-"}
        </ThemedText>
      </View>
      <ThemedText>|</ThemedText>
      <View style={styles.subTitle}>
        <ThemedText>Yıl: </ThemedText>
        <ThemedText isPale style={styles.subTitleText}>
          {props.data?.Year || "-"}
        </ThemedText>
      </View>
    </View>

    <ScrollView
      contentContainerStyle={styles.genres}
      showsHorizontalScrollIndicator={false}
      horizontal
      nestedScrollEnabled
    >
      {normalizeGenres(props.data?.Genre)?.map((genre) => (
        <Badge key={genre} title={genre} />
      ))}
    </ScrollView>

    <ThemedText isPale>
      {isValidText(props.data?.Plot)
        ? props.data?.Plot
        : ErrorMessages.NO_MOVIE_DESCRIPTION}
    </ThemedText>
  </View>
);

const DetailsView: React.FC<DetailsViewProps> = (props) => {
  const textColor = useThemeColor({}, "text");
  const backGroundColor = useThemeColor({}, "background");
  const activityIndicatorColor = useThemeColor({}, "activityIndicator");

  return (
    <ScreenContainer style={styles.container}>
      {props.isLoading ? (
        <ActivityIndicator
          color={activityIndicatorColor}
          size={30}
          style={styles.loadingSpinner}
          testID="loading-indicator"
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {renderPoster(props)}
          {renderDetails(props)}
          {props.data && (
            <ImageModal
              src={props.imageURL || props.data.Poster}
              visible={props.isModalVisible}
              onClose={() => props.setModalVisible(false)}
            />
          )}
        </ScrollView>
      )}
      <FloatingButton
        color={textColor}
        iconColor={backGroundColor}
        icon={props.favorite ? "heart" : "heart-outline"}
        onPress={props.toggleFavorite}
      />
    </ScreenContainer>
  );
};

export default DetailsView;
