import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { commonStyles } from "@/styles/common/common.styles";

export default function ForgotPassword() {
  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontError && !fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={styles.container}>
      <Text style={styles.welcomeText}>Reset Email Password</Text>

      <TextInput
        style={styles.input}
        placeholder="example@gmail.com"
        keyboardType="email-address"
      />
      <TouchableOpacity
        style={[commonStyles.buttonContainer, { marginTop: 20 }]}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 16,
            fontWeight: "700",
          }}
        >
          Send
        </Text>
      </TouchableOpacity>

      {/* redirect button  */}
      <View style={styles.signUpRedirect}>
        <Text style={{ fontSize: 18, fontFamily: "Raleway_600SemiBold" }}>
          Back to
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF725E",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "white",
    color: "#A1A1A1",
  },
  signUpRedirect: {
    flexDirection: "row",
    marginHorizontal: 22,
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
});
