import { View, Image } from "react-native";

import { ScreenContainer, ImageGrid, ThemedText } from "@/components";
import { ErrorMessages } from "@/constants";
import NoResult from "@/assets/images/no-result.png";
import styles from "./styles";
import type { FavoritesViewProps } from "./types";
import { isEmpty } from "@/utils/validation";

const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  getFavorites,
  deleteFavorites,
  deleteWarning,
  refreshing,
}) => {
  return (
    <ScreenContainer
      title="Favoriler"
      icon="trash-outline"
      action={favorites ? deleteFavorites : deleteWarning}
    >
      {favorites && !isEmpty(favorites) ? (
        <ImageGrid
          data={favorites}
          refetch={getFavorites}
          refreshing={refreshing}
        />
      ) : (
        <View style={styles.noData}>
          <Image source={NoResult} style={styles.image} />
          <ThemedText>{ErrorMessages.NO_FAVORITE_DATA}</ThemedText>
        </View>
      )}
    </ScreenContainer>
  );
};

export default FavoritesView;
