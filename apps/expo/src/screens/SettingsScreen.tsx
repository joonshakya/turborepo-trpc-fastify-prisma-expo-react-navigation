import * as WebBrowser from "expo-web-browser";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppListItems from "../components/AppListItems";
import Screen from "../components/Screen";
import colors from "../config/colors";

export default function SettingsScreen() {
  return (
    <Screen noSafeArea className="px-5">
      <AppListItems
        items={[
          {
            name: "About",
            options: [
              {
                title: "Version",
                subTitle: "1.0.0",
                // onPress: () => navigation.navigate(routes.ABOUT),
              },
              {
                title: "Privacy Policy",
                subTitle: (
                  <MaterialCommunityIcons
                    color={colors.mediumGray}
                    name="chevron-right"
                    size={20}
                  />
                ),
                onPress: () => {
                  WebBrowser.openBrowserAsync(
                    "https://www.example.com/privacy-policy",
                  );
                },
              },
            ],
          },
        ]}
      />
    </Screen>
  );
}
