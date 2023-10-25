import { View } from "react-native";
import colors from "../../config/colors";

export default function ListItemSeparator({
  height,
  color,
}: {
  height?: number;
  color?: string;
}) {
  return (
    <View
      style={{
        height: height || 0.5,
        width: "100%",
        backgroundColor: color || colors.lightGray2,
      }}
    />
  );
}
