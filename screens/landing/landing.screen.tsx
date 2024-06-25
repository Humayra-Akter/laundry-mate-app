import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  TextInput,
  FlatList,
} from "react-native";
import {
  useFonts,
  Raleway_700Bold,
  Raleway_600SemiBold,
} from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";

// Dummy JSON Data
const services = [
  {
    id: 1,
    title: "Wash & Fold",
    image: require("@/assets/landing/wash_fold.png"),
  },
  {
    id: 2,
    title: "Dry Cleaning",
    image: require("@/assets/landing/dry_cleaning.png"),
  },
  {
    id: 3,
    title: "Ironing",
    image: require("@/assets/landing/ironing.png"),
  },
  {
    id: 4,
    title: "Shirt Iron",
    image: require("@/assets/landing/shirt_iron.png"),
  },
  {
    id: 5,
    title: "Jacket Wash",
    image: require("@/assets/landing/jacket_wash.png"),
  },
  {
    id: 6,
    title: "Saree Dry Clean",
    image: require("@/assets/landing/saree_dry_clean.png"),
  },
];

const categories = [
  { id: 1, name: "Washing", icon: "tint" },
  { id: 2, name: "Ironing", icon: "cloud" },
  { id: 3, name: "Dry Cleaning", icon: "magic" },
];

const items = [
  {
    id: 1,
    name: "Shirt",
    image: require("@/assets/landing/shirt.png"),
    prices: { washing: "50tk", iron: "20tk", dryClean: "60tk" },
  },
  {
    id: 2,
    name: "Jacket",
    image: require("@/assets/landing/jacket.png"),
    prices: { washing: "100tk", iron: "50tk", dryClean: "150tk" },
  },
  {
    id: 3,
    name: "Saree",
    image: require("@/assets/landing/saree.png"),
    prices: { washing: "80tk", iron: "30tk", dryClean: "120tk" },
  },
  {
    id: 4,
    name: "Trousers",
    image: require("@/assets/landing/trousers.png"),
    prices: { washing: "70tk", iron: "25tk", dryClean: "90tk" },
  },
  {
    id: 5,
    name: "Blanket",
    image: require("@/assets/landing/blanket.png"),
    prices: { washing: "150tk", iron: "70tk", dryClean: "200tk" },
  },
  {
    id: 6,
    name: "T-shirt",
    image: require("@/assets/landing/tshirt.png"),
    prices: { washing: "40tk", iron: "15tk", dryClean: "50tk" },
  },
  {
    id: 7,
    name: "Dress",
    image: require("@/assets/landing/dress.png"),
    prices: { washing: "90tk", iron: "35tk", dryClean: "110tk" },
  },
];

export default function LandingScreen() {
  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Raleway_600SemiBold,
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontError && !fontsLoaded) {
    return <ActivityIndicator size="large" color="#FF725E" />;
  }

  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, paddingHorizontal: 16, paddingTop: 60 }}
    >
      <ScrollView>
        <Text style={styles.welcomeText}>Welcome to Laundry-Mate</Text>
        {/* search bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="gray" />
          <TextInput placeholder="Search" style={styles.searchInput} />
        </View>

        {/* carousel  */}
        <View style={styles.carouselContainer}>
          <FlatList
            data={services}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.carouselItem}>
                <Image source={item.image} style={styles.carouselImage} />
                <Text style={styles.carouselText}>{item.title}</Text>
              </View>
            )}
          />
        </View>

        {/* categories  */}
        <Text style={styles.categoryTitle}>Categories</Text>
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryItem}>
              <FontAwesome name={category.icon} size={24} color="#fff" />
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* services  */}
        <Text style={styles.sectionTitle}>Services</Text>
        <View style={styles.cardsContainer}>
          {items.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={item.image} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardText}>
                  Washing: {item.prices.washing}
                </Text>
                <Text style={styles.cardText}>Iron: {item.prices.iron}</Text>
                <Text style={styles.cardText}>
                  Dry Clean: {item.prices.dryClean}
                </Text>
                <TouchableOpacity style={styles.cardButton}>
                  <Text style={styles.cardButtonText}>Set Pickup Date</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* pricing pg route  */}
        <View style={styles.signUpRedirect}>
          <TouchableOpacity
            onPress={() => router.push("/(routes)/pricing")}
            style={{ flexDirection: "row", gap: 10, marginTop: 10 }}
          >
            <Text
              style={{
                fontFamily: "Raleway_700Bold",
                fontSize: 18,
                marginLeft: 4,
                color: "#000",
              }}
            >
              See all price list
            </Text>
            <Entypo name="arrow-with-circle-right" size={24} color="#FF725E" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  welcomeText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF725E",
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
  },

  searchInput: {
    marginLeft: 10,
    flex: 1,
  },
  carouselContainer: {
    alignItems: "center",
    marginVertical: 20,
    justifyContent: "center",
    height: 220,
  },

  carouselItem: {
    backgroundColor: "#faf0eb",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 5,
    marginHorizontal: 5,
    width: width * 0.8,
    marginTop: 10,
  },
  carouselImage: {
    width: "50%",
    height: 140,
    borderRadius: 10,
  },
  carouselText: {
    marginTop: 10,
    fontFamily: "Raleway_700Bold",
    fontSize: 16,
  },
  categoryTitle: {
    fontSize: 22,
    color: "#FF725E",
    fontFamily: "Raleway_700Bold",
    marginLeft: 10,
    marginTop: 20,
    textAlign: "center",
  },

  categoryContainer: {
    flexDirection: "row",
    // flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
  },
  categoryItem: {
    backgroundColor: "#FF725E",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
    // flexDirection: "row",
    alignItems: "center",
  },

  categoryText: {
    color: "#fff",
    fontFamily: "Raleway_600SemiBold",
    fontSize: 16,
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: "Raleway_700Bold",
    marginLeft: 10,
    marginTop: 20,
    textAlign: "center",
    color: "#FF725E",
  },
  cardsContainer: {
    marginTop: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  cardContent: {
    marginLeft: 10,
    flex: 1,
  },
  cardTitle: {
    fontFamily: "Raleway_700Bold",
    fontSize: 16,
    marginBottom: 5,
  },
  cardText: {
    fontFamily: "Nunito_400Regular",
    fontSize: 14,
    marginBottom: 2,
  },
  cardButton2: {
    backgroundColor: "#FF725E",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    alignSelf: "flex-start",
  },
  cardButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FF725E",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  cardButtonText: {
    color: "#fff",
    fontFamily: "Raleway_600SemiBold",
    fontSize: 14,
  },
  signUpRedirect: {
    flexDirection: "row",
    marginHorizontal: 22,
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
});
