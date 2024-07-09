import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { FIREBASE_AUTH } from "../../../firebaseConfig";
import { Redirect } from "expo-router";

const Index = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      setLoggedOut(true);
      Alert.alert("Logged out", "You have been logged out successfully.");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  if (loggedOut) {
    return <Redirect href="/(authenticate)/login" />;
  }

  return (
    <LinearGradient colors={["#fff", "#fafafa"]} style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTopRow}>
          <Image
            style={styles.logo}
            source={require("@/assets/images/logo.png")}
          />
          <Pressable onPress={() => setShowLogout(!showLogout)}>
            <Octicons name="three-bars" size={24} color="white" />
          </Pressable>
        </View>

        {showLogout && (
          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </Pressable>
        )}

        <View style={styles.titleContainer}>
          <View style={styles.backIconContainer}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </View>
          <Text style={styles.title}>My Orders</Text>
        </View>

        <Pressable style={styles.orderDetailContainer}>
          <View style={styles.orderDetailHeader}>
            <View>
              <Text style={styles.orderDetailHeaderText}>Order Detail</Text>
              <Text style={styles.orderDetailHeaderSubText}>item id</Text>
            </View>
            <View>
              <Text style={styles.orderDetailHeaderText}>Payment</Text>
              <Text style={styles.orderDetailHeaderSubText}>
                Cash on delivery
              </Text>
            </View>
          </View>

          <View style={styles.orderDetailBody}>
            <View>
              <Text style={styles.orderDetailBodyText}>
                item?.address.houseNo
              </Text>
              <View style={styles.orderDetailBodySection}>
                <Text style={styles.orderDetailBodySectionTitle}>PICK UP</Text>
                <Text style={styles.orderDetailBodySectionText}>
                  item pickuptime
                </Text>
              </View>
              <View style={styles.orderDetailBodySection}>
                <Text style={styles.orderDetailBodySectionTitle}>DELIVERY</Text>
                <Text style={styles.orderDetailBodySectionText}>
                  item deliveryTime
                </Text>
              </View>
              <View style={{ marginBottom: 20 }} />
            </View>
            <View style={styles.iconContainer}>
              <View style={styles.iconWrapper}>
                <MaterialCommunityIcons
                  name="note-outline"
                  size={24}
                  color="black"
                />
              </View>
              <Text style={styles.iconText}>Order Summary</Text>
              <View style={styles.iconWrapper}>
                <FontAwesome name="folder-open-o" size={24} color="black" />
              </View>
              <Text style={styles.iconText}>FeedBack</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 12,
    height: 200,
    backgroundColor: "#FF725E",
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
  logoutButton: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignSelf: "flex-end",
  },
  logoutButtonText: {
    color: "#FF725E",
    fontWeight: "bold",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 12,
  },
  backIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff8e6",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  orderDetailContainer: {
    marginVertical: 12,
    backgroundColor: "white",
    borderRadius: 7,
  },
  orderDetailHeader: {
    backgroundColor: "#000",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  orderDetailHeaderText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
  orderDetailHeaderSubText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    marginTop: 3,
  },
  orderDetailBody: {
    backgroundColor: "white",
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderDetailBodyText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "500",
    color: "gray",
    width: 200,
  },
  orderDetailBodySection: {
    marginTop: 10,
  },
  orderDetailBodySectionTitle: {
    fontSize: 13,
    fontWeight: "600",
  },
  orderDetailBodySectionText: {
    fontSize: 15,
    marginTop: 4,
  },
  iconContainer: {
    alignItems: "center",
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F0F8FF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  iconText: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "500",
  },
});

export default Index;
