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
import { CommonColors, ErrorMessages } from "@/constants";
import { isValidText } from "@/utils/validation";
import ImageModal from "@/utils/modals/ImageModal";
import styles from "./styles";
import type { DetailsViewProps } from "./types";

const DetailsView: React.FC<DetailsViewProps> = (props) => {
  return (
    <ScreenContainer style={styles.container}>
      {props.isLoading ? (
        <ActivityIndicator
          color={CommonColors.BLACK}
          size={30}
          style={styles.loadingSpinner}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
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
                        color={"yellow"}
                        onPress={() => router.back()}
                      />
                      <Text style={[styles.ratingText, { fontSize: 20 }]}>
                        {props.data.imdbRating}/10
                      </Text>
                      <Text style={[styles.ratingText, { fontSize: 14 }]}>
                        ({props.data.imdbVotes} Votes)
                      </Text>
                    </View>
                  )}
              </Pressable>
            )}
            <Ionicons
              name="chevron-back"
              size={26}
              color={CommonColors.WHITE}
              style={{ position: "absolute", top: 20, left: 20 }}
              onPress={() => router.back()}
            />
          </View>
          <View style={styles.details}>
            <ThemedText type="title">{props.data?.Title}</ThemedText>
            <View style={styles.info}>
              <View style={styles.subTitle}>
                <ThemedText>IMDb ID: </ThemedText>
                <ThemedText isPale style={styles.subTitleText}>
                  {props.data?.imdbID || "-"}
                </ThemedText>
              </View>
              <ThemedText>|</ThemedText>
              <View style={styles.subTitle}>
                <ThemedText>Year: </ThemedText>
                <ThemedText isPale style={styles.subTitleText}>
                  {props.data?.Year || "-"}
                </ThemedText>
              </View>
            </View>

            <ScrollView
              contentContainerStyle={styles.genres}
              showsHorizontalScrollIndicator={false}
            >
              {props.data?.Genre.split(",").map((genre) => (
                <Badge key={genre} title={genre} />
              ))}
            </ScrollView>

            <ThemedText isPale>
              {isValidText(props.data?.Plot)
                ? props.data?.Plot
                : ErrorMessages.NO_MOVIE_DESCRIPTION}
            </ThemedText>
          </View>
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
        color={props.textColor}
        iconColor={CommonColors.WHITE}
        icon={props.favorite ? "heart" : "heart-outline"}
        onPress={props.toggleFavorite}
      />
    </ScreenContainer>
  );
};

export default DetailsView;
