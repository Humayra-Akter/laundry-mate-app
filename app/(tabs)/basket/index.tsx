import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { router } from "expo-router";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
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
    <LinearGradient colors={["#fff", "#fafafa"]} style={{ flex: 1 }}>
      <View
        style={[
          styles.titleContainer,
          { backgroundColor: "#FF725E", padding: 10, marginBottom: 20 },
        ]}
      >
        <View style={styles.backIconContainer}>
          <Ionicons name="basket" size={32} color="#fff8e6" />
        </View>
        <Text style={styles.title}>My Basket</Text>
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
            <MaterialIcons name="attach-money" size={24} color="black" />
            <Text style={styles.totalPrice}>BDT {totalPrice}</Text>
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  backIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 12,
  },
  itemSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FF725E",
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
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalPrice: {
    fontSize: 20,
    color: "#FF725E",
    marginLeft: 10,
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
    backgroundColor: "#FF725E",
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
