import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "./app/AuthContext";

export default function App() {
  const user = useAuth();
  console.log(user);
  return (
    {user?
      (<>
      </>)
      
      :()}
  );
}

const styles = StyleSheet.create({});
