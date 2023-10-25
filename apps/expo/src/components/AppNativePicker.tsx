import { ReactNode } from "react";
import { Platform, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppPickerCustom from "./AppPickerCustom";

import AppText from "./AppText";
import colors from "../config/colors";

export interface Item {
  value: string;
  label: string;
}

export default function AppNativePicker({
  items,
  onItemSelect,
  my0,
  selectedItem,
  label,
  icon,
  children,
  className,
  style,
  noPlaceholder,
}: {
  items: Item[];
  onItemSelect: (item: Item) => void;
  my0?: boolean;
  selectedItem: string;
  label?: string;
  icon?: string;
  children?: ReactNode;
  className?: string;
  style?: Object;
  noPlaceholder?: boolean;
}) {
  const handleItemSelect = (value: string) => {
    onItemSelect(items.find((item) => item.value === value) || items[0]);
  };

  return (
    <View className={className} style={style}>
      {label ? (
        <AppText className="mx-3 mt-2 text-sm text-mediumGray">{label}</AppText>
      ) : null}
      <View
        accessibilityHint="Click to open the picker"
        className={`w-full rounded-xl border-2 border-light ${
          my0 ? "my-0" : "my-2"
        } ${Platform.OS === "android" ? "py-1" : "px-0"}`}
      >
        <AppPickerCustom
          pickerProps={{ mode: "dropdown" }}
          useNativeAndroidPickerStyle
          value={selectedItem}
          onValueChange={handleItemSelect}
          items={items}
          placeholder={noPlaceholder ? {} : undefined}
        >
          <View className="flex-row items-center">
            {icon && (
              <View className="mx-2">
                <MaterialCommunityIcons
                  color={colors.mediumGray}
                  name={icon as any}
                  size={20}
                />
              </View>
            )}
            {children || (
              <AppText className="flex-1 p-3 px-4">
                {items.find((item) => item.value === selectedItem)?.label}
              </AppText>
            )}
            <View className="mx-2">
              <MaterialCommunityIcons
                color={colors.mediumGray}
                name="chevron-down"
                size={20}
              />
            </View>
          </View>
        </AppPickerCustom>
      </View>
    </View>
  );
}
