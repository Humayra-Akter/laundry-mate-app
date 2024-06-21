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
          width: width * 1 - 150,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        },
      ]}
    >
      <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
