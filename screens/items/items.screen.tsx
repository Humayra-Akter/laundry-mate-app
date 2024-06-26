import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import pricingData from "../../utils/pricingData.json";
import { Ionicons } from "@expo/vector-icons";

interface Item {
  ItemName: string;
  IronPrice: number | null;
  WashIronPrice: number | null;
  DryCleanPrice: number | null;
  IronCount: number;
  WashIronCount: number;
  DryCleanCount: number;
}

const initializeItems = (data: Item[]): Item[] => {
  return data.map((item) => ({
    ...item,
    IronCount: 0,
    WashIronCount: 0,
    DryCleanCount: 0,
  }));
};

export default function ItemsScreen() {
  const [items, setItems] = useState(initializeItems(pricingData));
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(
    initializeItems(pricingData)
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filtered = items.filter((item) =>
        item.ItemName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(items);
    }
  };


  const handleAddItem = (index: number, serviceType: keyof Item) => {
    const updatedItems: any = [...items];
    updatedItems[index][serviceType] =
      (updatedItems[index][serviceType] || 0) + 1;
    setItems(updatedItems);
  };

  const handleRemoveItem = (index: number, serviceType: keyof Item) => {
    const updatedItems: any = [...items];
    if (updatedItems[index][serviceType] > 0) {
      updatedItems[index][serviceType] -= 1;
      setItems(updatedItems);
    }
  };

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

        {filteredData.map((item, index) => (
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
                    <Text style={styles.countText}>{item.IronCount || 0}</Text>
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
                    <Text style={styles.countText}>
                      {item.WashIronCount || 0}
                    </Text>
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
                    <Text style={styles.countText}>
                      {item.DryCleanCount || 0}
                    </Text>
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
    flexShrink: 1,
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
});
