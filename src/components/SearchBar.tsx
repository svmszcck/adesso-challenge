import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type SearchProps = {
  placeholder?: string;
  onSubmit: (value: string) => void;
};

const SearchBar: React.FC<SearchProps> = ({ placeholder, onSubmit }) => {
  const [value, setValue] = useState<string>("");

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="black" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={(value) => setValue(value)}
        placeholderTextColor="#aaa"
        onSubmitEditing={() => onSubmit(value)}
        selectionColor={"black"}
        clearButtonMode="always"
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
