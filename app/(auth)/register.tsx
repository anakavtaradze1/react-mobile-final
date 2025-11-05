import Feather from "@expo/vector-icons/Feather";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import React, { useRef } from "react";
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
  email: yup.string().required("Email is required").email("Email is invalid"),
  phone: yup
    .string()
    .required("Phone number is required")
    .min(5, "Phone number must be at least 5 digits")
    .max(30, "Phone number must be at most 30 digits")
    .matches(/^[0-9]+$/, "Phone number must contain only digits"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .max(10, "Password must be at most 10 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

type FormData = {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const usernameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleRegister = async (data: FormData) => {
    const response = await fetch("https://fakestoreapi.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result?.id) {
      router.replace("/(tabs)");
    }
  };

  const handleFocus = (
    inputType: "username" | "email" | "phone" | "password" | "confirmPassword"
  ) => {
    if (inputType === "username" && usernameRef.current != null) {
      usernameRef.current.focus();
    } else if (inputType === "email" && emailRef.current != null) {
      emailRef.current.focus();
    } else if (inputType === "phone" && phoneRef.current != null) {
      phoneRef.current.focus();
    } else if (inputType === "password" && passwordRef.current != null) {
      passwordRef.current.focus();
    } else if (
      inputType === "confirmPassword" &&
      confirmPasswordRef.current != null
    ) {
      confirmPasswordRef.current.focus();
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
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <View style={styles.iconContainer}>
          <View style={styles.iconInner}>
            <Feather name="users" size={55} color="white" />
          </View>
          <View style={styles.iconGlow} />
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
            style={[styles.inputContainer, errors.email && styles.inputError]}
            onPress={() => handleFocus("email")}
          >
            <Feather name="mail" size={20} color="#656565ff" />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="email"
                  style={styles.textInput}
                  textContentType="emailAddress"
                  placeholderTextColor="#999"
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  ref={emailRef}
                />
              )}
            />
          </Pressable>
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}

          <Pressable
            style={[styles.inputContainer, errors.phone && styles.inputError]}
            onPress={() => handleFocus("phone")}
          >
            <Feather name="phone" size={20} color="#656565ff" />
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="phone number"
                  style={styles.textInput}
                  textContentType="telephoneNumber"
                  placeholderTextColor="#999"
                  onChangeText={onChange}
                  value={value}
                  keyboardType="phone-pad"
                  ref={phoneRef}
                />
              )}
            />
          </Pressable>
          {errors.phone && (
            <Text style={styles.errorText}>{errors.phone.message}</Text>
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
                  secureTextEntry
                  textContentType="password"
                  placeholderTextColor="#999"
                  onChangeText={onChange}
                  value={value}
                  ref={passwordRef}
                />
              )}
            />
          </Pressable>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}

          <Pressable
            style={[
              styles.inputContainer,
              errors.confirmPassword && styles.inputError,
            ]}
            onPress={() => handleFocus("confirmPassword")}
          >
            <Feather name="lock" size={20} color="#656565ff" />
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="repeat password"
                  style={styles.textInput}
                  secureTextEntry
                  textContentType="password"
                  placeholderTextColor="#999"
                  onChangeText={onChange}
                  value={value}
                  ref={confirmPasswordRef}
                />
              )}
            />
          </Pressable>
          {errors.confirmPassword && (
            <Text style={styles.errorText}>
              {errors.confirmPassword.message}
            </Text>
          )}

          <Pressable
            onPress={handleSubmit(handleRegister)}
            style={({ pressed }) => [
              styles.registerButton,
              pressed && styles.registerButtonPressed,
            ]}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </Pressable>

          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [pressed && styles.signInPressed]}
          >
            <Text style={styles.signInText}>Sign in</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 30,
    alignItems: "center",
    paddingBottom: 50,
  },
  iconContainer: {
    marginBottom: 60,
    marginTop: 60,
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
  inputIcon: {
    fontSize: 16,
    marginRight: 12,
    color: "#999",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingLeft: 10,
  },
  registerButton: {
    backgroundColor: "#7f4afcff",
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 30,
    width: "50%",
  },
  registerButtonPressed: {
    backgroundColor: "#6c2dffff",
    transform: [{ scale: 0.98 }],
  },
  registerButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  signInText: {
    color: "#7f4afcff",
    fontSize: 17,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 20,
  },
  signInPressed: {
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
    marginTop: -8,
    marginBottom: 20,
    marginLeft: 20,
  },
});
