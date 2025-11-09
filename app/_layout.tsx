import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { 
  useFonts, 
  Rubik_300Light,
  Rubik_400Regular, 
  Rubik_500Medium, 
  Rubik_600SemiBold, 
  Rubik_700Bold,
  Rubik_800ExtraBold,
  Rubik_900Black
} from '@expo-google-fonts/rubik';

export default function RootLayout() {
  const router = useRouter();
  
  const [fontsLoaded] = useFonts({
    Rubik_300Light,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_600SemiBold,
    Rubik_700Bold,
    Rubik_800ExtraBold,
    Rubik_900Black,
  });

  useEffect(() => {
    const requestNotificationPermissions = async () => {
      console.log("Requesting notification permissions...");

      try {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        console.log("Current notification permission:", existingStatus);

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          if (status === "granted") {
            console.log("Notification permission granted!");
          } else {
            console.log("Notification permission denied");
          }
        } else {
          console.log("Notification permission already granted");
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error);
      }
    };

    const checkUser = async () => {
      try {
        await requestNotificationPermissions();
        
        const user = await AsyncStorage.getItem("userToken");
        if (user) {
          router.replace("/(tabs)");
        }
      } catch (error) {
        console.error("Error checking user token:", error);
        router.replace("/(auth)");
      }
    };

    if (fontsLoaded) {
      checkUser();
    }
  }, [router, fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Show loading while fonts load
  }

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
