import React, { PropsWithChildren } from "react";
import { View, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import Modal from "react-native-modal";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useThemeColor } from "@/hooks/useThemeColor";
import { CommonColors } from "@/constants";

type CustomModalProps = {
  visible: boolean;
  onClose: () => void;
  style?: ViewStyle;
  fullScreen?: boolean;
};

const CustomModal: React.FC<PropsWithChildren<CustomModalProps>> = ({
  style,
  visible,
  onClose,
  children,
  fullScreen,
}) => {
  const textPaleColor = useThemeColor({}, "textPale");
  const backgroundColor = useThemeColor({}, "background");

  const renderCloseButton = () => {
    return (
      <TouchableOpacity
        style={styles.close}
        onPress={onClose}
        hitSlop={5}
        accessibilityLabel="Diyalog ekranını kapat"
        accessibilityHint="Diyalog ekranını kapatır ve önceki ekrana yönlendirir"
        accessibilityRole="button"
      >
        <Ionicons
          name="close"
          size={32}
          color={fullScreen ? CommonColors.WHITE : textPaleColor}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={[
        styles.view,
        {
          height: fullScreen ? "100%" : "auto",
          justifyContent: fullScreen ? "center" : "flex-end",
        },
        style,
      ]}
      backdropOpacity={fullScreen ? 1 : 0.5}
      useNativeDriver
      accessibilityViewIsModal
      accessibilityLabel="Diyalog Ekranı"
    >
      {fullScreen && renderCloseButton()}
      <View style={{ height: fullScreen ? "100%" : null }} accessible>
        <View
          style={
            !fullScreen && [
              styles.content,
              {
                backgroundColor,
              },
            ]
          }
          accessible
          accessibilityHint="Diyalog Ekranı İçeriği"
        >
          {children}
        </View>
        {!fullScreen && renderCloseButton()}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 0,
    position: "relative",
  },
  content: {
    position: "relative",
    backgroundColor: CommonColors.WHITE,
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  close: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1,
  },
});

export default CustomModal;
