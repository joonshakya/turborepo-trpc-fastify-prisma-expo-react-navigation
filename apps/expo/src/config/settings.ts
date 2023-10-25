import Constants from "expo-constants";

const apiUrl = "https://www.example.com";

export const storageDomain = "https://www.example.com";

const settings = {
  dev: {
    apiUrl,
  },
  staging: {
    apiUrl,
  },
  prod: {
    apiUrl,
  },
};

const getCurrentSettings = () => {
  // eslint-disable-next-line no-undef
  if (__DEV__) return settings.dev;
  if (Constants?.manifest?.releaseChannel === "staging")
    return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
