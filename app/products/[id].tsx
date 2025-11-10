import ProductDetails, {
  ProductDetailsProps,
} from "@/components/ProductDetails/ProductDetails";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const ProductScreen = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<ProductDetailsProps["product"] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading product...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <ProductDetails
      product={product}
      isFavorite={isFavorite}
      onToggleFavorite={() => setIsFavorite(!isFavorite)}
    />
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
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
  errorText: {
    fontSize: 18,
    color: "#ff4444",
    fontFamily: "Rubik",
    fontWeight: "600",
    justifyContent: "center",
    textAlign: "center",
  },
});
