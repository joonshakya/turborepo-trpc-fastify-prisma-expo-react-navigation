import { createRef } from "react";
import {
  NavigationContainerRef,
  ParamListBase,
  StackActions,
} from "@react-navigation/native";

export const navigationRef = createRef<NavigationContainerRef<ParamListBase>>();

export function navigate(name: string, params: Object) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}
