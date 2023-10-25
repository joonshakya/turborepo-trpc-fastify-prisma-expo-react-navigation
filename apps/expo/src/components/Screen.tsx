import { ReactElement, ReactNode, RefObject } from "react";
import {
  RefreshControlProps,
  SafeAreaView,
  StatusBar,
  View,
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";
import { useTheme } from "@react-navigation/native";

export default function Screen({
  children,
  style,
  noKeyboardAwareScroll,
  noSafeArea,
  className,
  scrollRef,
  backgroundColor,
  refreshControl,
}: {
  children: ReactNode;
  style?: Object;
  noKeyboardAwareScroll?: boolean;
  noSafeArea?: boolean;
  className?: string;
  scrollRef?: RefObject<KeyboardAwareScrollView>;
  backgroundColor?: string;
  refreshControl?: ReactElement<RefreshControlProps>;
}) {
  const netInfo = useNetInfo();

  const internet =
    netInfo.type !== "unknown" && netInfo.isInternetReachable === false;
  const morePaddingTop = internet && !internet;
  return (
    <SafeAreaOnCondition
      backgroundColor={backgroundColor}
      condition={!noSafeArea}
      className={className}
    >
      <KeyboardAwareScrollOnCondition
        condition={!noKeyboardAwareScroll}
        style={style}
        className={className}
        morePaddingTop={morePaddingTop}
        scrollRef={scrollRef}
        refreshControl={refreshControl}
      >
        {children}
      </KeyboardAwareScrollOnCondition>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
    </SafeAreaOnCondition>
  );
}

function SafeAreaOnCondition({
  condition,
  children,
  style,
  className,
  backgroundColor,
}: {
  condition: boolean;
  children: ReactNode;
  style?: Object;
  className?: string;
  backgroundColor?: string;
}) {
  const { colors } = useTheme();
  if (condition) {
    return (
      <SafeAreaView
        style={[
          { paddingTop: Constants.statusBarHeight },
          style,
          {
            backgroundColor: backgroundColor || colors.background,
          },
        ]}
        className={`flex-1 ${className}`}
      >
        {children}
      </SafeAreaView>
    );
  }
  return (
    <View
      className={`flex-1 ${className}`}
      style={[
        style,
        {
          backgroundColor: backgroundColor || colors.background,
        },
      ]}
    >
      {children}
    </View>
  );
}

function KeyboardAwareScrollOnCondition({
  condition,
  children,
  style,
  className,
  morePaddingTop,
  scrollRef,
  refreshControl,
}: {
  condition: boolean;
  children: ReactNode;
  style?: Object;
  className?: string;
  morePaddingTop?: boolean;
  scrollRef?: RefObject<KeyboardAwareScrollView>;
  refreshControl?: ReactElement<RefreshControlProps>;
}) {
  if (condition) {
    return (
      <KeyboardAwareScrollView
        refreshControl={refreshControl}
        contentContainerStyle={[style, morePaddingTop && { paddingTop: 50 }]}
        enableResetScrollToCoords={false}
        keyboardShouldPersistTaps="handled"
        className={`flex-1 ${className}`}
        extraHeight={100}
        ref={scrollRef}
      >
        {children}
      </KeyboardAwareScrollView>
    );
  }
  return (
    <View
      style={[style, morePaddingTop && { paddingTop: 50 }]}
      className={`flex-1 ${className}`}
    >
      {children}
    </View>
  );
}
