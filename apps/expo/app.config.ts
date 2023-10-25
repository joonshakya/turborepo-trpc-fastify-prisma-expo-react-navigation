import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "t3-turbo",
  slug: "t3-turbo",
  scheme: "t3-turbo",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#1F104A",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "your.bundle.identifier",
    supportsTablet: true,
  },
  android: {
    package: "your.bundle.identifier",
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#1F104A",
    },
  },
  extra: {
    eas: {
      projectId: "686fccc6-53c9-45b9-9596-f2b60ec2bad7",
    },
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: [
    [
      "expo-build-properties",
      {
        android: {
          enableProguardInReleaseBuilds: true,
        },
      },
    ],
    "./expo-plugins/with-modify-gradle.js",
  ],
});

export default defineConfig;
