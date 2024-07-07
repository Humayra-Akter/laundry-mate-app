import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { router } from "expo-router";

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
      <Text style={styles.itemName}>Selected Item: {parsedItem.ItemName}</Text>
      <Text style={styles.totalPrice}>Total Price: BDT {totalPrice}</Text>
      <TouchableOpacity onPress={() => router.push("/basket/select")}>
        <Text>View more</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  itemName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  totalPrice: {
    fontSize: 20,
    color: "#FF725E",
  },
});
