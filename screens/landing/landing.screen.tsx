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
} from "react-native";
import PagerView from "react-native-pager-view";
import {
  useFonts,
  Raleway_700Bold,
  Raleway_600SemiBold,
} from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

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
];

const categories = [
  { id: 1, name: "Washing" },
  { id: 2, name: "Ironing" },
  { id: 3, name: "Dry Cleaning" },
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

        <View style={styles.carouselContainer}>
          <PagerView style={styles.carousel} initialPage={0} useNext={true}>
            {services.map((service, index) => (
              <View key={service.id} style={styles.carouselItem}>
                <Image source={service.image} style={styles.carouselImage} />
                <Text style={styles.carouselText}>{service.title}</Text>
              </View>
            ))}
          </PagerView>
        </View>

        <Text style={styles.categoryTitle}>Categories</Text>
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryItem}>
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.signUpRedirect}>
          <Text style={{ fontSize: 18, fontFamily: "Raleway_600SemiBold" }}>
            View Details
          </Text>
          <TouchableOpacity onPress={() => router.push("/(routes)/login")}>
            <Text
              style={{
                fontFamily: "Raleway_600SemiBold",
                fontSize: 18,
                marginLeft: 4,
                color: "#FF725E",
              }}
            >
              Sign In
            </Text>
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
  carouselContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  carousel: {
    width: width * 0.8,
    height: 300,
  },
  carouselItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  carouselImage: {
    width: "70%",
    height: 200,
    borderRadius: 10,
  },
  carouselText: {
    marginTop: 10,
    fontFamily: "Raleway_700Bold",
    fontSize: 16,
  },
  categoryTitle: {
    fontSize: 20,
    fontFamily: "Raleway_700Bold",
    marginLeft: 10,
    marginTop: 20,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
  },
  categoryItem: {
    backgroundColor: "#FF725E",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
  },
  categoryText: {
    color: "#fff",
    fontFamily: "Raleway_600SemiBold",
    fontSize: 16,
  },
  signUpRedirect: {
    flexDirection: "row",
    marginHorizontal: 22,
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
});
