import { FormikContextType, FormikValues, useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import AppText from "../AppText";
import DocumentInputList from "../DocumentInputList";

type DocumentAsset = {
  name: string;
  uri: string;
  mimeTypes?: string | undefined;
  size?: number | undefined;
  lastModified?: number | undefined;
};

export type DocumentAssetOrString = DocumentAsset | string;

export default function FormPdfPicker({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  const { errors, setFieldValue, touched, values } =
    useFormikContext<FormikContextType<FormikValues>>();
  const documentAssets: DocumentAssetOrString[] = values[name];

  const handleDocumentAdd = (results: DocumentAssetOrString[]) => {
    setFieldValue(name, [...documentAssets, results]);
  };

  const handleDocumentRemove = (result: DocumentAssetOrString) => {
    setFieldValue(
      name,
      documentAssets.filter((documentAsset: DocumentAssetOrString) => {
        if (typeof result === "string" && typeof documentAsset === "string") {
          return documentAsset !== result;
        }
        if (typeof result === "string" || typeof documentAsset === "string") {
          return false;
        }
        return documentAsset[0].uri !== result[0].uri;
      })
    );
  };

  return (
    <>
      {label ? (
        <AppText className="mx-3 my-2 text-sm text-mediumGray">{label}</AppText>
      ) : null}
      <DocumentInputList
        documentAssets={documentAssets}
        onDocumentAdd={handleDocumentAdd}
        onDocmuentRemove={handleDocumentRemove}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
