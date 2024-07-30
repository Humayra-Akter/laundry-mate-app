import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/CartReducer";
import { LinearGradient } from "expo-linear-gradient";
import { CartItem, SelectedServices } from "../../../redux/types";

interface PricingItem {
  ItemName: string;
  IronPrice: number | null;
  WashIronPrice: number | null;
  DryCleanPrice: number | null;
}

type RouteParams = {
  item: string;
};

type Service = "Iron" | "WashIron" | "DryClean";

export default function AddToCart() {
  const route = useRoute<RouteProp<{ params: RouteParams }, "params">>();
  const { item } = route.params;
  const parsedItem: PricingItem = JSON.parse(item);

  const [selectedServices, setSelectedServices] = useState<SelectedServices>({
    Iron: 0,
    WashIron: 0,
    DryClean: 0,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const ironSubtotal = (parsedItem.IronPrice ?? 0) * selectedServices.Iron;
    const washIronSubtotal =
      (parsedItem.WashIronPrice ?? 0) * selectedServices.WashIron;
    const dryCleanSubtotal =
      (parsedItem.DryCleanPrice ?? 0) * selectedServices.DryClean;

    setTotalPrice(ironSubtotal + washIronSubtotal + dryCleanSubtotal);
  }, [selectedServices]);

  const incrementService = (service: Service) => {
    setSelectedServices((prev) => ({
      ...prev,
      [service]: prev[service] + 1,
    }));
  };

  const decrementService = (service: Service) => {
    setSelectedServices((prev) => ({
      ...prev,
      [service]: prev[service] > 0 ? prev[service] - 1 : 0,
    }));
  };

  const handleAddToCart = () => {
    const item: CartItem = {
      ItemName: parsedItem.ItemName,
      selectedServices,
      totalPrice,
    };

    dispatch(addToCart(item));

    router.push({
      pathname: "/(tabs)/basket",
    });
  };

  const isAddToCartDisabled =
    selectedServices.Iron === 0 &&
    selectedServices.WashIron === 0 &&
    selectedServices.DryClean === 0;

  return (
    <LinearGradient
      colors={["#b521ff", "#691991", "#53007d"]}
      style={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemName}>{parsedItem.ItemName}</Text>
        </View>
        <View style={styles.priceContainer}>
          {parsedItem.IronPrice !== null && (
            <View style={styles.serviceContainer}>
              <Text style={styles.priceText}>
                Iron Price: BDT {parsedItem.IronPrice}
              </Text>
              <View style={styles.counterContainer}>
                <TouchableOpacity
                  onPress={() => decrementService("Iron")}
                  style={styles.counterButton}
                >
                  <Text style={styles.counterText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterValue}>{selectedServices.Iron}</Text>
                <TouchableOpacity
                  onPress={() => incrementService("Iron")}
                  style={styles.counterButton}
                >
                  <Text style={styles.counterText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {parsedItem.WashIronPrice !== null && (
            <View style={styles.serviceContainer}>
              <Text style={styles.priceText}>
                Wash and Iron Price: BDT {parsedItem.WashIronPrice}
              </Text>
              <View style={styles.counterContainer}>
                <TouchableOpacity
                  onPress={() => decrementService("WashIron")}
                  style={styles.counterButton}
                >
                  <Text style={styles.counterText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterValue}>
                  {selectedServices.WashIron}
                </Text>
                <TouchableOpacity
                  onPress={() => incrementService("WashIron")}
                  style={styles.counterButton}
                >
                  <Text style={styles.counterText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {parsedItem.DryCleanPrice !== null && (
            <View style={styles.serviceContainer}>
              <Text style={styles.priceText}>
                Dry Clean Price: BDT {parsedItem.DryCleanPrice}
              </Text>
              <View style={styles.counterContainer}>
                <TouchableOpacity
                  onPress={() => decrementService("DryClean")}
                  style={styles.counterButton}
                >
                  <Text style={styles.counterText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterValue}>
                  {selectedServices.DryClean}
                </Text>
                <TouchableOpacity
                  onPress={() => incrementService("DryClean")}
                  style={styles.counterButton}
                >
                  <Text style={styles.counterText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceText}>
            Total Price: BDT {totalPrice.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.addButton,
            isAddToCartDisabled && styles.disabledButton,
          ]}
          onPress={handleAddToCart}
          disabled={isAddToCartDisabled}
        >
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  itemContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  itemName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffa",
    textAlign: "center",
    marginTop: 20,
  },
  priceContainer: {
    marginVertical: 16,
  },
  serviceContainer: {
    marginVertical: 8,
    borderWidth: 0.2,
    borderRadius: 10,
    backgroundColor: "#fff8e6",
  },
  priceText: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    marginTop: 12,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  counterButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#ffac5e",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  counterText: {
    fontSize: 24,
    color: "#000",
    fontWeight: "bold",
  },
  counterValue: {
    fontSize: 24,
    color: "#000",
    fontWeight: "bold",
    paddingHorizontal: 16,
  },
  totalPriceContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  totalPriceText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  addButton: {
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#ffac5e",
    marginVertical: 16,
  },
  disabledButton: {
    backgroundColor: "#ffac5e",
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});
