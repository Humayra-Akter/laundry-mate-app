import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "@/styles/onboarding/onboard";

export default function OnboardingScreen() {
  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]}>
      <View style={styles.firstContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>Laundry at your doorstep</Text>
        </View>
        <View style={styles.dscpWrapper}>
          <Text style={styles.dscpText}>Let's explore the process</Text>
        </View>
        <TouchableOpacity style={styles.buttonWrapper}>
          <Text style={styles.buttonText}>Getting Started</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
