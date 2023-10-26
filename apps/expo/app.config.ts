import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "tRPC Expo",
  slug: "turborepo-trpc-fastify-prisma-expo-react-navigation",
  scheme: "trpc-expo",
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
    url: "https://u.expo.dev/34320252-70e8-4c57-96b5-f612287a8295",
  },
  runtimeVersion: {
    policy: "appVersion",
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
      projectId: "34320252-70e8-4c57-96b5-f612287a8295",
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
    "expo-secure-store",
  ],
});

export default defineConfig;
