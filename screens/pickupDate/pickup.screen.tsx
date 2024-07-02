import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { router } from "expo-router";

export default function PickupDateScreen() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [tentativeDeliveryDate, setTentativeDeliveryDate] =
    useState<moment.Moment | null>(null);

  const timeSlots = [
    "10AM to 11AM",
    "11AM to 12PM",
    "12PM to 1PM",
    "1PM to 2PM",
    "2PM to 3PM",
    "3PM to 4PM",
    "4PM to 5PM",
    "5PM to 6PM",
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (event: any, date: any) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const handleSelectTimeSlot = (timeSlot: any) => {
    setSelectedTimeSlot(timeSlot);
    calculateDeliveryDate(selectedDate, timeSlot);
  };

  const calculateDeliveryDate = (pickupDate: any, timeSlot: any) => {
    if (pickupDate && timeSlot) {
      let deliveryDate = moment(pickupDate).add(1, "days"); // Default next day delivery

      // Adjust delivery date based on time slot
      switch (timeSlot) {
        case "10AM to 11AM":
          deliveryDate = moment(pickupDate).add(2, "days");
          break;
        case "11AM to 12PM":
          deliveryDate = moment(pickupDate).add(3, "days");
          break;
        case "12PM to 1PM":
          deliveryDate = moment(pickupDate).add(3, "days");
          break;
        case "1PM to 2PM":
          deliveryDate = moment(pickupDate).add(4, "days");
          break;
        case "2PM to 3PM":
          deliveryDate = moment(pickupDate).add(4, "days");
          break;
        case "3PM to 4PM":
          deliveryDate = moment(pickupDate).add(5, "days");
          break;
        case "4PM to 5PM":
          deliveryDate = moment(pickupDate).add(5, "days");
          break;
        case "5PM to 6PM":
          deliveryDate = moment(pickupDate).add(6, "days");
          break;
        default:
          deliveryDate = moment(pickupDate).add(1, "days"); // Default next day delivery
          break;
      }

      setTentativeDeliveryDate(deliveryDate);
    }
  };

  const renderSelectedDateTime = () => {
    if (selectedDate && selectedTimeSlot) {
      return (
        <View style={styles.selectedDateTimeContainer}>
          <Text>
            Selected Date: {moment(selectedDate).format("MMMM Do YYYY")}
          </Text>
          <Text>Selected Time Slot: {selectedTimeSlot}</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, paddingHorizontal: 16, paddingTop: 60 }}
    >
      <ScrollView style={styles.container}>
        {/* Calendar */}
        <Text style={styles.title}>Select Date</Text>

        <TouchableOpacity
          onPress={showDatePicker}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>Calendar</Text>
        </TouchableOpacity>
        {isDatePickerVisible && (
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            display={Platform.OS === "android" ? "inline" : "default"}
            onChange={handleConfirm}
            minimumDate={new Date()}
            style={styles.datePicker}
            textColor="#FF725E"
          />
        )}

        {/* Time Slots */}
        <Text style={styles.title}>Select Time Slot</Text>
        <View style={styles.timeSlotsContainer}>
          {timeSlots.map((slot, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.buttonContainer,
                styles.timeSlotButton,
                selectedTimeSlot === slot && styles.selectedButton,
              ]}
              onPress={() => handleSelectTimeSlot(slot)}
            >
              <Text style={styles.buttonText}>{slot}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Selected Date and Time Slot Display */}
        <View style={{ marginHorizontal: 16 }}>{renderSelectedDateTime()}</View>

        {/* Tentative Delivery Date */}
        {tentativeDeliveryDate && (
          <Text style={styles.tentativeDeliveryText}>
            Tentative Delivery Date:{" "}
            {moment(tentativeDeliveryDate).format("MMMM Do YYYY")}
          </Text>
        )}

        {/* Proceed Button */}
        <TouchableOpacity
          disabled={!selectedDate || !selectedTimeSlot}
          onPress={() => router.push("/(routes)/items")}
          style={[
            styles.buttonContainer,
            {
              backgroundColor:
                !selectedDate || !selectedTimeSlot ? "#ccc" : "#FF725E",
            },
          ]}
        >
          <Text style={styles.buttonText}>Proceed to Select Items</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectedDateTimeContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
  },
  buttonContainer: {
    backgroundColor: "#FF725E",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 16,
  },
  selectedButton: {
    backgroundColor: "#FFA07A",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Raleway_700Bold",
  },
  title: {
    fontSize: 20,
    fontFamily: "Raleway_700Bold",
    marginLeft: 10,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 6,
    textAlign: "center",
    color: "#FF725E",
  },
  datePicker: {
    width: "100%",
    backgroundColor: "#E5ECF9",
  },
  timeSlotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  timeSlotButton: {
    width: "48%", // Two buttons in a row
  },
  tentativeDeliveryText: {
    marginTop: 20,
    textAlign: "center",
    color: "red",
    fontSize: 16,
    fontFamily: "Raleway_700Bold",
  },
});
