import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useThemeColor } from "@/hooks/useThemeColor";
import { movieTypes, FontSize, Spacing } from "@/constants";
import ListModal from "@/utils/modals/ListModal";
import { Button, ThemedText } from "@/components";
import { MovieType } from "@/services/types";
import { generateYearRange, normalizeListData } from "@/utils/data";

type FilterProps = {
  onClear?: () => void;
  type: string | undefined;
  setType: (value: MovieType) => void;
  year: string | undefined;
  setYear: (value: string) => void;
};

const Filter: React.FC<FilterProps> = ({
  type,
  setType,
  year,
  setYear,
  onClear,
}) => {
  const textPaleColor = useThemeColor({}, "textPale");
  const [typeModal, setTypeModal] = useState<boolean>(false);
  const [yearModal, setYearModal] = useState<boolean>(false);

  const onSelectType = (value: string) => {
    setType(value as MovieType);
    setTypeModal(false);
  };

  const onSelectYear = (value: string) => {
    setYear(value);
    setYearModal(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.option}
        activeOpacity={0.5}
        onPress={() => setTypeModal(true)}
      >
        <ThemedText type="default" style={styles.optionText} isPale>
          Tür
        </ThemedText>
        <Ionicons name="chevron-down" size={20} color={textPaleColor} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        activeOpacity={0.5}
        onPress={() => setYearModal(true)}
      >
        <ThemedText type="default" style={styles.optionText} isPale>
          Yayınlanma Yılı
        </ThemedText>
        <Ionicons name="chevron-down" size={20} color={textPaleColor} />
      </TouchableOpacity>

      {onClear && (type || year) && (
        <Button title="Sıfırla" onPress={onClear} isSmall />
      )}

      <ListModal
        visible={typeModal}
        title="Tür Seçerek Filtrele"
        data={movieTypes}
        onClose={() => setTypeModal(false)}
        onSelect={onSelectType}
        selected={type}
      />
      <ListModal
        visible={yearModal}
        title="Yıl Seçerek Filtrele"
        data={normalizeListData(generateYearRange(1950))}
        onClose={() => setYearModal(false)}
        onSelect={onSelectYear}
        selected={year}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: Spacing.SMALL,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: Spacing.MEDIUM,
  },
  optionText: {
    marginRight: 5,
    lineHeight: 20,
  },
  contentTitle: {
    fontSize: FontSize.LARGE,
    textAlign: "center",
  },
  modalTitle: {
    marginBottom: 50,
  },
  modalListItem: {
    width: "100%",
  },
  separator: {
    width: "100%",
    height: 1,
    marginVertical: Spacing.LARGE,
  },
});

export default Filter;
