import { useState } from "react";

const useFiter = () => {
  const [type, setType] = useState<string>();
  const [year, setYear] = useState<string>();

  return { type, setType, year, setYear };
};

export default useFiter;
