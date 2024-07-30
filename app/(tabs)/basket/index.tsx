import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { router } from "expo-router";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  FontAwesome6,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";

interface PricingItem {
  ItemName: string;
  IronPrice: number | null;
  WashIronPrice: number | null;
  DryCleanPrice: number | null;
}

type RouteParams = {
  item?: string;
  totalPrice?: number;
};

export default function BasketScreen() {
  const route = useRoute<RouteProp<{ params: RouteParams }, "params">>();
  const { item } = route.params || {};

  const cartItems = useSelector((state: any) => state.cart.cart);

  const parsedItem: PricingItem = item
    ? JSON.parse(item)
    : {
        ItemName: "",
        IronPrice: null,
        WashIronPrice: null,
        DryCleanPrice: null,
      };

  const selectedItems = cartItems.filter(
    (item: any) =>
      item.selectedServices.Iron > 0 ||
      item.selectedServices.WashIron > 0 ||
      item.selectedServices.DryClean > 0
  );

  const totalPrice = selectedItems.reduce(
    (total: any, item: any) => total + item.totalPrice,
    0
  );

  const handleCheckout = () => {
    router.push({
      pathname: "/basket/cart",
      params: {
        selectedItems: JSON.stringify(selectedItems),
        totalPrice,
      },
    });
  };

  return (
    <LinearGradient
      colors={["#b521ff", "#691991", "#53007d"]}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={styles.headerContainer}>
          <Image
            style={styles.logo}
            source={require("@/assets/images/logo.png")}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <Ionicons name="basket" size={24} color="#FFF8E6" />
            <Text style={styles.title}>My Busket</Text>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.container}>
            {selectedItems.map((item: any, index: any) => (
              <View key={index} style={styles.itemSection}>
                <Text style={styles.sectionTitle}>{item.ItemName}</Text>
                {item.selectedServices.Iron > 0 && (
                  <Text>Iron: {item.selectedServices.Iron}</Text>
                )}
                {item.selectedServices.WashIron > 0 && (
                  <Text>Wash & Iron: {item.selectedServices.WashIron}</Text>
                )}
                {item.selectedServices.DryClean > 0 && (
                  <Text>Dry Clean: {item.selectedServices.DryClean}</Text>
                )}
                <Text>Total Price: BDT {item.totalPrice}</Text>
              </View>
            ))}
          </View>
          <View style={styles.priceSection}>
            <Text style={styles.sectionTitle}>Total Price</Text>
            <View style={styles.priceRow}>
              <FontAwesome6
                name="bangladeshi-taka-sign"
                size={24}
                color="black"
              />
              <Text style={styles.totalPrice}>{totalPrice}</Text>
            </View>
          </View>
        </View>
        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => router.push("/(tabs)/home/search")}
          >
            <Text style={styles.buttonText2}>Add more</Text>
            <FontAwesome5 name="cart-plus" size={24} color="#fff8e6" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleCheckout}
          >
            <Text style={styles.buttonText2}>Checkout</Text>
            <Ionicons name="bag-check" size={24} color="#fff8e6" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 12,
    backgroundColor: "#ffac5e",
  },
  container: {
    flex: 1,
    padding: 12,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    marginTop: 16,
  },
  header1: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  itemSection: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ffac5e",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemName: {
    fontSize: 18,
    marginLeft: 10,
  },
  priceSection: {
    marginBottom: 20,
    backgroundColor: "#fff8e6",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderWidth: 1,
    borderColor: "#dea981",
    width: "100%",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalPrice: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: "#ffac5e",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#dea981",
  },
  buttonText2: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
});
