import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import pricingData from "../../utils/pricingData.json";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

export default function PricingScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(pricingData);

  const handleSearch = (query: any) => {
    setSearchQuery(query);
    if (query) {
      const filtered = pricingData.filter((item) =>
        item.ItemName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(pricingData);
    }
  };

  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, paddingHorizontal: 16, paddingTop: 60 }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <AntDesign name="leftcircleo" size={24} color="#FF725E" />
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Pricing Details</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="gray" />
          <TextInput
            placeholder="Search by cloth type"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.headerCell}>Cloth</Text>
            <Text style={styles.headerCell}>Washing Price</Text>
            <Text style={styles.headerCell}>Iron Price</Text>
            <Text style={styles.headerCell}>Dryclean Price</Text>
          </View>
          {filteredData.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>{item.ItemName}</Text>
              <Text style={styles.cell}>
                {item.WashIronPrice ? item.WashIronPrice : "-"}
              </Text>
              <Text style={styles.cell}>
                {item.IronPrice ? item.IronPrice : "-"}
              </Text>
              <Text style={styles.cell}>
                {item.DryCleanPrice ? item.DryCleanPrice : "-"}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF725E",
    marginBottom: 12,
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
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
    backgroundColor: "#FF725E",
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: "center",
  },
});
