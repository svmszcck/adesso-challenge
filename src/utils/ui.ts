import { Alert, Dimensions } from "react-native";

export const screenWidth = () => Dimensions.get("window").width;
export const screenHeight = () => Dimensions.get("window").width;

export const showAlert = (title: string, content?: string): void => {
  Alert.alert(title, content, [
    { text: "Tamam", onPress: () => console.log("OK Pressed") },
  ]);
};
