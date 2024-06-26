import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import pricingData from "../../utils/pricingData.json";

export default function ItemsScreen() {
  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, paddingHorizontal: 16, paddingTop: 60 }}
    >
      <ScrollView style={styles.container}>
        <Text>Proceed to Select Items</Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: "Raleway_700Bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#FF725E",
  },
  itemCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    fontSize: 16,
    fontFamily: "Raleway_700Bold",
    color: "#333",
  },
  pricingContainer: {
    flex: 1,
    marginLeft: 10,
  },
  serviceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  priceText: {
    fontSize: 14,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#FF725E",
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
  countText: {
    fontSize: 16,
    color: "#333",
  },
});
