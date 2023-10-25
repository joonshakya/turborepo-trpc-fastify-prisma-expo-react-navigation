import { useRef } from "react";
import { ScrollView, View } from "react-native";

import { DocumentAssetOrString } from "./forms/FormPdfPicker";
import DocumentInput from "./DocumentInput";

export default function DocumentInputList({
  documentAssets = [],
  onDocumentAdd,
  onDocmuentRemove,
}: {
  documentAssets: DocumentAssetOrString[];
  onDocumentAdd: (documentAssets: DocumentAssetOrString[]) => void;
  onDocmuentRemove: (documentAsset: DocumentAssetOrString) => void;
}) {
  const scrollViewRef = useRef<ScrollView>(null);

  const handleContentSizeChange = () => scrollViewRef?.current?.scrollToEnd();

  // use a view here in order not to take up the whole screen space because of ScrollView
  return (
    <View className="mb-2">
      <ScrollView
        horizontal
        onContentSizeChange={handleContentSizeChange}
        ref={scrollViewRef}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <View className="flex-row">
          {documentAssets.map((documentAsset) => (
            <View
              key={
                typeof documentAsset === "string"
                  ? documentAsset
                  : documentAsset[0].uri
              }
              className="mr-2"
            >
              <DocumentInput
                documentAsset={documentAsset}
                onDocumentChange={() => onDocmuentRemove(documentAsset)}
              />
            </View>
          ))}
          <DocumentInput onDocumentChange={(assets) => onDocumentAdd(assets)} />
        </View>
      </ScrollView>
    </View>
  );
}
