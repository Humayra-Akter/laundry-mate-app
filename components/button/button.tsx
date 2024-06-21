import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { commonStyles } from "@/styles/common/common.styles";

export default function Button({ title }: { title: string }) {
  return (
    <View style={commonStyles.buttonContainer}>
      <Text>Button</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
