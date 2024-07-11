import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function forgotPassword() {
  return (
    <LinearGradient colors={["#fff", "#fafafa"]} style={styles.container}>
      <Text style={styles.welcomeText}>Reset Email Password</Text>

      <TextInput
        style={styles.input}
        placeholder="example@gmail.com"
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>

      {/* redirect button  */}
      <View style={styles.signUpRedirect}>
        <Text style={styles.redirectText}>Back to</Text>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.signInText}>Sign In</Text>
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
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    marginBottom: 20,
  },
  buttonContainer: {
    width: "90%",
    backgroundColor: "#FF725E",
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  signUpRedirect: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  redirectText: {
    fontSize: 18,
    fontFamily: "Raleway_600SemiBold",
  },
  signInText: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 18,
    marginLeft: 4,
    color: "#FF725E",
  },
});
