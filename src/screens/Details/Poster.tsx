import React from "react";
import { Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Image } from "@/components";
import { isValidText } from "@/utils/validation";
import { CommonColors, FontSize } from "@/constants";
import styles from "./styles";
import type { PosterProps } from "./types";

const Poster: React.FC<PosterProps> = ({ data, imageURL, setModalVisible }) => {
  return (
    <View>
      {data?.Poster && (
        <Pressable onPress={() => setModalVisible(true)}>
          <Image src={imageURL} style={styles.image} withGradient />
          {isValidText(data.imdbRating) && isValidText(data.imdbVotes) && (
            <View style={styles.rating}>
              <Ionicons
                name="star"
                size={26}
                color={CommonColors.YELLOW}
                onPress={() => router.back()}
              />
              <Text style={[styles.ratingText, { fontSize: FontSize.LARGE }]}>
                {data.imdbRating}/10
              </Text>
              <Text style={[styles.ratingText, { fontSize: FontSize.XXSMALL }]}>
                ({data.imdbVotes} Oylama)
              </Text>
            </View>
          )}
        </Pressable>
      )}
      <Pressable
        hitSlop={10} // This makes UX better by adding extra space for clickable area
        style={styles.backIcon}
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back" size={32} color={CommonColors.WHITE} />
      </Pressable>
    </View>
  );
};

export default Poster;
