import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Calendar from "./Calendar";
import { LinearGradient } from "expo-linear-gradient";

const timeSlots = [
  "10AM to 11AM",
  "11AM to 12PM",
  "12PM to 1PM",
  "3PM to 4PM",
  "4PM to 5PM",
  "5PM to 6PM",
];

export default function PickupScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [tentativeDate, setTentativeDate] = useState("");

  const handleDatePress = (date: any) => {
    setSelectedDate(date);
    setTentativeDate("");
  };

  const handleTimeSlotPress = (timeSlot: any) => {
    setSelectedTimeSlot(timeSlot);
    const daysToAdd = timeSlots.indexOf(timeSlot) + 2;
    const tentative = new Date(selectedDate);
    tentative.setDate(tentative.getDate() + daysToAdd);
    setTentativeDate(tentative.toDateString());
  };

  // Render time slots in a grid
  const renderTimeSlots = () => {
    return (
      <View style={styles.timeSlotsContainer}>
        {timeSlots.map((slot, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeSlotButton,
              selectedTimeSlot === slot && styles.selectedButton,
            ]}
            onPress={() => handleTimeSlotPress(slot)}
          >
            <Text style={styles.buttonText}>{slot}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, paddingHorizontal: 16 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Top section */}
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.pgTitle}>Laundry Mate</Text>
        </View>

        {/* Calendar section */}
        <Calendar onSelectDate={handleDatePress} selectedDate={selectedDate} />

        {/* Select Time Slot section */}
        <Text style={styles.title}>Select Pickup Time Slot</Text>
        {renderTimeSlots()}

        {/* Selected date and time */}
        {selectedTimeSlot && (
          <View style={styles.selectedDateTimeContainer}>
            <Text style={styles.selectedDateTimeText}>
              Selected Date: {selectedDate.toDateString()}
            </Text>
            <Text style={styles.selectedDateTimeText}>
              Selected Time Slot: {selectedTimeSlot}
            </Text>
          </View>
        )}

        {/* Tentative date */}
        {tentativeDate && (
          <View style={styles.tentativeDateContainer}>
            <Text style={styles.tentativeDateText}>
              Tentative Delivery Date:{" "}
              <Text style={styles.redText}>{tentativeDate}</Text>
            </Text>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 8,
    marginRight: 10,
  },
  pgTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#752100",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#FF725E",
    textAlign: "center",
    marginBottom: 10,
  },
  timeSlotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 16,
  },
  timeSlotButton: {
    width: 100,
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#FF725E",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff8e6",
  },
  selectedButton: {
    backgroundColor: "#FF725E",
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    fontWeight: "400",
  },
  selectedDateTimeContainer: {
    backgroundColor: "#FFF8E6",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  selectedDateTimeText: {
    fontSize: 14,
    fontWeight: "500",
    paddingHorizontal: 18,
    marginHorizontal: 16,
  },
  tentativeDateContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  tentativeDateText: {
    fontSize: 16,
  },
  redText: {
    color: "red",
    fontWeight: "bold",
  },
});