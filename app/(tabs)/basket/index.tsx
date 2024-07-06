import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Basket Total</Text>
        <View>
          <Text style={styles.basketInfo}>BDT 0</Text>
          <Text style={styles.basketInfo}>FOR 0 ITEMS</Text>
        </View>
      </View>

      <View style={styles.basketEmpty}>
        <Text style={styles.basketEmptyText}>YOUR BASKET IS EMPTY</Text>
      </View>

      <Pressable
        onPress={() => router.push("/basket/select")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Place an Order</Text>
      </Pressable>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    backgroundColor: "#cc9664",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  basketInfo: {
    color: "#000",
    fontSize: 14,
    fontWeight: "semibold",
  },
  basketEmpty: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 7,
    marginTop: 20,
    marginHorizontal: 10,
    height: 200,
  },
  basketEmptyText: {
    fontSize: 15,
    fontWeight: "600",
  },
  button: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    width: 200,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 8,
    backgroundColor: "#cc9664",
  },
  buttonText: {
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
