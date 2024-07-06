import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const cart = () => {
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.headerText}>Basket Total</Text>
        <View>
          <Text style={styles.headerText}>Rs</Text>
          <Text style={styles.headerText}>for {cart.length} items</Text>
        </View>
      </View>

      <Text style={styles.cartItemsText}>Cart Items</Text>

      <View style={styles.cartItemsContainer}>
        <Pressable style={styles.cartItem}>
          <View>
            <Image
              style={styles.cartItemImage}
              source={require("@/assets/images/logo.png")}
            />
          </View>

          <View style={styles.cartItemDetails}>
            <Text>item.name</Text>
            <Text>item.price * item?.item.quantity</Text>
          </View>

          <Pressable>
            <AntDesign name="pluscircleo" size={24} color="#89CFF0" />
          </Pressable>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.emptyBasketButton}>
          <Text style={styles.emptyBasketButtonText}>Empty Basket</Text>
        </Pressable>
        <Pressable style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default cart;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#cc9664",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  cartItemsText: {
    padding: 10,
  },
  cartItemsContainer: {
    marginHorizontal: 12,
  },
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    marginVertical: 13,
    flexDirection: "row",
    gap: 12,
    borderRadius: 5,
  },
  cartItemImage: {
    width: 40,
    height: 40,
  },
  cartItemDetails: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    gap: 12,
    marginTop: 30,
  },
  emptyBasketButton: {
    backgroundColor: "#d0d0d0",
    padding: 15,
    borderRadius: 10,
    flex: 1,
  },
  emptyBasketButtonText: {
    textAlign: "center",
    fontWeight: "500",
  },
  checkoutButton: {
    backgroundColor: "#cc9664",
    padding: 15,
    borderRadius: 10,
    flex: 1,
  },
  checkoutButtonText: {
    textAlign: "center",
    color: "#000",
    fontWeight: "500",
  },
});
