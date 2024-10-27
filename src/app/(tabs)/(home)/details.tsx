import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";

import { ScreenContainer, ThemedText, Image, ErrorUI } from "@/components";

import { useThemeColor } from "@/hooks/useThemeColor";
import { fetchMovie } from "@/services/movieService";
import FloatingButton from "@/components/FloatingButton";
import { white } from "@/constants/colors";
import { updateImageSize } from "@/utils/data";
import ImageModal from "@/utils/modals/ImageModal";
import { itemExists, addItem, removeItem } from "@/utils/asyncStorage";
import { showAlert } from "@/utils/ui";

const Details = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const textColor = useThemeColor({}, "text");
  const params = useLocalSearchParams<{ id: string }>();
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["movie", params.id],
    queryFn: () => fetchMovie(params.id),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    checkFavorite();
  }, [data]);

  const checkFavorite = async () => {
    if (!data) return;

    const result = await itemExists("movies", data?.imdbID);

    setFavorite(result === true);
  };

  const toggleFavorite = () => {
    if (!data) return;

    const { Title, imdbID, Poster } = data;

    if (favorite) {
      removeItem("movies", data.imdbID);
      setFavorite(false);

      showAlert("Movie was removed from the favorites");
    } else {
      const parsedData = { Title, imdbID, Poster };

      addItem("movies", parsedData);
      setFavorite(true);

      showAlert("Movie was added to the favorites");
    }
  };

  const imageURL = useMemo(
    () => (data?.Poster ? updateImageSize(data.Poster, 1200) : undefined),
    [data?.Poster]
  );

  if (error) return <ErrorUI />;

  return (
    <ScreenContainer style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          color="black"
          size={30}
          style={styles.loadingSpinner}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 70 }}
        >
          <View>
            {data?.Poster && (
              <Pressable onPress={() => setModalVisible(true)}>
                <Image src={imageURL} style={styles.image} withGradient />
                <LinearGradient
                  colors={["rgba(0, 0, 0, 0.2)", "rgba(0, 0, 0, 0.2)"]}
                  style={styles.overlay}
                />
              </Pressable>
            )}
            <Ionicons
              name="chevron-back"
              size={26}
              color="white"
              style={{ position: "absolute", top: 20, left: 20 }}
              onPress={() => router.back()}
            />
          </View>
          <View style={{ padding: 20 }}>
            <ThemedText type="title">Movie Title</ThemedText>
            <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
              <View style={styles.subTitle}>
                <ThemedText>IMDb ID: </ThemedText>
                <ThemedText isPale style={styles.subTitleText}>
                  {data?.imdbID}
                </ThemedText>
              </View>
              <ThemedText>|</ThemedText>
              <View style={styles.subTitle}>
                <ThemedText>Year: </ThemedText>
                <ThemedText isPale style={styles.subTitleText}>
                  {data?.Year}
                </ThemedText>
              </View>
            </View>

            <ThemedText isPale>{data?.Plot}</ThemedText>
          </View>
          {data && (
            <ImageModal
              src={imageURL || data.Poster}
              visible={isModalVisible}
              onClose={() => setModalVisible(false)}
            />
          )}
        </ScrollView>
      )}
      {!error && (
        <FloatingButton
          color={textColor}
          iconColor={white}
          icon={favorite ? "heart" : "heart-outline"}
          onPress={toggleFavorite}
        />
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  loadingSpinner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
    objectFit: "cover",
  },
  subTitle: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 22,
  },
  subTitleText: {
    fontSize: 15,
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

export default Details;
