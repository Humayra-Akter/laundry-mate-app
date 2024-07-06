import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import moment from "moment";

const Step2 = ({
  currentDate,
  selectedDate,
  setSelectedDate,
  renderDateButtons,
  renderPickUpTimeOptions,
}) => {
  return (
    <View style={styles.pickupSlotContainer}>
      <View style={styles.pickupSlotHeader}>
        <EvilIcons name="location" size={24} color="black" />
        <View>
          <Text style={{ fontSize: 16 }}>Pick up slot</Text>
          <Text style={styles.pickupSlotDate}>
            {currentDate.format("MMMM YYYY")}
          </Text>
        </View>
      </View>
      <View style={styles.pickupSlotOptions}>{renderDateButtons()}</View>
      <Text style={styles.pickupTimeText}>Pickup Time Options</Text>
      <View style={styles.pickupTimeOptions}>{renderPickUpTimeOptions()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  pickupSlotContainer: {
    marginTop: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  pickupSlotHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  pickupSlotDate: {
    marginTop: 4,
    fontWeight: "500",
    fontSize: 16,
  },
  pickupSlotOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  pickupTimeText: {
    marginHorizontal: 10,
  },
  pickupTimeOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default Step2;
