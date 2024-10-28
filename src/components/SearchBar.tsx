import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CommonColors, FontSize } from "@/constants";

type SearchProps = {
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  defaultValue?: string;
  onSubmit?: () => void;
};

const SearchBar: React.FC<SearchProps> = ({
  value,
  setValue,
  placeholder,
  onSubmit,
  defaultValue,
}) => {
  return (
    <View style={styles.container} accessible={true} accessibilityRole="search">
      <Ionicons
        name="search"
        size={20}
        color={CommonColors.BLACK}
        style={styles.icon}
        accessibilityLabel="Search icon"
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholderTextColor={CommonColors.GRAY_DARK}
        onSubmitEditing={onSubmit}
        selectionColor={CommonColors.BLACK}
        defaultValue={defaultValue}
        accessibilityLabel="Arama metni girişi"
        accessibilityHint="Arama metnini buraya girin"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CommonColors.GRAY_LIGHT,
    borderRadius: 25,
    paddingHorizontal: 10,
    height: 40,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: FontSize.XSMALL,
    color: CommonColors.BLACK,
  },
});

export default SearchBar;
