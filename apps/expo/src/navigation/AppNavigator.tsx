import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { animation } from "../config/animation";
import defaultStyles from "../config/styles";
import InnerScreen from "../screens/InnerScreen";
import HomeTabNavigator, {
  HomeTabNavigatorParamList,
} from "./HomeTabNavigator";
import routes from "./routes";

type HomeTabParamList = {
  [routes.HOME_TAB]: undefined;
};

type HomeParamList = {
  [routes.INNER]: {
    title: string;
  };
};

type MultipleScreensParamList = {};

export type AppNavigatorParamList = HomeTabParamList &
  HomeTabNavigatorParamList &
  HomeParamList &
  MultipleScreensParamList;

export default function AppNavigator() {
  const Stack = createNativeStackNavigator<AppNavigatorParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: defaultStyles.headerStyle,
        headerShown: false,
        animation,
      }}
    >
      {/* HomeTab */}
      <Stack.Screen component={HomeTabNavigator} name={routes.HOME_TAB} />
      {/* HomeTab End */}

      {/* Home */}
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        component={InnerScreen}
        name={routes.INNER}
      />
      {/* Home End */}

      {/* Multiple Screens */}

      {/* Multiple Screens End */}
    </Stack.Navigator>
  );
}
