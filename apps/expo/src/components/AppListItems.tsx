import { ReactNode } from "react";
import { TouchableHighlight, View } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";
import { ListItemSeparator } from "./lists";

export default function AppListItems({
  items,
}: {
  items: {
    name: string;
    options: {
      title: string;
      subTitle?: string | ReactNode;
      onPress?: () => void;
      dropdown?: boolean;
    }[];
  }[];
}) {
  return (
    <>
      {items.map(({ name, options }) => (
        <View key={name}>
          <AppText
            className="pt-6 pb-2 px-5 uppercase text-xs text-mediumGray"
            accessibilityRole="header"
          >
            {name}
          </AppText>
          <View className="bg-white rounded-lg overflow-hidden">
            {options.map(({ title, subTitle, onPress, dropdown }, index) => (
              <View key={title}>
                {dropdown ? (
                  subTitle
                ) : (
                  <TouchableHighlight
                    underlayColor={colors.highlight}
                    onPress={onPress}
                    accessibilityRole={onPress ? "button" : "text"}
                    className="px-5"
                  >
                    <View className="flex-row items-center justify-between">
                      <AppText className="flex-1 text-base py-3">
                        {title}
                      </AppText>
                      {subTitle && (
                        <AppText className="text-base text-mediumGray">
                          {subTitle}
                        </AppText>
                      )}
                    </View>
                  </TouchableHighlight>
                )}
                {index < options.length - 1 ? (
                  <View className="pl-5">
                    <ListItemSeparator />
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        </View>
      ))}
    </>
  );
}
