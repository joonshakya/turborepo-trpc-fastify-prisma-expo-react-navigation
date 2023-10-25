import { ReactNode, Ref } from "react";
import { Formik, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";

interface FormProps {
  children: ReactNode;
  initialValues: Object;
  onSubmit: (values: any, { resetForm }: FormikHelpers<any>) => void;
  formRef?: Ref<FormikProps<any>>;
  validationSchema: Yup.ObjectSchema<any>;
}

export default function Form({
  children,
  initialValues,
  onSubmit,
  formRef,
  validationSchema,
}: FormProps) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      innerRef={formRef}
      validationSchema={validationSchema}
    >
      {() => children}
    </Formik>
  );
}
