import { useRef } from "react";
import { ScrollView, View } from "react-native";

import ImageInput from "./ImageInput";
import { ImageAssetOrString } from "./forms/FormImagePicker";

export default function ImageInputList({
  imageAssets = [],
  onImageAdd,
  onImageRemove,
}: {
  imageAssets: ImageAssetOrString[];
  onImageAdd: (imageAssets: ImageAssetOrString[]) => void;
  onImageRemove: (imageAsset: ImageAssetOrString) => void;
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
          {imageAssets.map((imageAsset) => (
            <View
              key={
                typeof imageAsset === "string" ? imageAsset : imageAsset[0].uri
              }
              className="mr-2"
            >
              <ImageInput
                imageAsset={imageAsset}
                onImageChange={() => onImageRemove(imageAsset)}
              />
            </View>
          ))}
          <ImageInput onImageChange={(assets) => onImageAdd(assets)} />
        </View>
      </ScrollView>
    </View>
  );
}
