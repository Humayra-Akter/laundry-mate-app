import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
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
        <LinearGradient colors={["#faf8f2", "#fafafa"]}>
          <ScrollView>
            {step == 1 && (
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

            {step == 2 && (
              <View
                style={{
                  marginTop: 10,
                  backgroundColor: "white",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <EvilIcons name="location" size={24} color="black" />
                  <View>
                    <Text style={{ fontSize: 16 }}>Pick up slot</Text>
                    <Text
                      style={{ marginTop: 4, fontWeight: "500", fontSize: 16 }}
                    >
                      {/* {currentDate.format("MMMM YYYY")} */}
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {/* {renderDateButtons()} */}
                </View>

                <Text style={{ marginHorizontal: 10 }}>
                  Pickup Time Options
                </Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {/* {renderPickUpTimeOptions()} */}
                </View>
              </View>
            )}
          </ScrollView>

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
        </LinearGradient>
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
    fontWeight: 500,
    marginHorizontal: 28,
  },
  footer: {
    backgroundColor: "white",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: "auto",
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
});

export default Address;
