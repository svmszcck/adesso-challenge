import "dotenv/config";

export default {
  expo: {
    name: "adesso-challenge",
    slug: "adesso-challenge",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./src/assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/images/foreground.png",
        backgroundColor: "#ffffff",
      },
      softwareKeyboardLayoutMode: "pan",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./src/assets/images/favicon.png",
    },
    plugins: ["expo-router"],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      apiHost: process.env.EXPO_PUBLIC_API_HOST,
      apiKey: process.env.EXPO_PUBLIC_API_KEY,
      eas: {
        projectId: "8e1d232d-3985-4d7e-a7bc-235fa2342b93",
      },
    },
  },
};
