import { Text } from "react-native";
import { RouteProp } from "@react-navigation/native";

import Screen from "../components/Screen";
import routes from "../navigation/routes";
import { AppNavigatorParamList } from "../navigation/AppNavigator";

export default function InnerScreen({
  route,
}: {
  route: RouteProp<AppNavigatorParamList, routes.INNER>;
}) {
  const { title } = route.params;
  return (
    <Screen noSafeArea className="p-5">
      <Text className="text-justify text-mediumGray text-base font-bold my-2">
        Title: {title}
      </Text>
    </Screen>
  );
}
