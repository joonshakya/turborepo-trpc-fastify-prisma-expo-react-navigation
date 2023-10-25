import { useState } from "react";
import { Platform, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import AppTextInput from "./AppTextInput";
import AppText from "./AppText";
import colors from "../config/colors";

export default function AppDatePicker({
  placeholder,
  label,
  date,
  onDateChange,
  maximumDate,
  minimumDate,
  icon,
  my0,
}: {
  placeholder: string;
  label: string;
  date: Date;
  onDateChange: (newDate: Date) => void;
  maximumDate: Date | undefined;
  minimumDate: Date | undefined;
  icon?: string;
  my0?: boolean;
}) {
  const [show, setShow] = useState(false);

  return (
    <View>
      <AppTextInput
        onPress={() => {
          setShow(true);
        }}
        icon={icon}
        my0={my0}
        label={label}
      >
        {show || Platform.OS === "ios" ? (
          <DateTimePicker
            display={Platform.OS === "ios" ? "compact" : "default"}
            accentColor={colors.primary}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
            testID="dateTimePicker"
            value={date ? new Date(date) : new Date()}
            style={{
              position: "absolute",
              transform: [{ scaleX: 2.8 }, { scaleY: 1 }],
            }}
            mode="date"
            onChange={(event, selectedDate) => {
              setShow(false);
              onDateChange(selectedDate || new Date(date) || new Date());
            }}
          />
        ) : null}
        <View className="w-full rounded-xl bg-white" pointerEvents="none">
          <AppText className="p-3 px-4">
            {date ? new Date(date).toDateString() : placeholder}
          </AppText>
        </View>
      </AppTextInput>
    </View>
  );
}
