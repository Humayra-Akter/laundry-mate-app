import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  AntDesign,
  Entypo,
  EvilIcons,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import moment from "moment";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

const Address = () => {
  const [step, setStep] = useState(1);
  const [currentDate, setCurrentDate] = useState(moment());
  const [deliveryDate, setDeliveryDate] = useState(moment());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedAdress, setSelectedAdress] = useState("");

  const handleBack = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  const pickupTimeOptions = [
    { startTime: "6:30 AM", endTime: "9:00 AM" },
    { startTime: "9:00 AM", endTime: "11:30 AM" },
    { startTime: "5:00 PM", endTime: "7:30 PM" },
    { startTime: "7:30 PM", endTime: "10:00 PM" },
  ];

  const handleNext = () => {
    setStep((prevStep) => {
      const nextStep = prevStep + 1;
      console.log("next step", nextStep);
      if (nextStep == 5) {
        //  placeOrder();
      }

      return nextStep;
    });
  };

  const getNext6Days = () => {
    const nextDays = [];
    for (let i = 0; i < 5; i++) {
      const nextDate = moment(currentDate).add(i, "days");

      nextDays.push(nextDate);
    }
    return nextDays;
  };

  const getNextDays = () => {
    const nextDays = [];
    let startDate = moment().add(1, "days");

    if (moment(selectedDate).isSameOrBefore(moment().add(2, "days"), "day")) {
      startDate = moment(selectedDate).add(2, "days");
    }

    for (let i = 0; i < 5; i++) {
      const nextDate = moment(startDate).add(i, "days");
      nextDays.push(nextDate);
    }

    return nextDays;
  };

  const renderDateButtons = () => {
    const next6Days = getNext6Days();

    return next6Days?.map((date, index) => (
      <TouchableOpacity
        onPress={() => setSelectedDate(date)}
        style={{
          padding: 10,
          margin: 10,
          borderRadius: 6,
          width: 50,
          backgroundColor: date.isSame(selectedDate, "day")
            ? "#0066b2"
            : "white",
          borderColor: date.isSame(selectedDate, "day")
            ? "transparent"
            : "#0066b2",
          borderWidth: date.isSame(selectedDate, "day") ? 0 : 1,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 13,
            color: date.isSame(selectedDate, "day") ? "white" : "black",
          }}
        >
          {date?.format("D")}
        </Text>
        <Text
          style={{
            marginTop: 3,
            textAlign: "center",
            fontSize: 13,
            color: date.isSame(selectedDate, "day") ? "white" : "black",
          }}
        >
          {date?.format("ddd")}
        </Text>
      </TouchableOpacity>
    ));
  };

  const renderButtons = () => {
    const next6Days = getNextDays();

    return next6Days.map((date, index) => (
      <TouchableOpacity
        style={{
          padding: 10,
          margin: 10,
          borderRadius: 6,
          width: 50,
          backgroundColor: date.isSame(deliveryDate, "day")
            ? "#0066b2"
            : "white",
          borderColor: date.isSame(deliveryDate, "day")
            ? "transparent"
            : "#0066b2",
          borderWidth: date.isSame(deliveryDate, "day") ? 0 : 1,
        }}
        onPress={() => setDeliveryDate(date)}
        key={index}
      >
        <Text
          style={{
            textAlign: "center",
            marginTop: 3,
            fontSize: 13,
            color: date.isSame(deliveryDate, "day") ? "white" : "black",
          }}
        >
          {date?.format("D")}
        </Text>
        <Text
          style={{
            textAlign: "center",
            marginTop: 3,
            fontSize: 13,
            color: date.isSame(deliveryDate, "day") ? "white" : "black",
          }}
        >
          {date?.format("ddd")}
        </Text>
      </TouchableOpacity>
    ));
  };

  const renderPickUpTimeOptions = () => {
    if (selectedDate) {
      const isCurrentDate = selectedDate.isSame(currentDate, "day");

      const currentTime = moment();

      return pickupTimeOptions.map((option: any, index) => {
        console.log(option);
        const startTime = moment(
          selectedDate.format("YYYY-MM-DD") + " " + option.startTime,
          "YYYY-MM-DD LT"
        );

        //check if the time slot is past the current time
        const isTimeSlotPast = isCurrentDate && startTime.isBefore(currentDate);

        return (
          <TouchableOpacity
            onPress={() => {
              if (!isTimeSlotPast) {
                setSelectedTime(option);
              }
            }}
            style={{
              // textDecorationLine: isTimeSlotPast ? "line-through" : "none",
              opacity: isTimeSlotPast ? 0.5 : 1,
              padding: 10,
              margin: 10,
              borderRadius: 5,
              // backgroundColor:
              //   selectedTime &&
              //   selectedTime.startTime === option.startTime &&
              //   selectedTime.endTime === option.endTime
              //     ? "#0066b2"
              //     : "white",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                // color:
                // selectedTime &&
                // selectedTime.startTime === option.startTime &&
                // selectedTime.endTime === option.endTime
                //   ? "white"
                //   : "black",
              }}
            >{`${option.startTime} - ${option.endTime}`}</Text>
          </TouchableOpacity>
        );
      });
    }
  };

  const renderTimeOptions = () => {
    return pickupTimeOptions.map((option: any, index) => {
      console.log(option);
      const startTime = moment(
        selectedDate.format("YYYY-MM-DD") + " " + option.startTime,
        "YYYY-MM-DD LT"
      );

      return (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setSelectedDeliveryTime(option);
          }}
          style={{
            margin: 10,
            padding: 10,
            borderRadius: 5,
            // backgroundColor:
            //   selectedDeliveryTime &&
            //   selectedDeliveryTime.startTime === option.startTime &&
            //   selectedDeliveryTime.endTime === option.endTime
            //     ? "#0066b2"
            //     : "white",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              // color:
              //   selectedDeliveryTime &&
              //   selectedDeliveryTime.startTime === option.startTime &&
              //   selectedDeliveryTime.endTime === option.endTime
              //     ? "white"
              //     : "black",
            }}
          >{`${option.startTime} - ${option.endTime}`}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.container}>
      {/* Choose your address */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="chevron-back" size={18} color="white" />
        </View>
        <Text style={styles.headerText}>Choose your address</Text>
        <View style={styles.iconContainer}>
          <Entypo name="cross" size={18} color="white" />
        </View>
      </View>

      {/* Slider icons */}
      <View style={styles.slider}>
        <Pressable style={styles.smallIconContainer}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </Pressable>
        <Pressable style={styles.largeIconContainer}>
          <Ionicons name="location" size={24} color="#0066b2" />
        </Pressable>
        <Pressable style={styles.largeIconContainer}>
          <Entypo name="back-in-time" size={24} color="#0066b2" />
        </Pressable>
        <Pressable style={styles.smallIconContainer}>
          <Entypo name="chevron-right" size={24} color="white" />
        </Pressable>
      </View>

      <View style={styles.mainContent}>
        <LinearGradient colors={["#faf8f2", "#fafafa"]} style={{ flex: 1 }}>
          <ScrollView style={styles.container}>
            {step === 1 && <Step1 />}
            {step === 2 && (
              <Step2
                currentDate={currentDate}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                renderDateButtons={renderDateButtons}
                renderPickUpTimeOptions={renderPickUpTimeOptions}
              />
            )}
            {step == 3 && (
              <Step3
                selectedDate={selectedDate}
                renderButtons={renderButtons}
                renderTimeOptions={renderTimeOptions}
              />
            )}
            {step == 4 && <Step4 />}
          </ScrollView>
        </LinearGradient>
      </View>

      {/* Back next button */}
      <View style={styles.footer}>
        <Pressable
          disabled={step === 1}
          onPress={handleBack}
          style={[styles.footerButton, styles.backButton]}
        >
          <Text style={styles.footerButtonText}>Back</Text>
        </Pressable>
        <Pressable
          onPress={handleNext}
          disabled={step === 6}
          style={[styles.footerButton, styles.nextButton]}
        >
          <Text style={[styles.footerButtonText, styles.nextButtonText]}>
            {step === 4 ? "Place Order" : "Next"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  common: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    backgroundColor: "#cc9664",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 20,
    height: 20,
    borderRadius: 18,
    backgroundColor: "#A0A0A0",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  slider: {
    padding: 10,
    backgroundColor: "white",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  smallIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#A0A0A0",
    justifyContent: "center",
    alignItems: "center",
  },
  largeIconContainer: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContent: {
    backgroundColor: "#F0F8FF",
    flex: 1,
    padding: 10,
  },
  
  addAddressText: {
    fontSize: 16,
  },
  addressPressable: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 10,
    borderRadius: 15,
    borderColor: "#0066b2",
  },
  demoAddress: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "500",
    marginHorizontal: 28,
  },
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
  footer: {
    backgroundColor: "white",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  footerButton: {
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },
  backButton: {
    backgroundColor: "#d0d0d0",
  },
  nextButton: {
    backgroundColor: "#cc9664",
  },
  footerButtonText: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 14,
    color: "#000",
  },
  nextButtonText: {
    fontWeight: "500",
    color: "#000",
  },
  step3View: {
    backgroundColor: "white",
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
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
  itemDetail: {
    padding: 10,
    backgroundColor: "white",
    marginVertical: 13,
    flexDirection: "row",
    gap: 12,
    borderRadius: 5,
  },
  itemBg: {
    backgroundColor: "#cc9664",
    padding: 10,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  itemBG2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  totalBG: {
    backgroundColor: "#cc9664",
    padding: 10,
    marginVertical: 10,
    borderRadius: 6,
  },
});

export default Address;
