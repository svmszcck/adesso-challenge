import React, { useState, memo } from "react";
import { View, Image, StyleSheet, StyleProp, ImageStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { checkURL } from "@/utils/validation";
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
  const isValidURL = src ? checkURL(src) : false;

  return (
    <View>
      {loading && (
        <Image
          source={Placeholder}
          style={[styles.placeholder, style]}
          resizeMode="cover"
          testID="placeholder-image"
          accessibilityLabel="Varsayılan resim"
          accessible
        />
      )}
      <Image
        source={isValidURL ? { uri: src } : Placeholder}
        style={style}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        defaultSource={Placeholder}
        resizeMode="cover"
        testID="custom-image"
        accessibilityLabel={isValidURL ? "Yüklenen resim" : "Varsayılan resim"}
        accessible
      />
      {withGradient && isValidURL && (
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.2)", "rgba(0, 0, 0, 0.8)"]}
          style={styles.overlay}
          testID="gradient"
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
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
  },
});

export default CustomImage;
