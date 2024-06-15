import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";

export default function WelcomeScreen() {
  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontError && !fontsLoaded) {
    return null;
  }
  return (
    <View>
      <Text>WelcomeScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
