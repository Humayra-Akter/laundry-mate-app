import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import pricingData from "../../utils/pricingData.json";
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import { router } from "expo-router";

interface Item {
  ItemName: string;
  IronPrice: number | null;
  WashIronPrice: number | null;
  DryCleanPrice: number | null;
  IronCount: number;
  WashIronCount: number;
  DryCleanCount: number;
}

const initializeItems = (data: any[]): Item[] => {
  return data.map((item) => ({
    ...item,
    IronPrice: item.IronPrice !== null ? Number(item.IronPrice) : null,
    WashIronPrice:
      item.WashIronPrice !== null ? Number(item.WashIronPrice) : null,
    DryCleanPrice:
      item.DryCleanPrice !== null ? Number(item.DryCleanPrice) : null,
    IronCount: 0,
    WashIronCount: 0,
    DryCleanCount: 0,
  }));
};

export default function ItemsScreen() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  const [items, setItems] = useState<Item[]>(initializeItems(pricingData));
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAnyItemAdded, setIsAnyItemAdded] = useState<boolean>(false);

  const handleAddItem = (
    index: number,
    serviceType: "IronCount" | "WashIronCount" | "DryCleanCount"
  ) => {
    const updatedItems = [...items];
    updatedItems[index][serviceType] += 1;
    setItems(updatedItems);
    setIsAnyItemAdded(true);
  };

  const handleRemoveItem = (
    index: number,
    serviceType: "IronCount" | "WashIronCount" | "DryCleanCount"
  ) => {
    const updatedItems = [...items];
    if (updatedItems[index][serviceType] > 0) {
      updatedItems[index][serviceType] -= 1;
      setItems(updatedItems);
    }
    const anyItemAdded = updatedItems.some(
      (item) =>
        item.IronCount > 0 || item.WashIronCount > 0 || item.DryCleanCount > 0
    );
    setIsAnyItemAdded(anyItemAdded);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // const handleCheckout = () => {
  //   const selectedItems = items.filter(
  //     (item) =>
  //       item.IronCount > 0 || item.WashIronCount > 0 || item.DryCleanCount > 0
  //   );

  //   if (selectedItems.length === 0) {
  //     Alert.alert("No items selected", "Please select at least one item.");
  //     return;
  //   }
  //   Alert.alert("Checkout", "Proceeding to checkout with selected items.");
  // };

  const handleCheckout = async () => {
    const selectedItems = items.filter(
      (item) =>
        item.IronCount > 0 || item.WashIronCount > 0 || item.DryCleanCount > 0
    );

    if (selectedItems.length === 0) {
      Alert.alert("No items selected", "Please select at least one item.");
      return;
    }

    try {
      const response = await fetch(`192.168.1.170:5000/selectedItems`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, items: selectedItems }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          Alert.alert(
            "Order Placed",
            "Your order has been successfully placed!"
          );
          // router.push("/(routes)/checkout");
        });
    } catch (error) {
      console.error("Error placing order:", error);
      Alert.alert("Error", "Failed to place order. Please try again later.");
    }
  };

  const filteredItems = items.filter((item) =>
    item.ItemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, paddingHorizontal: 16, paddingTop: 60 }}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Proceed to Select Items</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="gray" />
          <TextInput
            placeholder="Search by cloth type"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        {filteredItems.map((item, index) => (
          <View key={index} style={styles.itemCard}>
            <Text style={styles.itemName}>{item.ItemName}</Text>
            <View style={styles.pricingContainer}>
              {item.IronPrice !== null && (
                <View style={styles.serviceContainer}>
                  <Text style={styles.priceText}>Iron: ${item.IronPrice}</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => handleRemoveItem(index, "IronCount")}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.countText}>{item.IronCount}</Text>
                    <TouchableOpacity
                      onPress={() => handleAddItem(index, "IronCount")}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {item.WashIronPrice !== null && (
                <View style={styles.serviceContainer}>
                  <Text style={styles.priceText}>
                    Wash & Iron: ${item.WashIronPrice}
                  </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => handleRemoveItem(index, "WashIronCount")}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.countText}>{item.WashIronCount}</Text>
                    <TouchableOpacity
                      onPress={() => handleAddItem(index, "WashIronCount")}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {item.DryCleanPrice !== null && (
                <View style={styles.serviceContainer}>
                  <Text style={styles.priceText}>
                    Dry Clean: ${item.DryCleanPrice}
                  </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => handleRemoveItem(index, "DryCleanCount")}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.countText}>{item.DryCleanCount}</Text>
                    <TouchableOpacity
                      onPress={() => handleAddItem(index, "DryCleanCount")}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
      {isAnyItemAdded && (
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      )}
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
  },
  itemName: {
    fontSize: 16,
    fontFamily: "Raleway_700Bold",
    color: "#333",
  },
  pricingContainer: {
    marginTop: 10,
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
    flex: 1,
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
  searchContainer: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginTop: 18,
    borderColor: "#FF725E",
    borderWidth: 1,
    marginBottom: 10,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
  },
  checkoutButton: {
    backgroundColor: "#FF725E",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  checkoutText: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "Raleway_700Bold",
  },
});
