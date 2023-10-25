import { TouchableHighlight } from "react-native";
import colors from "../config/colors";

import AppText from "./AppText";
import { Item } from "./models";

interface CategoryPickerItemProps {
  item: Item;
  onPress: () => void;
}

export default function CategoryPickerItem({
  item,
  onPress,
}: CategoryPickerItemProps) {
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
