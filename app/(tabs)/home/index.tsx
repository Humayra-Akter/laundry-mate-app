import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function index() {
  const router = useRouter();

  return (
    <LinearGradient colors={["#faf8f2", "#fafafa"]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.headerContainer}>
          <View style={styles.headerTopRow}>
            <View style={styles.headerTopRow}>
              <Image
                style={styles.logo}
                source={require("@/assets/images/logo.png")}
              />
              <Text style={styles.laundryText}>Laundry Mate</Text>
            </View>
            <Ionicons
              name="reorder-three"
              size={24}
              color="#034694"
              style={styles.menuIcon}
            />
          </View>
          <View style={styles.headerBottomRow}>
            <View>
              <Text style={styles.greeting}>Hi Humz!</Text>
              <Text style={styles.location}>Home Dhaka 1214</Text>
            </View>
            <View style={styles.quickHelpContainer}>
              <Ionicons
                name="information-circle-sharp"
                size={24}
                color="#034694"
              />
              <Text style={styles.quickHelpText}>QUICK HELP</Text>
            </View>
          </View>
        </View>

        <View style={styles.quickOrderContainer}>
          <View style={styles.quickOrderContent}>
            <Ionicons
              name="notifications-circle-sharp"
              size={24}
              color="#034694"
            />
            <View>
              <Text style={styles.quickOrderTitle}>QUICK ORDER</Text>
              <Text style={styles.quickOrderText}>
                Book a pickup and a delivery option
              </Text>
              <Text style={styles.quickOrderText}>
                We will be at your doorstep on time
              </Text>
              <View style={[styles.headerBottomRow, { marginTop: 20 }]}>
                <Pressable
                  onPress={() => router.push("/home/address")}
                  style={styles.pressAbleContainer}
                >
                  <Text style={styles.pressAbleContainerText}>BOOK NOW</Text>
                </Pressable>
                <FontAwesome6 name="truck-fast" size={24} color="#034694" />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.cardsRow}>
          <View style={styles.clubContainer}>
            <Text style={styles.clubText}>
              Club <Text style={styles.ultimateText}>Ultimate</Text>
            </Text>
            <Text style={styles.putLaundryText}>
              Put your laundry on Laundry-Mate
            </Text>
            <View style={styles.headerBottomRow}>
              <Text style={styles.subscribeText}>
                Subscribe and get the benefits
              </Text>
              <AntDesign name="caretright" size={24} color="#034694" />
            </View>
          </View>

          <View style={styles.clubContainer}>
            <Text style={styles.clubText}>
              Place Your <Text style={styles.ultimateText}>Order</Text>
            </Text>
            <Text style={styles.putLaundryText}>
              Select items from the catalogue below and book your order
            </Text>
            <View style={styles.headerBottomRow}>
              <Text style={styles.subscribeText}>book your order</Text>
              <FontAwesome5 name="shopping-basket" size={24} color="#034694" />
            </View>
          </View>
        </View>

        <View style={styles.cardsRow}>
          <View style={styles.pricesContainer}>
            <View style={styles.priceCard}>
              <Text style={styles.priceTitle}>AFFORDABLE PRICES</Text>
              <View style={styles.headerBottomRow}>
                <Text style={styles.priceText}>Get our Price List</Text>
                <Entypo name="triangle-right" size={18} color="#034694" />
              </View>
            </View>
            <View style={styles.priceCard}>
              <Text style={styles.priceTitle}>AFFORDABLE PRICES</Text>
              <View style={styles.headerBottomRow}>
                <Text style={styles.priceText}>Get our Price List</Text>
                <Entypo name="triangle-right" size={18} color="#034694" />
              </View>
            </View>
          </View>
          <View style={[styles.planContainer, { flexDirection: "row" }]}>
            <View>
              <Text style={styles.planTitle}>WHAT'S THE PLAN</Text>
              <Text style={styles.planTitle2}>FOR THE PLANET</Text>
            </View>
            <Entypo name="triangle-right" size={18} color="#034694" />
          </View>
        </View>

        <View style={styles.nextAvailableContainer}>
          <View style={styles.nextAvailableHeader}>
            <Ionicons
              name="notifications-circle-sharp"
              size={24}
              color="#034694"
            />
            {/* <Ionicons name="notifications-outline" size={24} color="black" /> */}
            <Text>Next Available</Text>
          </View>
          <Text style={styles.nextAvailableText}>
            Order Within 15 mins to catch this pickUp Slot
          </Text>
          <Pressable style={styles.nextAvailableButton}>
            <Text>ADD ITEMS</Text>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    height: 200,
    backgroundColor: "#cc9664",
    marginTop: 10,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  laundryText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "cover",
  },
  menuIcon: {
    top: -16,
  },
  headerBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greeting: {
    fontSize: 16,
    fontWeight: "bold",
  },
  location: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  quickHelpContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  quickHelpText: {
    fontSize: 12,
    fontWeight: "semibold",
    color: "#034694",
  },
  quickOrderContainer: {
    padding: 10,
    backgroundColor: "#fff",
    width: width * 0.8,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 10,
    marginTop: -40,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  quickOrderContent: {
    flexDirection: "row",
    gap: 10,
  },
  quickOrderTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#034694",
  },
  quickOrderText: {
    marginTop: 4,
    color: "#666",
  },
  pressAbleContainer: {
    backgroundColor: "#cc9664",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  pressAbleContainerText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#fff",
  },
  cardsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: 20,
    gap: 20,
  },
  clubContainer: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: width * 0.45,
  },
  clubText: {
    color: "#cc9664",
    fontSize: 16,
    fontWeight: "bold",
  },
  ultimateText: {
    color: "#034694",
    fontSize: 16,
    fontWeight: "bold",
  },
  putLaundryText: {
    fontSize: 14,
    fontWeight: "400",
    marginTop: 6,
    color: "#666",
  },
  subscribeText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#666",
  },
  pricesContainer: {
    flexDirection: "column",
  },
  priceCard: {
    backgroundColor: "#fff",
    alignItems: "center",
    gap: 12,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: width * 0.45,
  },
  priceTitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#034694",
  },
  priceText: {
    marginTop: 4,
    color: "#666",
  },
  planContainer: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    gap: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: width * 0.45,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#cc9664",
    width: 130,
  },
  planTitle2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#034694",
    width: 120,
  },
  nextAvailableContainer: {
    backgroundColor: "#fff",
    padding: 10,
    marginHorizontal: 16,
    borderRadius: 10,
    marginTop: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  nextAvailableHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  nextAvailableText: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 5,
    color: "#034694",
  },
  nextAvailableButton: {
    borderColor: "#034694",
    paddingHorizontal: 10,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.7,
    marginTop: 8,
    borderRadius: 5,
  },
});
