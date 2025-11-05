import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await AsyncStorage.getItem("userToken");
        if (user) {
          router.replace("/(tabs)");
        }
      } catch (error) {
        console.error("Error checking user token:", error);
        router.replace("/(auth)");
      }
    };

    checkUser();
  }, [router]);

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="products"
        options={{
          headerTitle: "Details",
          headerBackTitle: "Products",
        }}
      />
    </Stack>
  );
}
