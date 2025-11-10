import { addToCart } from "@/app/(tabs)/cart";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Product = {
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

export type ProductsProps = {
  products: Product[];
};

const Products = ({ products }: ProductsProps) => {
  const handleAddToCart = async (product: Product) => {
    await addToCart(product);
    Alert.alert("Success", `${product.title} added to cart!`);
  };

  return (
    <FlatList
      bounces={false}
      data={products}
      contentContainerStyle={styles.listContainer}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <View style={styles.imageIconContainer}>
            <Image
              source={{ uri: item.image }}
              style={styles.itemImage}
              contentFit="contain"
            />
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.iconButton}
                activeOpacity={0.5}
                onPress={() => {}}
              >
                <Ionicons
                  name="arrow-forward-outline"
                  size={18}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                activeOpacity={0.5}
                onPress={() => {}}
              >
                <Ionicons name="heart-outline" size={18} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text
            style={styles.itemDescription}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {item.description}
          </Text>

          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>
              <Ionicons name="star" size={16} color="rgba(255, 158, 2, 1)" />{" "}
              {item.rating.rate}
            </Text>
            <Text style={styles.ratingCount}>
              ({item.rating.count} reviews)
            </Text>
          </View>

          <Text style={styles.itemPrice}>
            <Text style={styles.itemPriceLabel}>Price: </Text>${item.price}
          </Text>

          <Link href={`/products/${item.id}` as any} asChild>
            <TouchableOpacity
              style={styles.seeDetailsButton}
              activeOpacity={0.8}
            >
              <Text style={styles.seeDetailsText}>See Details</Text>
              <Ionicons
                name="arrow-forward-outline"
                size={22}
                color="#6366F1"
              />
            </TouchableOpacity>
          </Link>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cartButton}
              activeOpacity={0.5}
              onPress={() => handleAddToCart(item)}
            >
              <Ionicons name="cart-outline" size={24} color="#6366F1" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.addCartButton}
              activeOpacity={0.5}
              onPress={() => handleAddToCart(item)}
            >
              <Text style={styles.addCartText}>Add to cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};

export default Products;

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    backgroundColor: "#e9e9e9ff",
  },
  itemContainer: {
    borderColor: "#c8c6c6ff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 150,
    height: 150,
  },
  itemTitle: {
    marginTop: 20,
    fontSize: 18,
    fontFamily: "Rubik",
    fontWeight: "700",
    lineHeight: 22,
    letterSpacing: 0.6,
    color: "#000000ff",
  },
  itemPrice: {
    fontSize: 22,
    color: "#8B5CF6",
    fontFamily: "Rubik",
    fontWeight: "700",
    marginTop: 8,
  },
  itemPriceLabel: {
    fontSize: 16,
    color: "#666666",
    fontFamily: "Rubik",
    fontWeight: "500",
  },
  itemDescription: {
    marginVertical: 8,
    fontSize: 14,
    fontFamily: "Rubik",
    color: "#404040ff",
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  ratingContainer: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
    backgroundColor: "#fcf7ffff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  ratingText: {
    fontSize: 14,
    fontFamily: "Rubik",
    fontWeight: "700",
    color: "#333",
    marginRight: 8,
  },
  ratingCount: {
    fontSize: 12,
    color: "#888",
    fontFamily: "Rubik",
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  cartButton: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#8B5CF6",
  },
  addCartButton: {
    backgroundColor: "#8B5CF6",
    paddingVertical: 14,
    borderRadius: 12,
    flex: 1,
    marginLeft: 14,
    alignItems: "center",
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  addCartText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Rubik",
    fontWeight: "700",
  },
  imageIconContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  iconContainer: {
    marginLeft: 16,
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f6f6f6ff",
  },
  seeDetailsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(139, 92, 246, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.3)",
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 14,
  },
  seeDetailsText: {
    color: "#6366F1",
    fontSize: 15,
    fontFamily: "Rubik",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
