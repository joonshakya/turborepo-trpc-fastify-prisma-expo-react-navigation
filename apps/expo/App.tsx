import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";
import { NavigationContainer } from "@react-navigation/native";
import { NativeWindStyleSheet } from "nativewind";

import { TRPCProvider } from "~/utils/api";
import OfflineNotice from "./src/components/OfflineNotice";
import AppNavigator from "./src/navigation/AppNavigator";
import navigationTheme from "./src/navigation/navigationTheme";
import { navigationRef } from "./src/navigation/routeNavigation";

LogBox.ignoreLogs(["Could not find image"]);

NativeWindStyleSheet.setOutput({
  default: "native",
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  return (
    <TRPCProvider>
      <OfflineNotice />
      <NavigationContainer theme={navigationTheme} ref={navigationRef}>
        <GestureHandlerRootView className="flex-1 bg-black">
          <AppNavigator />
        </GestureHandlerRootView>
      </NavigationContainer>
    </TRPCProvider>
  );
}
