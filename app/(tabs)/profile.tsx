import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const Profile = () => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      router.replace("/(auth)");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Pressable onPress={handleLogout}>
      <Text>log out</Text>
    </Pressable>
  );
};

export default Profile;

const styles = StyleSheet.create({});
