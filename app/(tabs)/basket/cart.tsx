import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { useRoute, RouteProp } from "@react-navigation/native";

type RouteParams = {
  selectedItems: string;
  totalPrice: number;
};

const Cart = () => {
  const route = useRoute<RouteProp<{ params: RouteParams }, "params">>();
  const { selectedItems, totalPrice } = route.params || {};
  const items = selectedItems ? JSON.parse(selectedItems) : [];
  return (
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
        {items.map((item: any, index: any) => (
          <View style={styles.cartItem} key={index}>
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
                style={styles.addIcon}
                onPress={() => router.push("/(tabs)/home/search")}
              >
                <MaterialCommunityIcons
                  name="delete-circle"
                  size={30}
                  color="#FF725E"
                />
              </Pressable>
            </View>
          </View>
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText2}>Empty Basket</Text>
          <FontAwesome5 name="cart-plus" size={24} color="#fff8e6" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => router.push("/basket/payment")}
        >
          <Text style={styles.buttonText2}>Payment</Text>
          <Ionicons name="bag-check" size={24} color="#fff8e6" />
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    marginVertical: 13,
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
  addIcon: {
    position: "absolute",
    top: 5,
    right: 5,
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
});
