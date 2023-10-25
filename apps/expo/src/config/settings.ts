import Constants from "expo-constants";

const debuggerHost = Constants.expoConfig?.hostUri;
const localhost = debuggerHost?.split(":")[0];

const apiUrl = `http://${localhost}:3000`;

export const storageDomain = "https://www.example.com";

const settings = {
  dev: {
    apiUrl,
  },
  prod: {
    apiUrl: "https://api.example.com",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  return settings.prod;
};

export default getCurrentSettings();
