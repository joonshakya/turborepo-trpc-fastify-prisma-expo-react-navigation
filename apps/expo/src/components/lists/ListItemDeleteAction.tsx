import { View, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";

interface ListItemDeleteActionProps {
  onPress: () => void;
}

export default function ListItemDeleteAction({
  onPress,
}: ListItemDeleteActionProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View className="w-16 items-center justify-center bg-danger">
        <MaterialCommunityIcons
          name="trash-can"
          size={35}
          color={colors.white}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
