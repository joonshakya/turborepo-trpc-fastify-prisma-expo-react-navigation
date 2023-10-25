import { TouchableOpacity, Alert, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

import colors from "../config/colors";
// import { storageDomain } from "../config/settings";
import { DocumentAssetOrString } from "./forms/FormPdfPicker";
import AppText from "./AppText";

export default function DocumentInput({
  onDocumentChange,
  documentAsset,
}: {
  onDocumentChange: (documentAssets: DocumentAssetOrString[]) => void;
  documentAsset?: DocumentAssetOrString;
}) {
  const handlePress = () => {
    if (!documentAsset) handleImageSelect();
    else
      Alert.alert("Delete?", "Are you sure you want to remove this file?", [
        { text: "Yes", onPress: () => onDocumentChange([]) },
        { text: "No" },
      ]);
  };

  const handleImageSelect = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      if (result.type !== "cancel")
        onDocumentChange([
          {
            name: result.name,
            uri: result.uri,
            mimeTypes: result.mimeType,
            size: result.size,
            lastModified: result.lastModified,
          },
        ] as DocumentAssetOrString[]);
    } catch (error) {
      throw new Error("Error reading the image", error as any);
    }
  };
  const content = documentAsset ? (
    <View className=" items-center justify-center p-4">
      <MaterialCommunityIcons
        color={colors.mediumGray}
        name="file-document"
        size={40}
      />
      <AppText className="mt-2 text-center">
        {typeof documentAsset !== "string"
          ? documentAsset[0].name
          : documentAsset}
      </AppText>
    </View>
  ) : (
    <MaterialCommunityIcons color={colors.mediumGray} name="plus" size={40} />
  );

  return (
    <TouchableOpacity
      className="h-28 w-32 items-center justify-center overflow-hidden rounded-xl bg-lightGray"
      onPress={handlePress}
    >
      {content}
    </TouchableOpacity>
  );
}
