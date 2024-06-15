import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "@/styles/onboarding/onboard";

export default function OnboardingScreen() {
  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontError && !fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={styles.gradient}>
      <View style={styles.firstContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={[styles.titleText, { fontFamily: "Raleway_700Bold" }]}>
          Laundry at Your Door Step
        </Text>
        <Text style={[styles.dscpText, { fontFamily: "Nunito_400Regular" }]}>
          Let's explore the process
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/(routes)/welcome-intro")}
          style={styles.buttonWrapper}
        >
          <Text style={[styles.buttonText, { fontFamily: "Nunito_700Bold" }]}>
            Getting Started
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
