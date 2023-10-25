import * as SecureStore from "expo-secure-store";
import { langToIndex } from "../store";

const key = "authToken";

const storeToken = async (authToken: string) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    throw new Error("Error storing the auth token");
  }
};

const setLanguage = async (language: keyof typeof langToIndex) => {
  try {
    await SecureStore.setItemAsync("language", language);
  } catch (error) {
    throw new Error("Error storing the language");
  }
};

const getLanguage = async (): Promise<keyof typeof langToIndex> => {
  try {
    const language = await SecureStore.getItemAsync("language");
    return (
      (language as keyof typeof langToIndex) ||
      ("en" as keyof typeof langToIndex)
    );
  } catch (error) {
    throw new Error("Error getting the language");
  }
};

export default {
  storeToken,
  getLanguage,
  setLanguage,
};
