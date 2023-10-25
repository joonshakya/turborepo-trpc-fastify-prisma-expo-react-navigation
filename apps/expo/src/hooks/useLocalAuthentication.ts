import React from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";

export default function useLocalAuthentication() {
  const [hasHardware, setHasHardware] = React.useState<boolean>(false);
  const [isEnrolled, setIsEnrolled] = React.useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [error, setError] = React.useState<any>({});

  const authenticate = async () => {
    if (!isEnrolled) {
      Alert.alert(
        "Authentication not set up",
        "Please set up authentication in your device settings.",
        [
          {
            text: "OK",
          },
        ]
      );
      return true;
    }
    try {
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        setIsAuthenticated(true);
      } else {
        setError({ message: "Authentication failed." });
      }
      return result.success;
    } catch (err) {
      setError(err);
    }
    return false;
  };

  React.useEffect(() => {
    const checkHardware = async () => {
      const hardware = await LocalAuthentication.hasHardwareAsync();
      setHasHardware(hardware);
    };

    const checkEnrolled = async () => {
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      setIsEnrolled(enrolled);
    };

    checkHardware();
    checkEnrolled();
  }, []);

  return { hasHardware, isEnrolled, isAuthenticated, error, authenticate };
}
