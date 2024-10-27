import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";

import {
  Button,
  Filter,
  ScreenContainer,
  SearchBar,
  ThemedText,
  ThemedView,
} from "@/components";
import useFiter from "@/hooks/useFilter";
import useStore from "@/store";

const Search = () => {
  const { searchValue, setSearchValue } = useStore();
  const { type, setType, year, setYear } = useFiter();

  return (
    <ScreenContainer title="Search">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <SearchBar
            onSubmit={(value) => setSearchValue(value)}
            placeholder="Hjkjert"
          />
          <ThemedText type="defaultSemiBold" style={styles.filter}>
            Aramana filtre eklemek ister misin?
          </ThemedText>
          <Filter type={type} setType={setType} year={year} setYear={setYear} />
          <View style={styles.filterPanel}>
            <ThemedText>Seçilen Filtreler:</ThemedText>
            <ThemedText>Tür: Film, Yıl: 2016</ThemedText>
          </View>
          <Button
            title="Arama Yap"
            onPress={() => {}}
            style={styles.submitButton}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filter: {
    marginTop: 20,
    marginBottom: 10,
  },
  filterPanel: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginTop: 20,
  },
  submitButton: {
    marginTop: 50,
  },
});

export default Search;
