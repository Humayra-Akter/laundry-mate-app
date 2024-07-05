import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
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

  const handleNext = () => {
    setStep((prevStep) => {
      const nextStep = prevStep + 1;
      console.log(nextStep);
      if (nextStep === 5) {
        // Handle step 5 logic here
      }
      return nextStep;
    });
  };

  const pickupTimeOptions = [
    { startTime: "6:30 AM", endTime: "9:00 AM" },
    { startTime: "9:00 AM", endTime: "11:30 AM" },
    { startTime: "5:00 PM", endTime: "7:30 PM" },
    { startTime: "7:30 PM", endTime: "10:00 PM" },
  ];

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

    return next6Days?.map((date: any, index: any) => (
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

  const renderPickUpTimeOptions = () => {
    if (selectedDate) {
      const isCurrentDate = selectedDate.isSame(currentDate, "day");

      const currentTime = moment();

      return pickupTimeOptions.map((option: any, index: any) => {
        console.log(option);
        const startTime = moment(
          selectedDate.format("YYYY-MM-DD") + " " + option.startTime,
          "YYYY-MM-DD LT"
        );
        const isTimeSlotPast = isCurrentDate && startTime.isBefore(currentDate);

        return (
          <TouchableOpacity
            onPress={() => {
              if (!isTimeSlotPast) {
                // setSelectedTime(option);
              }
            }}
            style={{
              opacity: isTimeSlotPast ? 0.5 : 1,
              padding: 10,
              margin: 10,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                textAlign: "center",
              }}
            >{`${option.startTime} - ${option.endTime}`}</Text>
          </TouchableOpacity>
        );
      });
    }
  };

  const renderTimeOptions = () => {
    return pickupTimeOptions.map((option, index) => {
      console.log(option);
      const startTime = moment(
        selectedDate.format("YYYY-MM-DD") + " " + option.startTime,
        "YYYY-MM-DD LT"
      );

      return (
        <TouchableOpacity
          key={index}
          style={{
            margin: 10,
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              textAlign: "center",
            }}
          >{`${option.startTime} - ${option.endTime}`}</Text>
        </TouchableOpacity>
      );
    });
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
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {step === 1 && (
              <View>
                {/* Map over all the addresses */}
                <Pressable style={styles.addressRow}>
                  <AntDesign name="plus" size={24} color="black" />
                  <Pressable onPress={() => router.push("/home/add")}>
                    <Text style={styles.addAddressText}>Add address</Text>
                  </Pressable>
                </Pressable>
                <View>
                  <Pressable style={styles.addressPressable}>
                    <View style={styles.common}>
                      <View style={[styles.common, { gap: 10 }]}>
                        <Ionicons
                          name="location-outline"
                          size={24}
                          color="#0066b2"
                        />
                        <Text style={{ fontSize: 17, fontWeight: "500" }}>
                          Home
                        </Text>
                      </View>
                      <FontAwesome name="flag" size={24} color="#0066b2" />
                    </View>
                    <View style={styles.demoAddress}>
                      <Text>117 north basabo</Text>
                      <Text>Dhaka-1214</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            )}

            {step === 2 && (
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

                <View style={styles.pickupSlotOptions}>
                  {renderDateButtons()}
                </View>

                <Text style={styles.pickupTimeText}>Pickup Time Options</Text>
                <View style={styles.pickupTimeOptions}>
                  {renderPickUpTimeOptions()}
                </View>
              </View>
            )}

            {step == 3 && (
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
                      <Text style={styles.selectedText}>
                        {selectedDate.format("D")}
                      </Text>
                      <Text style={styles.selectedText}>
                        {selectedDate.format("ddd")}
                      </Text>
                    </View>

                    <View style={styles.selectedTime}>
                      <Text style={styles.selectedText}>
                        {/* {`${selectedTime.startTime} - ${selectedTime.endTime}`} */}
                      </Text>
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

                  <Text style={{ marginHorizontal: 10 }}>
                    Pickup Time Options
                  </Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {renderTimeOptions()}
                  </View>
                </View>
              </>
            )}
            {step == 4 && (
              <View
                style={{
                  marginTop: 10,
                  backgroundColor: "white",
                  borderRadius: 10,
                }}
              >
                <View style={{ padding: 10 }}>
                  <Text style={{ fontSize: 16, fontWeight: "600" }}>
                    Your Cart
                  </Text>
                </View>

                <View style={{ marginHorizontal: 12 }}>
                  <Pressable style={styles.itemDetail}>
                    <View>
                      <Image style={{ width: 40, height: 40 }} />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text>item.name</Text>
                      {/* <Text>{item?.item.price * item?.item.quantity}</Text> */}
                    </View>

                    <Pressable>
                      <AntDesign name="pluscircleo" size={24} color="#89CFF0" />
                    </Pressable>
                  </Pressable>
                </View>
                <View style={styles.itemBg}>
                  <View style={styles.itemBG2}>
                    <Text style={{ color: "white", fontWeight: "500" }}>
                      Total Amount
                    </Text>
                    <Text style={{ color: "white", fontWeight: "500" }}>
                      BDT
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.common,
                      {
                        marginVertical: 10,
                      },
                    ]}
                  >
                    <Text style={{ color: "white", fontWeight: "500" }}>
                      Promo Code
                    </Text>
                    <Text style={{ color: "white", fontWeight: "500" }}>
                      Rs 0
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.common,
                      {
                        marginVertical: 10,
                      },
                    ]}
                  >
                    <Text style={{ color: "white", fontWeight: "500" }}>
                      Delivery Charges
                    </Text>
                    <Text style={{ color: "white", fontWeight: "500" }}>
                      Rs 25
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.common,
                      {
                        marginVertical: 10,
                      },
                    ]}
                  >
                    <Text style={{ color: "white", fontWeight: "500" }}>
                      Total Payable
                    </Text>
                    <Text style={{ color: "white", fontWeight: "500" }}>
                      BDT total + 25
                    </Text>
                  </View>
                </View>

                <View
                  style={styles.totalBG}
                >
                  <View
                    style={[
                      styles.common,
                      {
                        marginVertical: 10,
                      },
                    ]}
                  >
                    <Text style={{ color: "white", fontWeight: "500" }}>
                      TOTAL AMOUNT
                    </Text>
                    <Text style={{ color: "white", fontWeight: "500" }}>
                      BDT
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.common,
                      {
                        marginVertical: 10,
                      },
                    ]}
                  >
                    <Text style={{ color: "white", fontWeight: "500" }}>
                      TAXES AND CHARGES
                    </Text>
                    <Text style={{ color: "white", fontWeight: "500" }}>
                      Rs 150
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.common,
                      {
                        marginVertical: 10,
                      },
                    ]}
                  >
                    <Text style={{ color: "white", fontWeight: "500" }}>
                      TOTAL PAYABLE
                    </Text>
                    <Text style={{ color: "white", fontWeight: "500" }}>
                      BDT 25 + 150
                    </Text>
                  </View>
                </View>
              </View>
            )}
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
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
