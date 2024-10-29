import React from "react";
import { ScrollView, ActivityIndicator } from "react-native";

import { ScreenContainer, FloatingButton } from "@/components";
import ImageModal from "@/utils/modals/ImageModal";
import { useThemeColor } from "@/hooks/useThemeColor";
import Poster from "./Poster";
import Info from "./Info";
import styles from "./styles";
import type { DetailsViewProps } from "./types";

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
          <Poster
            data={props.data}
            imageURL={props.imageURL}
            setModalVisible={props.setModalVisible}
          />
          <Info data={props.data} />
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
