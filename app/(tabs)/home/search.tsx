import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import pricingData from "../../../data/pricingData.json";
import { router } from "expo-router";

interface PricingItem {
  ItemName: string;
  IronPrice: number | null;
  WashIronPrice: number | null;
  DryCleanPrice: number | null;
}

export default function Search() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredServices, setFilteredServices] = useState<PricingItem[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (searchQuery) {
      const filtered = pricingData.filter((item: PricingItem) =>
        item.ItemName.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      setFilteredServices(filtered);
    } else {
      setFilteredServices([]);
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSelectItem = (item: PricingItem) => {
    router.push({
      pathname: "/home/addToCart",
      params: { item: JSON.stringify(item) },
    });
  };

  const renderServiceItem = ({ item }: { item: PricingItem }) => (
    <TouchableOpacity
      style={styles.serviceItem}
      onPress={() => handleSelectItem(item)}
    >
      <Text style={styles.serviceName}>{item.ItemName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchQuery}
        onChangeText={handleSearch}
        autoFocus
      />
      <FlatList
        data={filteredServices}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.ItemName}
        style={styles.resultList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  resultList: {
    marginTop: 16,
  },
  serviceItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  serviceName: {
    fontSize: 16,
  },
});
