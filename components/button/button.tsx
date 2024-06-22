import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { commonStyles } from "@/styles/common/common.styles";

export default function Button({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  const { width } = Dimensions.get("window");
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[
        commonStyles.buttonContainer,
        {
          height: 40,
          width: width * 1 - 120,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          padding: 10,
        },
      ]}
    >
      <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
