import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type CartItem = Product & {
  quantity: number;
};

const CART_KEY = "@cart";

const getCart = () => {
  return AsyncStorage.getItem(CART_KEY)
    .then((cart) => (cart ? JSON.parse(cart) : []))
    .catch((error) => {
      console.error("Error retrieving cart from storage:", error);
      return [];
    });
};

const removeFromCart = async (productId: number) => {
  const cart = await getCart();
  const updatedCart = cart.filter((item: CartItem) => item.id !== productId);
  await AsyncStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
};

const updateQuantity = async (productId: number, quantity: number) => {
  if (quantity <= 0) {
    await removeFromCart(productId);
    return;
  }
  const cart = await getCart();
  const item = cart.find((item: CartItem) => item.id === productId);
  if (item) {
    item.quantity = quantity;
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
};

const clearCart = async () => {
  await AsyncStorage.removeItem(CART_KEY);
};

const getCartTotal = (cart: CartItem[]) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

const getCartCount = (cart: CartItem[]) => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};

export const addToCart = async (product: Product) => {
  const cart = await getCart();
  const existingItem = cart.find((item: CartItem) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
};

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadCart = async () => {
    try {
      setLoading(true);
      const items = await getCart();
      setCartItems(items);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadCart();
    }, [])
  );

  const handleRemoveItem = (productId: number) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your cart?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            await removeFromCart(productId);
            setCartItems((prev) =>
              prev.filter((item) => item.id !== productId)
            );
          },
        },
      ]
    );
  };

  const handleClearCart = () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to remove all items from your cart?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: async () => {
            await clearCart();
            setCartItems([]);
          },
        },
      ]
    );
  };

  const handleQuantityChange = async (
    productId: number,
    newQuantity: number
  ) => {
    if (newQuantity < 1) {
      handleRemoveItem(productId);
    } else {
      await updateQuantity(productId, newQuantity);
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />

      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
          >
            <Ionicons name="remove" size={16} color="#666" />
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
          >
            <Ionicons name="add" size={16} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.itemActions}>
        <Text style={styles.itemTotal}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveItem(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color="#FF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading cart...</Text>
      </View>
    );
  }

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="bag-outline" size={80} color="#ccc" />
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>
          Add some products to get started!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Shopping Cart ({getCartCount(cartItems)})
        </Text>
        {cartItems.length > 0 && (
          <TouchableOpacity onPress={handleClearCart}>
            <Text style={styles.clearButton}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        bounces={false}
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCartItem}
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total: </Text>
          <Text style={styles.totalAmount}>
            ${getCartTotal(cartItems).toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton} activeOpacity={0.8}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Rubik",
    fontWeight: "700",
    color: "#333",
  },
  clearButton: {
    color: "#FF4444",
    fontSize: 16,
    fontFamily: "Rubik",
    fontWeight: "600",
  },
  listContainer: {
    padding: 16,
  },
  cartItem: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: "contain",
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: "Rubik",
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
    marginRight: 10,
  },
  itemPrice: {
    fontSize: 14,
    fontFamily: "Rubik",
    color: "#666",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  quantityText: {
    fontSize: 16,
    fontFamily: "Rubik",
    fontWeight: "600",
    color: "#333",
    minWidth: 24,
    textAlign: "center",
  },
  itemActions: {
    alignItems: "center",
  },
  itemTotal: {
    fontSize: 16,
    fontFamily: "Rubik",
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  removeButton: {
    padding: 8,
  },
  footer: {
    backgroundColor: "white",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 20,
    fontFamily: "Rubik",
    fontWeight: "700",
    color: "#333",
  },
  totalAmount: {
    fontSize: 24,
    fontFamily: "Rubik",
    fontWeight: "700",
    color: "#6366F1",
  },
  checkoutButton: {
    backgroundColor: "#6366F1",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  checkoutText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Rubik",
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: "Rubik",
    fontWeight: "700",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    fontFamily: "Rubik",
    color: "#666",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    fontSize: 18,
    fontFamily: "Rubik",
    fontWeight: "500",
    color: "#666",
    marginTop: 16,
  },
});
