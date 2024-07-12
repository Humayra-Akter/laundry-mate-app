import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../../../redux/CartReducer";
import { CartItem } from "../../../redux/types";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

type RouteParams = {
  selectedItems: string;
  totalPrice: number;
};

const Cart = () => {
  const route = useRoute<RouteProp<{ params: RouteParams }, "params">>();
  const { selectedItems, totalPrice } = route.params || {};
  const initialItems: CartItem[] = selectedItems
    ? JSON.parse(selectedItems)
    : [];
  const [items, setItems] = useState(initialItems);
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart.cart);

  useEffect(() => {
    setItems(cart);
  }, [cart]);

  const handleDelete = (itemName: string) => {
    dispatch(removeFromCart(itemName));
  };

  const handleEmptyCart = () => {
    dispatch(clearCart());
  };

  const isCartEmpty = items.length === 0;

  const renderRightActions = (progress: any, dragX: any, itemName: string) => {
    return (
      <View style={styles.rightAction}>
        <Pressable onPress={() => handleDelete(itemName)}>
          <MaterialCommunityIcons
            name="delete-circle"
            size={30}
            color="#fff8e6"
          />
        </Pressable>
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Basket Total</Text>
          <View>
            <Text style={styles.headerText}>BDT {totalPrice}</Text>
            <Text style={styles.headerText}>for {items.length} items</Text>
          </View>
        </View>

        <Text style={styles.cartItemsText}>Cart Items</Text>
        <View style={styles.cartItemsContainer}>
          {items.map((item, index) => (
            <Swipeable
              key={index}
              renderRightActions={(progress, dragX) =>
                renderRightActions(progress, dragX, item.ItemName)
              }
            >
              <View style={styles.cartItem}>
                <Image
                  style={styles.cartItemImage}
                  source={require("@/assets/images/logo.png")}
                />
                <View style={styles.cartItemDetails}>
                  <View style={styles.cartSingleItem}>
                    <Text style={{ fontWeight: "bold" }}>{item.ItemName}</Text>
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
                  <Pressable
                    style={styles.deleteIcon}
                    onPress={() => handleDelete(item.ItemName)}
                  >
                    <MaterialCommunityIcons
                      name="delete-circle"
                      size={30}
                      color="#FF725E"
                    />
                  </Pressable>
                </View>
              </View>
            </Swipeable>
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              isCartEmpty && styles.buttonDisabled,
            ]}
            onPress={handleEmptyCart}
            disabled={isCartEmpty}
          >
            <Text
              style={[
                styles.buttonText2,
                isCartEmpty && styles.buttonTextDisabled,
              ]}
            >
              Empty Basket
            </Text>
            <FontAwesome5 name="cart-plus" size={24} color="#fff8e6" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              isCartEmpty && styles.buttonDisabled,
            ]}
            onPress={() => router.push("/basket/payment")}
            disabled={isCartEmpty}
          >
            <Text
              style={[
                styles.buttonText2,
                isCartEmpty && styles.buttonTextDisabled,
              ]}
            >
              Payment
            </Text>
            <MaterialIcons name="payment" size={24} color="#fff8e6" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FF725E",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  cartItemsText: {
    padding: 10,
    color: "#FF725E",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },
  cartItemsContainer: {
    marginHorizontal: 12,
  },
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    marginVertical: 2,
    flexDirection: "row",
    gap: 12,
    borderRadius: 5,
    alignItems: "flex-start",
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  cartItemImage: {
    width: 40,
    height: 40,
  },
  cartItemDetails: {
    flex: 1,
    position: "relative",
  },
  cartSingleItem: {
    backgroundColor: "#fff8e6",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    margin: 5,
    borderWidth: 1,
    borderColor: "#dea981",
    width: "85%",
  },
  deleteIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  rightAction: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    backgroundColor: "#FF725E",
    marginVertical: 2,
    borderRadius: 5,
  },
  footer: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    gap: 12,
    marginTop: 30,
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
  },
  buttonText2: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonDisabled: {
    backgroundColor: "#E0E0E0",
  },
  buttonTextDisabled: {
    color: "#A0A0A0",
  },
});
