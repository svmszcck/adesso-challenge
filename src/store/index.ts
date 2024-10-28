import { MovieType } from "@/services/types";
import { create } from "zustand";

const DEFAULT_SEARCH_VALUE = "love";

type Store = {
  type: MovieType | undefined;
  year: string | undefined;
  searchValue: string;
  setType: (type: MovieType) => void;
  setYear: (year: string) => void;
  setSearchValue: (searchValue: string) => void;
  resetFilters: () => void;
};

const useStore = create<Store>((set) => ({
  type: undefined,
  year: undefined,
  searchValue: DEFAULT_SEARCH_VALUE,
  setType: (type) => set({ type }),
  setYear: (year) => set({ year }),
  setSearchValue: (searchValue) => set({ searchValue }),
  resetFilters: () => set({ type: undefined, year: undefined }),
}));

export default useStore;
