import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";

const Payment = () => {
  const cart = useSelector((state: any) => state.cart.cart);
  const selectedPickupDate = useSelector(
    (state: any) => state.date.selectedDate
  );
  const totalPrice = cart.reduce(
    (sum: number, item: any) => sum + item.totalPrice,
    0
  );
  const totalItems = cart.reduce(
    (sum: number, item: any) =>
      sum +
      item.selectedServices.WashIron +
      item.selectedServices.Iron +
      item.selectedServices.DryClean,
    0
  );

  const router = useRouter();

  const handleNavigateToPickup = () => {
    router.push("/(tabs)/home/pickup");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Payment</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <Text style={styles.text}>Total Price: BDT {totalPrice}</Text>
        <Text style={styles.text}>Total Items: {totalItems}</Text>
        {cart.map((item: any, index: number) => (
          <View key={index} style={styles.cartItem}>
            <Text style={styles.text}>{item.ItemName}</Text>
            <Text style={styles.text}>Iron: {item.selectedServices.Iron}</Text>
            <Text style={styles.text}>
              Wash & Iron: {item.selectedServices.WashIron}
            </Text>
            <Text style={styles.text}>
              Dry Clean: {item.selectedServices.DryClean}
            </Text>
            <Text style={styles.text}>Price: BDT {item.totalPrice}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pickup Details</Text>
        <Text style={styles.text}>
          Selected Pickup Date:{" "}
          {selectedPickupDate
            ? new Date(selectedPickupDate).toDateString()
            : "Not selected"}
        </Text>
        <TouchableOpacity
          style={styles.changeDateButton}
          onPress={handleNavigateToPickup}
        >
          <Text style={styles.changeDateButtonText}>Select Pickup Date</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Options</Text>
        <TouchableOpacity style={styles.paymentOption}>
          <Text style={styles.paymentOptionText}>Cash on Delivery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentOption}>
          <Text style={styles.paymentOptionText}>Credit Card</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  cartItem: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  changeDateButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#FF725E",
    borderRadius: 5,
    alignItems: "center",
  },
  changeDateButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  paymentOption: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  paymentOptionText: {
    fontSize: 16,
  },
});
