import { LogBox } from "react-native";
import { Redirect } from "expo-router";

LogBox.ignoreLogs(["Require cycle:"]);

const Index = () => {
  return <Redirect href="/(home)" />;
};
export default Index;
