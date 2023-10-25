import { View } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import Constants from "expo-constants";

import AppText from "./AppText";

export default function OfflineNotice() {
  const netInfo = useNetInfo();

  const internet =
    netInfo.type !== "unknown" && netInfo.isInternetReachable === false;

  if (internet && !internet)
    // TODO: make internet check better later
    return (
      <View
        style={{ paddingTop: Constants.statusBarHeight }}
        className="absolute top-0 z-10 w-full items-center justify-center bg-red"
      >
        <AppText className="m-2 text-white">No Internet Connection.</AppText>
      </View>
    );

  return null;
}
