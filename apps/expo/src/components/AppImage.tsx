import CachedImage from "expo-cached-image";
import { Image } from "react-native";
import shorthash from "shorthash2";

export default function AppImage({
  source,
  alt,
  className,
  style,
  contain,
  noCache,
}: {
  source: {
    uri: string;
  };
  alt: string;
  className?: string;
  style?: Object;
  contain?: boolean;
  noCache?: boolean;
}) {
  return noCache ? (
    <Image
      source={{
        uri: source.uri,
      }}
      alt={alt}
      style={[
        style,
        contain ? { resizeMode: "contain" } : { resizeMode: "cover" },
      ]}
      className={className}
    />
  ) : (
    <CachedImage
      source={{
        uri: source.uri,
        expiresIn: 2628288,
      }}
      alt={alt}
      cacheKey={shorthash(source.uri)}
      style={[
        style,
        contain ? { resizeMode: "contain" } : { resizeMode: "cover" },
      ]}
      className={className}
    />
  );
}
