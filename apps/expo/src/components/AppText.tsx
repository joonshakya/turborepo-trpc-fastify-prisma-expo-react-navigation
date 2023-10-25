import { ReactNode } from "react";
import { Text, TextInputProps } from "react-native";

import defaultStyles from "../config/styles";

interface AppTextProps extends TextInputProps {
  children: ReactNode;
  style?: Object;
  bigText?: boolean;
}

export default function AppText({
  children,
  style,
  bigText,
  ...otherProps
}: AppTextProps) {
  return (
    <Text
      className={`${bigText ? "pt-2 text-3xl" : ""}`}
      style={[defaultStyles.text, style]}
      {...otherProps}
    >
      {children}
    </Text>
  );
}
