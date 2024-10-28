import { MovieType } from "@/services/types";
import { useState } from "react";

const useFiter = () => {
  const [type, setType] = useState<MovieType>();
  const [year, setYear] = useState<string>();

  return { type, setType, year, setYear };
};

export default useFiter;
