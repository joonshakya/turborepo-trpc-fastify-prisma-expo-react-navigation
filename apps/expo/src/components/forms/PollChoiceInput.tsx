import { FormikContextType, FormikValues, useFormikContext } from "formik";
import { View } from "react-native";
import AppButton from "../AppButton";
import AppTextInput from "../AppTextInput";
import ErrorMessage from "./ErrorMessage";

export default function PollChoiceInput({ name }: { name: string }) {
  const { errors, setFieldValue, touched, setFieldTouched, values } =
    useFormikContext<FormikContextType<FormikValues>>();

  return (
    <>
      {values[name].map((choice: string, index: number) => (
        <View key={`Option-${index + 1}`} className="flex-row">
          <View className="flex-1">
            <AppTextInput
              className="flex-1"
              label={`Option ${index + 1}`}
              value={choice}
              onChangeText={(text) =>
                setFieldValue(
                  name,
                  values[name].map((choice_, i) =>
                    i === index ? text : choice_
                  )
                )
              }
              onBlur={() => setFieldTouched(name)}
            />
          </View>
          <AppButton
            className="my-2 ml-2 self-end px-4"
            title="X"
            onPress={() => {
              if (values[name].length === 1) return;
              setFieldValue(
                name,
                values[name].filter((_, i) => i !== index)
              );
              setFieldTouched(name);
            }}
          />
        </View>
      ))}
      <AppButton
        className="my-2"
        title="Add Option"
        onPress={() => {
          setFieldValue(name, [...values[name], ""]);
        }}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
