import { FormikContextType, FormikValues, useFormikContext } from "formik";

import AppTextInput, { AppTextInputProps } from "../AppTextInput";
import ErrorMessage from "./ErrorMessage";

interface FormFieldProps extends AppTextInputProps {
  name: string;
  number?: boolean;
  label: string;
  my0?: boolean;
}

export default function FormField({
  name,
  number,
  my0,
  label,
  ...otherProps
}: FormFieldProps) {
  const { errors, setFieldValue, setFieldTouched, touched, values } =
    useFormikContext<FormikContextType<FormikValues>>();
  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => {
          if (number && Number.isNaN(parseInt(text, 10))) {
            setFieldValue(name, 0);
            return;
          }
          setFieldValue(name, number ? parseInt(text, 10) : text);
        }}
        value={values[name] === 0 ? "" : values[name]?.toString()}
        my0={my0}
        label={label}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
