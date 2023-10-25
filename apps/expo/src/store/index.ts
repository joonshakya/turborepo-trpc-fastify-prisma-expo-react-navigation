import { create } from "zustand";
import authStorage from "../auth/storage";

export const langToIndex = {
  en: 0,
  np: 1,
} as const;

interface BearState {
  language: keyof typeof langToIndex;
  setLanguage: (language: keyof typeof langToIndex) => void;
}

export const useBearStore = create<BearState>()((set) => ({
  language: "en",
  setLanguage: (language) => {
    authStorage.setLanguage(language);
    set({ language });
  },
}));
