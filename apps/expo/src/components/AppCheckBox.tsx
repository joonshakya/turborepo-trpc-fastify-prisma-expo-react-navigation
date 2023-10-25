import { View } from "react-native";
import CheckBox from "expo-checkbox";
import AppText from "./AppText";
import colors from "../config/colors";

export default function AppCheckBox({
  my0,
  label,
  value,
  onValueChange,
  ...otherProps
}: {
  my0?: boolean;
  label: string;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
}) {
  return (
    <View className={`flex-row items-center ${my0 ? "my-0" : "my-0"}`}>
      <CheckBox
        className="m-2"
        color={colors.primary}
        value={value}
        onValueChange={onValueChange}
        {...otherProps}
      />
      <AppText>{label}</AppText>
    </View>
  );
}
