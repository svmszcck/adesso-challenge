import { create } from "zustand";

const useMockStore = create((set) => ({
  searchValue: "love",
  setSearchValue: jest.fn((value) => set({ searchValue: value })),
  setType: jest.fn(),
  setYear: jest.fn(),
}));

export default useMockStore;
