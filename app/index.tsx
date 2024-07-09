import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import { FIREBASE_AUTH } from "../firebaseConfig";


const index = () => {
  return <Redirect href="/(tabs)/home" />;
};

export default index;

const styles = StyleSheet.create({});
