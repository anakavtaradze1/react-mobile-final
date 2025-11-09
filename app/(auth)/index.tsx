import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(15, "Username must be at most 15 characters"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .max(15, "Password must be at most 15 characters")
    .required("Password is required"),
});

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const usernameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleLogin = async (data: FormData) => {
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (result?.token) {
        if (rememberMe) {
          await AsyncStorage.setItem("userToken", result.token);
        } else {
          await AsyncStorage.removeItem("userToken");
        }
        router.replace("/(tabs)");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFocus = (inputType: "username" | "password") => {
    if (inputType === "username" && usernameRef.current != null) {
      usernameRef.current.focus();
    } else if (inputType === "password" && passwordRef.current != null) {
      passwordRef.current.focus();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      enabled
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <View style={styles.iconContainer}>
          <View style={styles.iconInner}>
            <Feather name="users" size={55} color="white" />
          </View>
          <View style={styles.iconGlow} />
          <View style={styles.plusIconContainer}>
            <Feather name="plus" size={16} color="white" />
          </View>
        </View>

        <View style={styles.formContainer}>
          <Pressable
            style={[
              styles.inputContainer,
              errors.username && styles.inputError,
            ]}
            onPress={() => handleFocus("username")}
          >
            <Feather name="user" size={22} color="#656565ff" />
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="username"
                  style={styles.textInput}
                  textContentType="username"
                  placeholderTextColor="#999"
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  ref={usernameRef}
                />
              )}
            />
          </Pressable>
          {errors.username && (
            <Text style={styles.errorText}>{errors.username.message}</Text>
          )}

          <Pressable
            style={[
              styles.inputContainer,
              errors.password && styles.inputError,
            ]}
            onPress={() => handleFocus("password")}
          >
            <Feather name="lock" size={20} color="#656565ff" />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="password"
                  style={styles.textInput}
                  secureTextEntry={!showPassword}
                  textContentType="password"
                  placeholderTextColor="#999"
                  onChangeText={onChange}
                  value={value}
                  ref={passwordRef}
                />
              )}
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color="#999"
              />
            </Pressable>
          </Pressable>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}

          <Pressable
            onPress={() => setRememberMe(!rememberMe)}
            style={styles.rememberMeContainer}
          >
            <Ionicons
              name={rememberMe ? "checkbox" : "square-outline"}
              size={22}
              color="#7f4afcff"
            />
            <Text style={styles.rememberMeText}>Remember Me</Text>
          </Pressable>

          <Pressable
            onPress={handleSubmit(handleLogin)}
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.loginButtonPressed,
            ]}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/(auth)/register")}
            style={({ pressed }) => [pressed && styles.registerPressed]}
          >
            <Text style={styles.registerText}>
              Don&apos;t have an account? Register
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: "#efefefdf",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#efefefdf",
    paddingHorizontal: 30,
    alignItems: "center",
    paddingBottom: 50,
  },
  iconContainer: {
    marginBottom: 60,
    marginTop: 110,
    alignItems: "center",
    position: "relative",
  },
  iconInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#7f4afcff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#7f4afcff",
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.4,
    shadowRadius: 25,
    elevation: 5,
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  iconGlow: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#7f4afcff",
    opacity: 0.2,
    top: -10,
    left: -10,
    shadowColor: "#7f4afcff",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 5,
  },
  plusIconContainer: {
    position: "absolute",
    bottom: -4,
    right: 6,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#7f4afcff",
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#7f4afcff",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8e8e8",
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 18,
    height: 60,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Rubik",
    color: "#2e2e2eff",
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: "#7f4afcff",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 30,
    width: "50%",
  },
  loginButtonPressed: {
    backgroundColor: "#6c2dffff",
    transform: [{ scale: 0.98 }],
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Rubik",
    fontWeight: "600",
  },
  registerText: {
    color: "#7f4afcff",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Rubik",
    fontWeight: "600",
    marginBottom: 20,
  },
  registerPressed: {
    opacity: 0.8,
    color: "#6c2dffff",
    transform: [{ scale: 0.98 }],
  },
  inputError: {
    borderColor: "#ea1206ff",
    borderWidth: 2,
  },
  errorText: {
    color: "#ea1206ff",
    fontSize: 13,
    fontFamily: "Rubik",
    marginTop: -8,
    marginBottom: 20,
    marginLeft: 20,
  },
  eyeButton: {
    padding: 8,
    marginLeft: 8,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
  },
  rememberMeText: {
    color: "#4c4c4cff",
    fontSize: 15,
    marginLeft: 8,
    fontFamily: "Rubik",
    fontWeight: "500",
  },
});
