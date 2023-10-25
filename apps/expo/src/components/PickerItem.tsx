import { TouchableHighlight } from "react-native";
import colors from "../config/colors";

import AppText from "./AppText";

interface PickerItemProps {
  item: { label: string };
  onPress: () => void;
}

export default function PickerItem({ item, onPress }: PickerItemProps) {
  return (
    <TouchableHighlight
      className="p-4"
      underlayColor={colors.lightGray}
      onPress={onPress}
    >
      <AppText>{item.label}</AppText>
    </TouchableHighlight>
  );
}
