import { Platform } from "react-native";
import { StackAnimationTypes } from "react-native-screens";

export const animation: StackAnimationTypes =
  Platform.OS === "ios" ? "slide_from_right" : "fade_from_bottom";
