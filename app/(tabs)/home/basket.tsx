import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";

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

export default function Basket() {
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
