import { FormikContextType, FormikValues, useFormikContext } from "formik";
import { ElementType } from "react";

import AppPicker from "../AppPicker";
import { Item } from "../models";
import PickerItem from "../PickerItem";
import ErrorMessage from "./ErrorMessage";

export default function FormPicker({
  items,
  name,
  placeholder,
  label,
  numberOfColumns = 1,
  PickerItemComponent = PickerItem,
}: {
  items: Item[];
  name: string;
  placeholder: string;
  label: string;
  numberOfColumns?: number;
  PickerItemComponent?: ElementType;
}) {
  const { errors, setFieldValue, touched, values } =
    useFormikContext<FormikContextType<FormikValues>>();
  return (
    <>
      <AppPicker
        items={items}
        numberOfColumns={numberOfColumns}
        onItemSelect={(item) => setFieldValue(name, item.value)}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        label={label}
        selectedItem={values[name]}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
