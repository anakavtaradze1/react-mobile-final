import Entypo from "@expo/vector-icons/Entypo";
import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        animation: "shift",
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 80,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: "#eee",
          elevation: 4,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          marginTop: 4,
          fontSize: 12,
          fontFamily: "Rubik",
          fontWeight: "600",
        },
        headerStyle: {
          backgroundColor: "#ffffffff",
          height: 110,
          elevation: 4,
          shadowColor: "#000",
          shadowOffset: {
            width: 5,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "",
          tabBarLabel: "products",
          tabBarIcon: ({ color, focused }) => (
            <Entypo name="shop" size={focused ? 28 : 24} color={color} />
          ),
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <Entypo name="shop" size={24} color="#000b1fff" />
            </View>
          ),
          headerLeft: () => <Text style={styles.headerLeftText}>Products</Text>,
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          headerTitle: "",
          tabBarLabel: "cart",
          tabBarIcon: ({ color, focused }) => (
            <Entypo
              name="shopping-cart"
              size={focused ? 28 : 24}
              color={color}
            />
          ),
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <Entypo name="shopping-cart" size={24} color="#000b1fff" />
            </View>
          ),
          headerLeft: () => <Text style={styles.headerLeftText}>Cart</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "",
          tabBarLabel: "profile",
          tabBarIcon: ({ color, focused }) => (
            <Entypo name="user" size={focused ? 28 : 24} color={color} />
          ),
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <Entypo name="user" size={24} color="#000b1fff" />
            </View>
          ),
          headerLeft: () => <Text style={styles.headerLeftText}>Profile</Text>,
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  headerRightContainer: {
    marginRight: 16,
  },
  headerLeftText: {
    marginLeft: 20,
    fontSize: 24,
    fontFamily: "Rubik",
    fontWeight: "800",
    color: "#000b1fff",
    letterSpacing: 0.5,
  },
});

export default _layout;
