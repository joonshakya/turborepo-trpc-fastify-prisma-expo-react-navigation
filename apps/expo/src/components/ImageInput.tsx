import { useEffect } from "react";
import { Image, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import colors from "../config/colors";
import { ImageAssetOrString } from "./forms/FormImagePicker";
import { storageDomain } from "../config/settings";

export default function ImageInput({
  onImageChange,
  imageAsset,
}: {
  onImageChange: (imageAssets: ImageAssetOrString[]) => void;
  imageAsset?: ImageAssetOrString;
}) {
  const requestMediaLibraryPermissionsAsync = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("You need to enable permissions to acess the library");
  };

  useEffect(() => {
    requestMediaLibraryPermissionsAsync();
  }, []);

  const handlePress = () => {
    if (!imageAsset) handleImageSelect();
    else
      Alert.alert("Delete?", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => onImageChange([]) },
        { text: "No" },
      ]);
  };

  const handleImageSelect = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.canceled) onImageChange(result.assets);
    } catch (error) {
      throw new Error("Error reading the image", error as any);
    }
  };

  const content = imageAsset ? (
    <Image
      source={{
        uri:
          typeof imageAsset === "string"
            ? `${storageDomain}/${imageAsset}`
            : imageAsset[0].uri,
      }}
      className="h-full w-full"
    />
  ) : (
    <MaterialCommunityIcons color={colors.mediumGray} name="camera" size={40} />
  );

  return (
    <TouchableOpacity
      className="h-28 w-28 items-center justify-center overflow-hidden rounded-xl bg-lightGray"
      onPress={handlePress}
    >
      {content}
    </TouchableOpacity>
  );
}
