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
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function index() {
  return (
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
            <View style={styles.headerBottomRow}>
              <Pressable style={styles.pressAbleContainer}>
                <Text style={styles.pressAbleContainerText}>BOOK NOW</Text>
              </Pressable>
              <FontAwesome6 name="truck-fast" size={24} color="#034694" />
            </View>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 20, marginHorizontal: 16 }}>
        <View style={styles.clubContainer}>
          <View>
            <View>
              <Text style={styles.clubText}>
                Club <Text style={styles.ultimateText}>Ultimate</Text>
              </Text>
              <Text style={styles.putLaundryText}>
                Put your laundry on Laundry-Mate
              </Text>
            </View>
            <View style={styles.headerBottomRow}>
              <Text style={styles.subscribeText}>
                Subscribe and get the benefits
              </Text>
              <AntDesign name="caretright" size={24} color="#034694" />
            </View>
          </View>
        </View>
        <View>
          <View>
            <FontAwesome5 name="shopping-basket" size={24} color="#FF725E" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    height: 200,
    backgroundColor: "#cc9664",
    marginTop: 10,
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
    marginTop: 20,
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
    width: 40,
    fontSize: 12,
    fontWeight: "semibold",
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
  },
  quickOrderText: {
    marginTop: 4,
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
    width: 150,
    marginTop: 6,
    marginHorizontal: 20,
  },
  subscribeText: {
    fontSize: 12,
    fontWeight: "400",
    marginHorizontal: 20,
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
    marginLeft: "auto",
    marginRight: "auto",
    width: width * 0.8,
  },
});
