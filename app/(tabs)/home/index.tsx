import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function index() {
  return (
    <ScrollView>
      <View
        style={{
          padding: 16,
          height: 200,
          backgroundColor: "#FF725E",
          marginTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Image
              style={{ width: 70, height: 70, resizeMode: "cover" }}
              source={require("@/assets/images/logo.png")}
            />
          </View>
          <Ionicons name="reorder-three" size={24} color="black" />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 14, fontFamily: "kailasa-bold" }}>
              Hi Humz!
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "kailasa-bold",
                color: "#000",
              }}
            >
              Home Dhaka 1214
            </Text>
          </View>

          <View>
            <Ionicons name="information-circle-sharp" size={24} color="black" />
            <Text>QUICK HELP</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
