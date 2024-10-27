import React from "react";
import { StyleSheet } from "react-native";

import Modal from "@/components/Modal";
import CustomImage from "@/components/Image";

type ImageModalProps = {
  visible: boolean;
  onClose: () => void;
  src: string;
};

const ImageModal: React.FC<ImageModalProps> = ({ visible, onClose, src }) => {
  return (
    <Modal visible={visible} onClose={onClose} fullScreen>
      <CustomImage src={src} style={styles.image} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
});

export default ImageModal;
