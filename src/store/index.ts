import { MovieType } from "@/services/types";
import { create } from "zustand";

type Store = {
  type: MovieType | undefined;
  year: string | undefined;
  searchValue: string | undefined;
  setType: (type: MovieType) => void;
  setYear: (year: string) => void;
  setSearchValue: (searchValue: string) => void;
  resetFilters: () => void;
};

const useStore = create<Store>((set) => ({
  type: undefined,
  year: undefined,
  searchValue: undefined,
  setType: (type) => set({ type }),
  setYear: (year) => set({ year }),
  setSearchValue: (searchValue) => set({ searchValue }),
  resetFilters: () => set({ type: undefined, year: undefined }),
}));

export default useStore;
