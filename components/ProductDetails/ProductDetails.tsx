import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export type ProductDetailsProps = {
  product: {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  };
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

const ProductDetails = ({
  product,
  isFavorite,
  onToggleFavorite,
}: ProductDetailsProps) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.productImage}
          contentFit="contain"
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onToggleFavorite}
          activeOpacity={0.8}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? "red" : "#666"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>
            {product.category.toUpperCase()}
          </Text>
        </View>

        <Text style={styles.title}>{product.title}</Text>

        <View style={styles.ratingContainer}>
          <View style={styles.ratingStars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name="star"
                size={16}
                color={
                  star <= Math.floor(product.rating.rate)
                    ? "#FFD700"
                    : "#E5E5E5"
                }
              />
            ))}
          </View>
          <Text style={styles.ratingText}>{product.rating.rate}</Text>
          <Text style={styles.ratingCount}>
            ({product.rating.count} reviews)
          </Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>${product.price}</Text>
          <View style={styles.priceTag}>
            <Text style={styles.priceTagText}>Best Price</Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addToCartButton} activeOpacity={0.8}>
            <Ionicons name="bag-outline" size={20} color="white" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buyNowButton} activeOpacity={0.8}>
            <Ionicons name="flash-outline" size={20} color="#8B5CF6" />
            <Text style={styles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <Ionicons
              name="shield-checkmark-outline"
              size={24}
              color="#4CAF50"
            />
            <Text style={styles.featureText}>Secure Payment</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="car-outline" size={24} color="#2196F3" />
            <Text style={styles.featureText}>Fast Delivery</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="return-up-back-outline" size={24} color="#FF9800" />
            <Text style={styles.featureText}>Easy Returns</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  imageContainer: {
    backgroundColor: "#f8f9fa",
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    position: "relative",
  },
  productImage: {
    width: 200,
    height: 300,
  },
  favoriteButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 25,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentContainer: {
    padding: 24,
  },
  categoryBadge: {
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    color: "white",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#000",
    lineHeight: 30,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  ratingStars: {
    flexDirection: "row",
    marginRight: 8,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginRight: 8,
  },
  ratingCount: {
    fontSize: 14,
    color: "#666",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  price: {
    fontSize: 30,
    fontWeight: "800",
    color: "#000",
    marginRight: 12,
  },
  priceTag: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priceTagText: {
    fontSize: 12,
    color: "white",
    fontWeight: "600",
  },
  descriptionContainer: {
    marginBottom: 32,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 16,
    lineHeight: 25,
    color: "#555",
    letterSpacing: 0.3,
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 32,
  },
  addToCartButton: {
    backgroundColor: "#8B5CF6",
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    gap: 8,
  },
  addToCartText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  buyNowButton: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#8B5CF6",
    borderRadius: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buyNowText: {
    color: "#8B5CF6",
    fontSize: 18,
    fontWeight: "700",
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f1f1f1ff",
    borderRadius: 16,
    padding: 20,
  },
  feature: {
    alignItems: "center",
    flex: 1,
  },
  featureText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4f4f4fff",
    marginTop: 8,
    textAlign: "center",
  },
});
