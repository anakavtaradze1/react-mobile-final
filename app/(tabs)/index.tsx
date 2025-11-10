import Products, { ProductsProps } from "@/components/Products/Products";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Index = () => {
  const [products, setProducts] = useState<ProductsProps["products"] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7f4afcff" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (!products) {
    return (
      <View>
        <Text style={styles.errorText}>Error loading products</Text>
      </View>
    );
  }

  return <Products products={products} />;
};

export default Index;

const styles = StyleSheet.create({
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
  errorText: {
    color: "red",
    fontSize: 24,
    fontFamily: "Rubik",
    justifyContent: "center",
    textAlign: "center",
  },
});
