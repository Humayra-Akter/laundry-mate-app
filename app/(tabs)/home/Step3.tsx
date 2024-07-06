import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import moment from "moment";

const Step3 = ({ selectedDate, renderButtons, renderTimeOptions }) => {
  return (
    <>
      <View style={styles.step3View}>
        <View style={[styles.common, { gap: 10 }]}>
          <View style={[styles.common, { gap: 10 }]}>
            <EvilIcons name="location" size={24} color="black" />
            <Text>Pick up slot</Text>
          </View>
          <AntDesign name="edit" size={24} color="black" />
        </View>
        <View style={styles.common}>
          <View style={styles.selectedDateSegment}>
            <Text style={styles.selectedText}>{selectedDate.format("D")}</Text>
            <Text style={styles.selectedText}>
              {selectedDate.format("ddd")}
            </Text>
          </View>
          <View style={styles.selectedTime}>
            <Text style={styles.selectedText}>{/* Time Slot */}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "white",
          marginTop: 10,
          padding: 10,
          borderRadius: 10,
        }}
      >
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {renderButtons()}
        </View>
        <Text style={{ marginHorizontal: 10 }}>Pickup Time Options</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {renderTimeOptions()}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  step3View: {
    backgroundColor: "white",
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  common: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectedDateSegment: {
    padding: 10,
    margin: 10,
    borderRadius: 6,
    width: 50,
    backgroundColor: "#0066b2",
  },
  selectedText: {
    textAlign: "center",
    fontSize: 13,
    color: "white",
  },
  selectedTime: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#0066b2",
  },
});

export default Step3;
