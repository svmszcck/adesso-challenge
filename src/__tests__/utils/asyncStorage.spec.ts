import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  saveData,
  loadData,
  clearData,
  itemExists,
  addItem,
  removeItem,
} from "@/utils/asyncStorage";
import { MovieGridItem } from "@/services/types";

jest.mock("@react-native-async-storage/async-storage");

describe("AsyncStorage Utility Functions", () => {
  const key = "testKey";
  const item: MovieGridItem = {
    imdbID: "1",
    Title: "Test Movie",
    Poster: "http://valid.url/image.jpg",
  };

  const item2 = {
    imdbID: "2",
    Title: "Another Movie",
    Poster: "http://valid.url/image2.jpg",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("saveData should save data to AsyncStorage", async () => {
    await saveData(key, item);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(item)
    );
  });

  test("loadData should load data from AsyncStorage", async () => {
    const mockData = JSON.stringify(item);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(mockData);

    const result = await loadData(key);

    expect(result).toEqual(item);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(key);
  });

  test("loadData should return undefined if no data is found", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const result = await loadData(key);

    expect(result).toBeUndefined();
  });

  test("clearData should clear data from AsyncStorage", async () => {
    await clearData(key);

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(key);
  });

  test("itemExists should return true if item exists", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify([item])
    );

    const result = await itemExists(key, item.imdbID);

    expect(result).toBe(true);
  });

  test("itemExists should return false if item does not exist", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify([{ imdbID: "2" }])
    );

    const result = await itemExists(key, item.imdbID);

    expect(result).toBe(false);
  });

  test("addItem should add an item to the storage", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify([item])
    );

    await addItem(key, item2);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify([item, item2])
    );
  });

  test("addItem should create a new array if storage is empty", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    await addItem(key, item);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify([item])
    );
  });

  test("removeItem should remove an item from storage", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify([item, item2])
    );

    await removeItem(key, item.imdbID);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify([item2])
    );
  });

  test("removeItem should do nothing if the item does not exist", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify([item2])
    );

    await removeItem(key, item.imdbID);

    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  });
});
