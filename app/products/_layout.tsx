import { Stack } from "expo-router";
import { Platform } from "react-native";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        animation: Platform.OS === "ios" ? "slide_from_right" : "fade",
        headerShown: false,
      }}
    >
      <Stack.Screen name="[id]" />
    </Stack>
  );
};

export default _layout;
