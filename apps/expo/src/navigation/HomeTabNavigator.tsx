import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import defaultStyles from "../config/styles";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import routes from "./routes";

export type HomeTabNavigatorParamList = {
  [routes.HOME]: undefined;
  [routes.SETTINGS]: undefined;
};

interface TabIconProps {
  color: string;
  size: number;
}

const tabHomeIcon = ({ color, size }: TabIconProps) => (
  <MaterialCommunityIcons color={color} name="home" size={size} />
);
const tabSettingsIcon = ({ color, size }: TabIconProps) => (
  <Ionicons name="md-settings-sharp" size={size} color={color} />
);

export default function HomeTabNavigator() {
  const Tab = createBottomTabNavigator<HomeTabNavigatorParamList>();
  // useNotifications();

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: defaultStyles.headerStyle,
        headerShown: true,
      }}
    >
      <Tab.Screen
        component={HomeScreen}
        name={routes.HOME}
        options={{
          tabBarIcon: tabHomeIcon,
        }}
      />
      <Tab.Screen
        component={SettingsScreen}
        name={routes.SETTINGS}
        options={{
          title: "Settings",
          tabBarIcon: tabSettingsIcon,
        }}
      />
    </Tab.Navigator>
  );
}
