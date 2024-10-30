import { MovieType } from "@/services/types";
import { useState } from "react";

const useFiter = () => {
  const [type, setType] = useState<MovieType>();
  const [year, setYear] = useState<string>();

  const resetFilters = () => {
    setType(undefined);
    setYear(undefined);
  };

  return { type, setType, year, setYear, resetFilters };
};

export default useFiter;
