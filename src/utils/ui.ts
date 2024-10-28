import { Alert, Dimensions } from "react-native";

export const screenWidth = () => Dimensions.get("window").width;
export const screenHeight = () => Dimensions.get("window").width;

export const showAlert = (
  title: string,
  content?: string,
  action?: () => void
): void => {
  const buttons = [];

  if (action)
    buttons.push({
      text: "İptal",
      onPress: () => console.log("Cancel Pressed"),
    });

  buttons.push({ text: "Tamam", onPress: () => action?.() });

  Alert.alert(title, content, buttons, { cancelable: true });
};
