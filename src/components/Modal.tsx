import React, { PropsWithChildren } from "react";
import { View, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import Modal from "react-native-modal";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useThemeColor } from "@/hooks/useThemeColor";

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

  const renderCloseButton = () => {
    return (
      <TouchableOpacity style={styles.close} onPress={onClose} hitSlop={5}>
        <Ionicons
          name="close"
          size={32}
          color={fullScreen ? "white" : textPaleColor}
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
          position: "relative",
        },
        style,
      ]}
      backdropOpacity={fullScreen ? 1 : 0.5}
      useNativeDriver
    >
      {fullScreen && renderCloseButton()}
      <View style={{ height: fullScreen ? "100%" : null }}>
        <View style={fullScreen ? null : styles.content}>{children}</View>
        {!fullScreen && renderCloseButton()}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 0,
  },
  content: {
    position: "relative",
    backgroundColor: "white",
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
