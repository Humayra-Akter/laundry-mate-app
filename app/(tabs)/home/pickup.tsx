import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Calendar from "./Calendar";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

const timeSlots = [
  "10AM to 11AM",
  "11AM to 12PM",
  "12PM to 1PM",
  "3PM to 4PM",
  "4PM to 5PM",
  "5PM to 6PM",
];

export default function Pickup() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [tentativeDate, setTentativeDate] = useState("");
  const router = useRouter();
  const cart = useSelector((state: any) => state.cart.cart);

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

  const handleProceed = (withDate: any) => {
    if (!withDate || !selectedDate || !selectedTimeSlot) {
      router.push("/home/search");
    } else {
      router.push({
        pathname: "/(tabs)/basket/payment",
        params: { selectedDate: selectedDate.toDateString(), selectedTimeSlot },
      });
    }
  };

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
    <LinearGradient colors={["#fff", "#fafafa"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Top section */}
        <View
          style={[
            styles.header,
            { backgroundColor: "#FF725E", height: 180, borderRadius: 20 },
          ]}
        >
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.pgTitle}>Laundry Mate</Text>
        </View>
        {/* Calendar section */}
        <View style={{ marginTop: -100 }}>
          <Text style={styles.title}>Select Pickup Date</Text>
          <Calendar
            onSelectDate={handleDatePress}
            selectedDate={selectedDate}
          />
        </View>
        {/* Select Time Slot section */}
        <Text style={styles.title2}>Select Pickup Time Slot</Text>
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
        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => handleProceed(false)}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText2}>Search Item</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleProceed(true)}
            style={[
              styles.buttonContainer,
              cart.length === 0 && styles.disabledButtonContainer,
            ]}
            disabled={cart.length === 0}
          >
            <Text style={styles.buttonText2}>Proceed to Pay</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 8,
    marginRight: 10,
    marginTop: 20,
  },
  pgTitle: {
    marginTop: 25,
    fontWeight: "bold",
    fontSize: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  title2: {
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
    color: "#000",
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
    borderWidth: 1,
  },
  selectedDateTimeText: {
    fontSize: 16,
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: "#FF725E",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText2: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  disabledButtonContainer: {
    backgroundColor: "#ddd",
  },
});
