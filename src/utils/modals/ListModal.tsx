import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ListRenderItem,
  FlatList,
} from "react-native";

import { Modal, ThemedText } from "@/components";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CommonColors, FontSize } from "@/constants";

export type ListItem = {
  title: string;
  value: string;
};

type ListModalProps = {
  data: ListItem[];
  visible: boolean;
  onClose: () => void;
  onSelect: (value: string) => void;
  title?: string;
  selected?: string;
};

const ListModal: React.FC<ListModalProps> = ({
  title,
  data,
  onSelect,
  visible,
  onClose,
  selected,
}) => {
  const separatorColor = useThemeColor({}, "separator");
  const activityIndicatorColor = useThemeColor({}, "activityIndicator");

  const renderItem: ListRenderItem<ListItem> = ({ item }) => (
    <TouchableOpacity
      style={styles.modalListItem}
      hitSlop={10}
      onPress={() => onSelect(item.value)}
    >
      <ThemedText
        style={[
          styles.contentTitle,
          {
            color:
              selected === item.value
                ? CommonColors.RED
                : activityIndicatorColor,
          },
        ]}
      >
        {item.title}
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} onClose={onClose}>
      {title && (
        <ThemedText
          type="subtitle"
          style={[styles.modalTitle, { color: activityIndicatorColor }]}
        >
          {title}
        </ThemedText>
      )}

      <FlatList
        data={data}
        renderItem={renderItem}
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View
            style={[styles.separator, { backgroundColor: separatorColor }]}
          />
        )}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalTitle: {
    marginBottom: 50,
  },
  modalListItem: {
    width: "100%",
  },
  listContainer: {
    width: "100%",
    maxHeight: 400,
  },
  contentTitle: {
    fontSize: FontSize.LARGE,
    textAlign: "center",
  },
  separator: {
    width: "100%",
    height: 1,
    marginVertical: 20,
  },
});

export default ListModal;
