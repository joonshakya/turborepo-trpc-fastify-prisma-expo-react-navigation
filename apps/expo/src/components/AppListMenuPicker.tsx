import { ReactNode } from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";
import colors from "../config/colors";
import { Item } from "./AppNativePicker";
import AppPickerCustom from "./AppPickerCustom";

export default function AppListMenuPicker({
  items,
  onItemSelect,
  selectedItem,
  children,
  className,
  style,
  noPlaceholder,
}: {
  items: Item[];
  onItemSelect: (item: Item) => void;
  selectedItem: string;
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
      <View accessibilityHint="Click to open the picker">
        <AppPickerCustom
          pickerProps={{ mode: "dropdown" }}
          // useNativeAndroidPickerStyle
          value={selectedItem}
          onValueChange={handleItemSelect}
          items={items}
          placeholder={noPlaceholder ? {} : undefined}
        >
          <View className="flex-row items-center py-3 px-5">
            {children || (
              <>
                <AppText className="flex-1 text-base mr-2">
                  Model Dscription Language
                </AppText>
                <AppText className="text-mediumGray text-base">
                  {items.find((item) => item.value === selectedItem)?.label}{" "}
                </AppText>
              </>
            )}
            <View className="ml-1">
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
