import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import pricelist from "../../../data/pricingData.json";
import { router } from "expo-router";

interface PricingItem {
  ItemName: string;
  IronPrice: number | null;
  WashIronPrice: number | null;
  DryCleanPrice: number | null;
}

const categories = ["Men", "Women", "Baby", "Household"]; // Example categories

export default function Select() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState<PricingItem[]>([]);
  const [selectedService, setSelectedService] = useState<
    "Iron" | "WashIron" | "DryClean" | null
  >(null);

  useEffect(() => {
    setFilteredItems(pricelist);
  }, []);

  const filterItems = (text: string) => {
    const filtered = pricelist.filter((item: any) =>
      item.ItemName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(filtered);
    setSearchText(text);
  };

  const filterByService = (service: "Iron" | "WashIron" | "DryClean") => {
    const filtered = pricelist.filter(
      (item: any) => item[`${service}Price`] !== null
    );
    setFilteredItems(filtered);
    setSelectedService(service);
  };

  const filterByCategory = (category: string) => {
    setFilteredItems(pricelist);
  };

  const handleAddToCart = (item: PricingItem) => {
    router.push({
      pathname: "/(tabs)/home/addToCart",
      params: {
        item: JSON.stringify(item),
      },
    });
  };

  const renderPricingItem = ({ item }: { item: PricingItem }) => {
    let price = null;
    if (selectedService === "Iron") price = item.IronPrice;
    else if (selectedService === "WashIron") price = item.WashIronPrice;
    else if (selectedService === "DryClean") price = item.DryCleanPrice;

    return (
      <View style={styles.itemRow}>
        <Text style={styles.itemText}>{item.ItemName}</Text>
        {price !== null ? (
          <Text style={styles.priceText}>BDT {price}</Text>
        ) : (
          <Text style={styles.notAvailableText}>Not Available</Text>
        )}
        <TouchableOpacity
          style={[styles.addButton, price === null && styles.disabledButton]}
          onPress={() => handleAddToCart(item)}
          disabled={price === null}
        >
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const getServiceTitle = () => {
    if (selectedService === "Iron") return "Ironing Prices";
    if (selectedService === "WashIron") return "Washing Prices";
    if (selectedService === "DryClean") return "Dry Cleaning Prices";
    return "";
  };

  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search items..."
        value={searchText}
        onChangeText={filterItems}
      />
      <ScrollView horizontal contentContainerStyle={styles.serviceContainer}>
        <TouchableOpacity
          style={[
            styles.serviceButton,
            selectedService === "WashIron" && styles.selectedServiceButton,
          ]}
          onPress={() => filterByService("WashIron")}
        >
          <Text
            style={[
              styles.serviceButtonText,
              selectedService === "WashIron" &&
                styles.selectedServiceButtonText,
            ]}
          >
            Washing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.serviceButton,
            selectedService === "Iron" && styles.selectedServiceButton,
          ]}
          onPress={() => filterByService("Iron")}
        >
          <Text
            style={[
              styles.serviceButtonText,
              selectedService === "Iron" && styles.selectedServiceButtonText,
            ]}
          >
            Ironing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.serviceButton,
            selectedService === "DryClean" && styles.selectedServiceButton,
          ]}
          onPress={() => filterByService("DryClean")}
        >
          <Text
            style={[
              styles.serviceButtonText,
              selectedService === "DryClean" &&
                styles.selectedServiceButtonText,
            ]}
          >
            Dry Cleaning
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <ScrollView horizontal contentContainerStyle={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={styles.categoryButton}
            onPress={() => filterByCategory(category)}
          >
            <Text style={styles.categoryButtonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selectedService && (
        <Text style={styles.serviceTitle}>{getServiceTitle()}</Text>
      )}
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Item Name</Text>
        <Text style={styles.headerText}>Price</Text>
        <Text style={styles.headerText}>Action</Text>
      </View>
      <FlatList
        data={filteredItems}
        renderItem={renderPricingItem}
        keyExtractor={(item) => item.ItemName}
        contentContainerStyle={styles.itemList}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    height: 40,
    borderColor: "#FF725E",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 30,
    backgroundColor: "#FFF",
    marginTop: 40,
  },
  serviceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    height: 45,
    marginLeft: "auto",
    marginRight: "auto",
  },
  serviceButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#FF725E",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
  },
  selectedServiceButton: {
    backgroundColor: "#FF725E",
  },
  selectedServiceButtonText: {
    color: "#FFF",
  },
  serviceButtonText: {
    fontSize: 16,
    color: "#FF725E",
    fontWeight: "bold",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    height: 45,
    marginLeft: "auto",
    marginRight: "auto",
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#FF725E",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    alignItems: "center",
  },
  categoryButtonText: {
    fontSize: 16,
    color: "#FF725E",
    fontWeight: "bold",
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF725E",
    textAlign: "center",
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "#E5ECF9",
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    width: "30%",
    textAlign: "center",
  },
  itemList: {
    paddingBottom: 100,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 10,
  },
  itemText: {
    fontSize: 18,
    color: "#000",
    width: "40%",
  },
  priceText: {
    fontSize: 18,
    color: "#000",
    width: "20%",
    textAlign: "center",
  },
  notAvailableText: {
    fontSize: 18,
    color: "gray",
    width: "20%",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#FF725E",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    alignItems: "center",
    width: "30%",
  },
  disabledButton: {
    backgroundColor: "#ccc",
    borderColor: "#ccc",
  },
  addButtonText: {
    fontSize: 16,
    color: "#FF725E",
    fontWeight: "bold",
  },
});
