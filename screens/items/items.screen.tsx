import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function ItemsScreen() {
  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, paddingHorizontal: 16, paddingTop: 60 }}
    >
      <ScrollView style={styles.container}>
        <Text>Proceed to Select Items</Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
