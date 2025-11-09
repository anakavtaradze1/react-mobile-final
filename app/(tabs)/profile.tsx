import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
  phone: string;
}
const windowWidth = Dimensions.get("window").width;

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/users/1");
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      router.replace("/(auth)");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(
      event.nativeEvent.contentOffset.x / windowWidth
    );
    setCurrentSlide(slideIndex);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7f4afcff" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load user data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      >
        <View style={styles.slide}>
          <View style={styles.slideHeader}>
            <Ionicons name="person-circle" size={40} color="#7f4afcff" />
            <Text style={styles.slideTitle}>Profile & Info</Text>
          </View>

          <View style={styles.profileSlide}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.name.firstname[0]}
                {user.name.lastname[0]}
              </Text>
            </View>

            <Text style={styles.userName}>
              {user.name.firstname} {user.name.lastname}
            </Text>
            <View style={styles.emailContainer}>
              <Ionicons name="mail" size={16} color="#666" />
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          </View>

          <View style={styles.infoSlide}>
            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="person" size={20} color="#7f4afcff" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Username</Text>
                <Text style={styles.infoValue}>{user.username}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="call" size={20} color="#7f4afcff" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>{user.phone}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.slide}>
          <View style={styles.slideHeader}>
            <Ionicons name="location" size={32} color="#7f4afcff" />
            <Text style={styles.slideTitle}>Address</Text>
          </View>
          <View style={styles.infoSlide}>
            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="home-outline" size={20} color="#7f4afcff" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Street Number</Text>
                <Text style={styles.infoValue}>{user.address.number}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="home" size={20} color="#7f4afcff" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Street Name</Text>
                <Text style={styles.infoValue}>{user.address.street}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="business" size={20} color="#7f4afcff" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>City</Text>
                <Text style={styles.infoValue}>{user.address.city}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="mail-outline" size={20} color="#7f4afcff" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Zipcode</Text>
                <Text style={styles.infoValue}>{user.address.zipcode}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.pagination}>
        {[0, 1].map((index) => (
          <View
            key={index}
            style={[styles.dot, currentSlide === index && styles.activeDot]}
          />
        ))}
      </View>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out" size={20} color="white" />
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </Pressable>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefefdf",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#efefefdf",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: "Rubik",
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#efefefdf",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: "Rubik",
    color: "#ea1206ff",
    textAlign: "center",
    marginBottom: 20,
  },
  slide: {
    width: windowWidth - 40,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  slideHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 34,
    marginTop: 15,
  },
  slideTitle: {
    fontSize: 30,
    fontFamily: "Rubik",
    fontWeight: "700",
    color: "#333",
    marginLeft: 8,
  },
  profileSlide: {
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#7f4afcff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 10,
  },
  avatarText: {
    fontSize: 24,
    fontFamily: "Rubik",
    fontWeight: "700",
    color: "white",
  },
  userName: {
    fontSize: 24,
    fontFamily: "Rubik",
    fontWeight: "700",
    color: "#333",
    marginBottom: 14,
    textAlign: "center",
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  userEmail: {
    fontSize: 18,
    fontFamily: "Rubik",
    color: "#666",
    marginLeft: 6,
    textAlign: "center",
  },
  infoSlide: {
    flex: 1,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(139, 92, 246, 0.06)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 18,
    color: "#666",
    fontFamily: "Rubik",
    fontWeight: "500",
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Rubik",
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#ac0c04ff",
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#a60a02ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Rubik",
    fontWeight: "700",
    marginLeft: 8,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: "#7f4afcff",
  },
});
