import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import pricelist from "../../../data/pricingData.json";
import { router } from "expo-router";

interface PricingItem {
  ItemName: string;
  IronPrice: number | null;
  WashIronPrice: number | null;
  DryCleanPrice: number | null;
}

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
    const filtered = pricelist.filter((item: PricingItem) => {
      const matchesInitial = item.ItemName.toLowerCase().startsWith(
        text.toLowerCase()
      );
      const matchesService =
        (selectedService === "Iron" && item.IronPrice !== null) ||
        (selectedService === "WashIron" && item.WashIronPrice !== null) ||
        (selectedService === "DryClean" && item.DryCleanPrice !== null);
      return matchesInitial && matchesService;
    });
    setFilteredItems(filtered);
    setSearchText(text);
  };

  const filterByService = (service: "Iron" | "WashIron" | "DryClean") => {
    const filtered = pricelist.filter(
      (item: PricingItem) => item[`${service}Price`] !== null
    );
    setFilteredItems(filtered);
    setSelectedService(service);
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
      {/* Top section */}
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.pgTitle}>Laundry Mate</Text>
      </View>

      {/* search  */}
      <View style={styles.searchBarContainer}>
        <Ionicons
          name="search"
          size={24}
          color="gray"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Search items..."
          value={searchText}
          onChangeText={filterItems}
        />
      </View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 8,
    marginRight: 10,
  },
  pgTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#752100",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#FF725E",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 30,
    backgroundColor: "#FFF",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
  },
  serviceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 36,
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
  serviceTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF725E",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    backgroundColor: "#FFF8E6",
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
    fontSize: 16,
    color: "#000",
    width: "40%",
  },
  priceText: {
    fontSize: 16,
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
