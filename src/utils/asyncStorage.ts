import { MovieGridItem } from "@/services/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (key: string, data: unknown): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(data);

    await AsyncStorage.setItem(key, jsonValue);

    console.log("Data saved successfully!");
  } catch (e) {
    console.error("Failed to save data:", e);
  }
};

export const loadData = async (key: string): Promise<unknown> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);

    return jsonValue != null ? JSON.parse(jsonValue) : undefined;
  } catch (e) {
    console.error("Failed to load data:", e);
    return [];
  }
};

export const clearData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);

    console.log("Data cleared successfully!");
  } catch (e) {
    console.error("Failed to clear data:", e);
  }
};

export const itemExists = async (key: string, id: string): Promise<boolean> => {
  try {
    const currentData = await loadData(key);

    if (Array.isArray(currentData)) {
      return currentData.some((item) => item.imdbID === id);
    }

    return false;
  } catch (e) {
    console.error("Failed to check item existence:", e);
    return false;
  }
};

export const addItem = async (
  key: string,
  item: MovieGridItem
): Promise<void> => {
  try {
    const currentData = (await loadData(key)) as MovieGridItem[];

    if (currentData && Array.isArray(currentData)) {
      const updatedData = [...currentData, item];
      await saveData(key, updatedData);
    } else {
      await saveData(key, [item]);
    }

    console.log("Item added successfully!");
  } catch (e) {
    console.error("Failed to add item:", e);
  }
};

export const removeItem = async (key: string, id: string): Promise<void> => {
  try {
    const currentData = await loadData(key);
    if (Array.isArray(currentData)) {
      const updatedData = currentData.filter((item) => item.imdbID !== id);

      await saveData(key, updatedData);
      console.log("Item removed successfully!");
    }
  } catch (e) {
    console.error("Failed to remove item:", e);
  }
};
