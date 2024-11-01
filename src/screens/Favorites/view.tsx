import { View, Image } from "react-native";

import ScreenContainer from "@/components/ScreenContainer";
import ImageGrid from "@/components/ImageGrid";
import ThemedText from "@/components/ThemedText";
import ErrorMessages from "@/constants/errorMessages";
import { isEmpty } from "@/utils/validation";
import NoResult from "@/assets/images/no-result.png";
import styles from "./styles";
import type { FavoritesViewProps } from "./types";

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
