import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

const Step1 = () => {
  return (
    <View>
      <Pressable style={styles.addressRow}>
        <AntDesign name="plus" size={24} color="black" />
        <Pressable onPress={() => router.push("/home/add")}>
          <Text style={styles.addAddressText}>Add address</Text>
        </Pressable>
      </Pressable>
      <View>
        <Pressable style={styles.addressPressable}>
          <View style={styles.common}>
            <View style={[styles.common, { gap: 10 }]}>
              <Ionicons name="location-outline" size={24} color="#0066b2" />
              <Text style={{ fontSize: 17, fontWeight: "500" }}>Home</Text>
            </View>
            <FontAwesome name="flag" size={24} color="#0066b2" />
          </View>
          <View style={styles.demoAddress}>
            <Text>117 north basabo</Text>
            <Text>Dhaka-1214</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  addAddressText: {
    fontSize: 16,
  },
  addressPressable: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 10,
    borderRadius: 15,
    borderColor: "#0066b2",
  },
  common: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  demoAddress: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "500",
    marginHorizontal: 28,
  },
});

export default Step1;
