import React from "react";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";

import {
  Button,
  Filter,
  ScreenContainer,
  SearchBar,
  ThemedText,
} from "@/components";
import { normalizeFilterText } from "@/utils/data";
import styles from "./styles";
import type { SearchViewProps } from "./types";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CommonColors } from "@/constants";

const SearchView: React.FC<SearchViewProps> = (props) => {
  return (
    <ScreenContainer title="Arama">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <SearchBar
            placeholder="Arama Yapın..."
            defaultValue={props.defaultValue}
            value={props.value}
            setValue={props.setValue}
            onSubmit={props.handleSearch}
          />
          <ThemedText type="defaultSemiBold" style={styles.filter}>
            Aramaya filtre eklemek ister misin?
          </ThemedText>
          <Filter
            type={props.localType}
            setType={props.setLocalType}
            year={props.localYear}
            setYear={props.setLocalYear}
            onClear={props.resetFilters}
          />
          {(props.localType || props.localYear) && (
            <View style={styles.filterPanel}>
              <ThemedText style={{ color: CommonColors.BLACK }}>
                Seçilen Filtreler:
              </ThemedText>
              <ThemedText style={{ color: CommonColors.BLACK }}>
                {normalizeFilterText(props.localType, props.localYear)}
              </ThemedText>
            </View>
          )}
          <Button
            title="Arama Yap"
            onPress={props.handleSearch}
            style={styles.submitButton}
            testID="search-button"
          />
        </View>
      </TouchableWithoutFeedback>
    </ScreenContainer>
  );
};

export default SearchView;
