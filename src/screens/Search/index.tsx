import React, { useState } from "react";
import { router } from "expo-router";

import useStore from "@/store";
import useFiter from "@/hooks/useFilter";
import { Routes } from "@/constants";
import SearchView from "./view";

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
    <SearchView
      {...{
        defaultValue: searchValue,
        value,
        setValue,
        localType,
        setLocalType,
        localYear,
        setLocalYear,
        handleSearch,
      }}
    />
  );
};

export default Search;