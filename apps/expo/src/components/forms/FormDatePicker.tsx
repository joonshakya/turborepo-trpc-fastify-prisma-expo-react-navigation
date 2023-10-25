import { FormikContextType, FormikValues, useFormikContext } from "formik";
import AppDatePicker from "../AppDatePicker";

import ErrorMessage from "./ErrorMessage";

export default function FormDatePicker({
  name,
  label,
  maximumDate,
  minimumDate,
  placeholder = "Choose a date",
}: {
  name: string;
  label: string;
  maximumDate: Date | undefined;
  minimumDate: Date | undefined;
  placeholder?: string;
}) {
  const { errors, setFieldValue, touched, values } =
    useFormikContext<FormikContextType<FormikValues>>();
  return (
    <>
      <AppDatePicker
        onDateChange={(newDate) => setFieldValue(name, newDate)}
        placeholder={placeholder}
        label={label}
        date={values[name]}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
