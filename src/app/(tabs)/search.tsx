import React, { useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

import {
  Button,
  Filter,
  ScreenContainer,
  SearchBar,
  ThemedText,
} from "@/components";
import useFiter from "@/hooks/useFilter";
import useStore from "@/store";
import { CommonColors, Routes, Spacing } from "@/constants";
import { normalizeFilterText } from "@/utils/data";

const Search = () => {
  const { searchValue, setSearchValue, setType, setYear } = useStore();
  const [value, setValue] = useState<string>("");
  const {
    type: localType,
    setType: setLocalType,
    year: localYear,
    setYear: setLocalYear,
  } = useFiter();

  const handleSearch = (): void => {
    if (!value && !localType && !localYear) return;
    if (value) setSearchValue(value);
    if (localType) setType(localType);
    if (localYear) setYear(localYear);

    router.navigate(Routes.HOME);
  };

  return (
    <ScreenContainer title="Search">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <SearchBar
            placeholder="Arama Yapın..."
            defaultValue={searchValue}
            value={value}
            setValue={setValue}
            onSubmit={handleSearch}
          />
          <ThemedText type="defaultSemiBold" style={styles.filter}>
            Aramaya filtre eklemek ister misin?
          </ThemedText>
          <Filter
            type={localType}
            setType={setLocalType}
            year={localYear}
            setYear={setLocalYear}
          />
          {(localType || localYear) && (
            <View style={styles.filterPanel}>
              <ThemedText>Seçilen Filtreler:</ThemedText>
              <ThemedText>
                {normalizeFilterText(localType, localYear)}
              </ThemedText>
            </View>
          )}
          <Button
            title="Arama Yap"
            onPress={handleSearch}
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
    marginTop: Spacing.XLARGE,
    marginBottom: Spacing.SMALL,
  },
  filterPanel: {
    marginTop: Spacing.LARGE,
    padding: Spacing.SMALL,
    backgroundColor: CommonColors.GRAY_LIGHT,
    borderRadius: 20,
  },
  submitButton: {
    marginTop: Spacing.XXLARGE,
  },
});

export default Search;
