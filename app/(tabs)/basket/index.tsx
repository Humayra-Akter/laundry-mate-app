import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { router } from "expo-router";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

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

export default function index() {
  const route = useRoute<RouteProp<{ params: RouteParams }, "params">>();
  const { item, totalPrice } = route.params || {};
  const parsedItem: PricingItem = item
    ? JSON.parse(item)
    : {
        ItemName: "",
        IronPrice: null,
        WashIronPrice: null,
        DryCleanPrice: null,
      };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="basket" size={32} color="#FF725E" />
        <Text style={styles.headerTitle}>My Basket</Text>
      </View>

      <View style={styles.itemSection}>
        <Text style={styles.sectionTitle}>Selected Item</Text>
        <View style={styles.itemRow}>
          <FontAwesome name="shirt" size={24} color="black" />
          <Text style={styles.itemName}>{parsedItem.ItemName}</Text>
        </View>
      </View>

      <View style={styles.priceSection}>
        <Text style={styles.sectionTitle}>Total Price</Text>
        <View style={styles.priceRow}>
          <MaterialIcons name="attach-money" size={24} color="black" />
          <Text style={styles.totalPrice}>BDT {totalPrice}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.viewMoreButton}
        onPress={() => router.push("/basket/select")}
      >
        <Text style={styles.viewMoreText}>View more</Text>
        <Ionicons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F6F7F9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#FF725E",
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
  viewMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF725E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  viewMoreText: {
    fontSize: 18,
    color: "white",
    marginRight: 10,
  },
});
