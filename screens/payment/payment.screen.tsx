import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export default function PaymentScreen() {
  const handlePaymentOption = (option: string) => {
    console.log(`Selected Payment Option: ${option}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Payment Method</Text>

      <TouchableOpacity
        style={styles.paymentOption}
        onPress={() => handlePaymentOption("Cash on Delivery")}
      >
        <Text style={styles.paymentText}>Cash on Delivery</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.paymentOption}
        onPress={() => handlePaymentOption("Credit Payment")}
      >
        <Text style={styles.paymentText}>Credit Payment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#E5ECF9",
  },
  title: {
    fontSize: 24,
    fontFamily: "Raleway_700Bold",
    textAlign: "center",
    marginBottom: 40,
    color: "#FF725E",
  },
  paymentOption: {
    width: "80%",
    padding: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF725E",
  },
  paymentText: {
    fontSize: 18,
    fontFamily: "Raleway_700Bold",
    color: "#333",
  },
});
