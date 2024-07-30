import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const today = new Date();
    const tentative = new Date(selectedDate);
    if (selectedTimeSlot) {
      const daysToAdd = timeSlots.indexOf(selectedTimeSlot) + 2;
      tentative.setDate(tentative.getDate() + daysToAdd);
      setTentativeDate(tentative.toDateString());
    }
  }, [selectedDate, selectedTimeSlot]);

  const handleDatePress = (date: any) => {
    setSelectedDate(date);
    setTentativeDate("");
  };

  const handleTimeSlotPress = (timeSlot: any) => {
    setSelectedTimeSlot(timeSlot);
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

  const compareDates = (date: any) => {
    const today = new Date();
    const selected = new Date(date);
    if (selected < today) return styles.pastDate;
    if (selected.toDateString() === today.toDateString())
      return styles.todayDate;
    return styles.futureDate;
  };

  return (
    <LinearGradient
      colors={["#b521ff", "#691991", "#53007d"]}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Top section */}
        <View
          style={[
            styles.header,
            { backgroundColor: "#ffac5e", height: 180, borderRadius: 20 },
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
          <View>
            <Text
              style={[
                styles.futureDate,
                { textAlign: "center", marginBottom: 4 },
              ]}
            >
              Your selected pickup date
            </Text>
            <View style={styles.selectedDateTimeContainer}>
              <Text style={styles.selectedDateTimeText}>
                Selected Date: {selectedDate.toDateString()}
              </Text>
              <Text style={styles.selectedDateTimeText}>
                Selected Time Slot: {selectedTimeSlot}
              </Text>
            </View>
          </View>
        )}
        {/* Tentative date */}
        {tentativeDate && (
          <View style={styles.tentativeDateContainer}>
            <Text style={compareDates(tentativeDate)}>
              Tentative Delivery Date: {tentativeDate}
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
    width: 40,
    height: 40,
    marginBottom: 8,
    marginRight: 10,
    marginTop: 20,
  },
  pgTitle: {
    marginTop: 26,
    fontWeight: "bold",
    fontSize: 21,
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
    color: "#ffac5e",
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
    borderColor: "#ffac5e",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff8e6",
  },
  selectedButton: {
    backgroundColor: "#ffac5e",
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
    fontSize: 20,
  },
  pastDate: {
    color: "gray",
    fontWeight: "bold",
  },
  todayDate: {
    color: "orange",
    fontWeight: "bold",
  },
  futureDate: {
    color: "#14ff5f",
    fontWeight: "bold",
    fontSize: 18,
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
    backgroundColor: "#ffac5e",
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
