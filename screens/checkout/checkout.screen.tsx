import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

interface Item {
  ItemName: string;
  IronPrice: number | null;
  WashIronPrice: number | null;
  DryCleanPrice: number | null;
  IronCount: number;
  WashIronCount: number;
  DryCleanCount: number;
}

interface User {
  user: any;
  items: Item[];
}

export default function CheckoutScreen() {
  const [selectedItems, setSelectedItems] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://10.103.131.53:5000/selectedItems")
      .then((response) => response.json())
      .then((data) => setSelectedItems(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, paddingHorizontal: 16, paddingTop: 60 }}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Checkout Items</Text>

        {selectedItems.map((userItem, userIndex) => (
          <View key={userIndex}>
            <Text style={styles.userTitle}>{userItem.user.email}</Text>
            {userItem.items.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.itemCard}>
                <Text style={styles.itemName}>{item.ItemName}</Text>
                <View style={styles.pricingContainer}>
                  {item.IronPrice !== null && (
                    <View style={styles.serviceContainer}>
                      <Text style={styles.priceText}>
                        Iron: BDT{item.IronPrice}
                      </Text>
                      <Text style={styles.countText}>
                        Count: {item.IronCount}
                      </Text>
                    </View>
                  )}
                  {item.WashIronPrice !== null && (
                    <View style={styles.serviceContainer}>
                      <Text style={styles.priceText}>
                        Wash & Iron: BDT{item.WashIronPrice}
                      </Text>
                      <Text style={styles.countText}>
                        Count: {item.WashIronCount}
                      </Text>
                    </View>
                  )}
                  {item.DryCleanPrice !== null && (
                    <View style={styles.serviceContainer}>
                      <Text style={styles.priceText}>
                        Dry Clean: BDT{item.DryCleanPrice}
                      </Text>
                      <Text style={styles.countText}>
                        Count: {item.DryCleanCount}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        ))}
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
  userTitle: {
    fontSize: 18,
    fontFamily: "Raleway_700Bold",
    marginVertical: 10,
    color: "#333",
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
  countText: {
    fontSize: 16,
    color: "#333",
  },
});
