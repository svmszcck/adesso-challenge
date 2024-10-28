import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CommonColors } from "@/constants";

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
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="black" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholderTextColor="#aaa"
        onSubmitEditing={onSubmit}
        selectionColor={CommonColors.BLACK}
        clearButtonMode="always"
        defaultValue={defaultValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    paddingHorizontal: 10,
    height: 40,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
});

export default SearchBar;
