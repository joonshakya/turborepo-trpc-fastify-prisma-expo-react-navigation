import { useEffect, useState } from "react";
import {
  StyleSheet,
  ActivityIndicator as SpinningIndicator,
} from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import colors from "../config/colors";

interface ActivityIndicatorProps {
  visible: boolean;
}

export default function ActivityIndicator({ visible }: ActivityIndicatorProps) {
  const [opaque, setOpaque] = useState(false);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 300 });
      setOpaque(true);
    } else {
      opacity.value = withTiming(0, { duration: 300 });
      setTimeout(() => {
        setOpaque(false);
      }, 300);
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!opaque) return null;

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <SpinningIndicator size={48} className="flex-1" color={colors.primary} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    position: "absolute",
    zIndex: 50,
    height: "100%",
    width: "100%",
  },
});
