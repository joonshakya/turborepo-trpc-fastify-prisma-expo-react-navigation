import { TouchableHighlight } from "react-native";

import colors from "../config/colors";
import AppText from "./AppText";

interface AppButtonProps {
  onPress: () => void;
  title: string;
  color?: string;
  textColor?: string;
  underlayColor?: string;
  className?: string;
  style?: Object;
  disabled?: boolean;
}

export default function AppButton({
  title,
  onPress,
  color = "bg-light",
  textColor = "text-primary",
  underlayColor = colors.highlight,
  className,
  style,
  disabled = false,
}: AppButtonProps) {
  return (
    <TouchableHighlight
      underlayColor={underlayColor}
      className={`${color} my-2 h-12 items-center justify-center rounded-xl ${className} ${
        disabled ? "opacity-50" : ""
      }`}
      style={style}
      onPress={disabled ? undefined : onPress}
    >
      <AppText
        className={`text-center text-sm font-bold uppercase ${textColor}`}
      >
        {title}
      </AppText>
    </TouchableHighlight>
  );
}
