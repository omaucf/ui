import type { ComponentProps, ComponentType } from "react";
import {
  Image as RNImage,
  Pressable as RNPressable,
  Text as RNText,
  View as RNView,
} from "react-native";

interface ClassNameProps {
  className?: string;
}

type ClassNameComponent<T extends ComponentType> = ComponentType<
  ComponentProps<T> & ClassNameProps
>;

export default {
  Image: RNImage as ClassNameComponent<typeof RNImage>,
  Pressable: RNPressable as ClassNameComponent<typeof RNPressable>,
  Text: RNText as ClassNameComponent<typeof RNText>,
  View: RNView as ClassNameComponent<typeof RNView>,
};
