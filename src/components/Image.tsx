import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  StyleProp,
  ImageStyle,
  ImageSourcePropType,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { isValidUrl } from "@/utils/data";
import Placeholder from "@/assets/images/placeholder.jpg";

type CustomImageProps = {
  src?: string;
  withGradient?: boolean;
  style?: StyleProp<ImageStyle>;
};

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  style,
  withGradient,
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <View>
      {loading && (
        <Image
          source={Placeholder}
          style={[styles.placeholder, style]}
          resizeMode="cover"
        />
      )}
      <Image
        source={isValidUrl(src) ? { uri: src } : Placeholder}
        style={style}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        defaultSource={Placeholder}
        resizeMode="cover"
      />
      {withGradient && !loading && isValidUrl(src) && (
        <LinearGradient
          colors={["transparent", "#000000"]}
          style={styles.gradient}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 80,
  },
});

export default CustomImage;
