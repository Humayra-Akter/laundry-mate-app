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
      <View style={[styles.titleContainer, { backgroundColor: "#FF725E", padding:10, marginBottom:20}]}>
        <View style={styles.backIconContainer}>
          <Ionicons name="basket" size={32} color="#fff8e6" />
        </View>
        <Text style={styles.title}>My Basket</Text>
      </View>

      <View style={styles.itemSection}>
        <Text style={styles.sectionTitle}>Selected Item</Text>
        <View style={styles.itemRow}>
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
    backgroundColor: "#FFF",
  },
  backIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
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
  viewMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF725E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  viewMoreText: {
    fontSize: 18,
    color: "white",
    marginRight: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});
