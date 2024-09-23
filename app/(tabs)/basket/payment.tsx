import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import ConfettiCannon from "react-native-confetti-cannon";
import { clearCart } from "../../../redux/CartReducer";
import { clearPickupDate } from "../../../redux/DateReducer";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const Payment = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isConfettiVisible, setConfettiVisible] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const cart = useSelector((state: any) => state.cart.cart);
  const selectedPickupDate = useSelector(
    (state: any) => state.date.selectedDate
  );
  const user = useSelector((state: any) => state.user);

  const totalPrice = cart.reduce(
    (sum: number, item: any) => sum + item.totalPrice,
    0
  );
  const totalItems = cart.reduce(
    (sum: number, item: any) =>
      sum +
      item.selectedServices.WashIron +
      item.selectedServices.Iron +
      item.selectedServices.DryClean,
    0
  );

  const router = useRouter();
  const dispatch = useDispatch();

  const handleNavigateToPickup = () => {
    router.push("/(tabs)/home/pickup");
  };

  const handlePayment = (type: string) => {
    setPaymentType(type);
    if (type === "cash") {
      Alert.alert(
        "Cash on Delivery",
        "Cash on delivery will cost an additional 60 TK."
      );
    }
    setModalVisible(true);
  };

  const handlePaymentSubmit = async () => {
    if (paymentType === "credit") {
      if (
        !contactNumber ||
        contactNumber.length !== 11 ||
        !/^\d+$/.test(contactNumber)
      ) {
        setError("Please enter a valid 11-digit phone number.");
        return;
      }

      if (!pin || pin.length !== 5 || !/^\d+$/.test(pin)) {
        setError("Please enter a valid 5-digit PIN.");
        return;
      }
    }

    const userEmail = user?.user?.email || null;

    const orderDetails = {
      userEmail,
      pickupDate: selectedPickupDate,
      items: cart,
      totalPrice,
      totalItems,
      paymentMethod:
        paymentType === "cash" ? "Cash on Delivery" : "Credit Card",
      contactNumber: paymentType === "credit" ? contactNumber : null,
      pin: paymentType === "credit" ? pin : null,
    };

    console.log("Order Details:", orderDetails);

    try {
      const response = await fetch(
        "https://laundry-mate-server.onrender.com/orderedItems",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderDetails),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        setConfettiVisible(true);
        setTimeout(() => {
          setConfettiVisible(false);
          handleCloseModal();
        }, 1000);
      } else {
        setError(responseData.message || "Failed to store order details.");
      }
    } catch (error) {
      setError("An error occurred while processing your request.");
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setContactNumber("");
    setPin("");
    setError("");
    dispatch(clearCart());
    dispatch(clearPickupDate());
    router.push("/(tabs)/home");
  };

  return (
    <LinearGradient
      colors={["#b521ff", "#691991", "#53007d"]}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View
          style={{
            backgroundColor: "#ffac5e",
            height: 180,
            borderRadius: 20,
          }}
        >
          <View style={styles.header}>
            <Ionicons
              name="chevron-back-circle-sharp"
              size={28}
              color="#752100"
              style={styles.logo}
              onPress={() => router.push("/basket/cart")}
            />
          </View>
          <Text style={styles.mainSectionTitle}>Order Summary</Text>
        </View>

        <View
          style={[
            styles.section,
            {
              marginTop: -50,
              backgroundColor: "#ddd",
              margin: 20,
              borderRadius: 20,
            },
          ]}
        >
          <Text style={styles.text}>Total: BDT {totalPrice}</Text>
          <Text style={styles.text}>Total Items: {totalItems}</Text>
          {cart.map((item: any, index: number) => (
            <View key={index} style={styles.cartItem}>
              <Text style={styles.text}>{item.ItemName}</Text>
              <Text style={styles.text}>BDT {item.totalPrice}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pickup Details</Text>
          <Text
            style={[
              styles.text,
              { fontWeight: "bold", textAlign: "center", color: "#fff" },
            ]}
          >
            Selected Pickup Date:{" "}
            {selectedPickupDate
              ? new Date(selectedPickupDate).toDateString()
              : "Not selected"}
          </Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleNavigateToPickup}
          >
            <Text style={styles.buttonText2}>Change Pickup Date</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Options</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                !selectedPickupDate && styles.disabledButton,
              ]}
              onPress={() => handlePayment("cash")}
              disabled={!selectedPickupDate}
            >
              <Text style={styles.buttonText2}>Cash on Delivery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                !selectedPickupDate && styles.disabledButton,
              ]}
              onPress={() => handlePayment("credit")}
              disabled={!selectedPickupDate}
            >
              <Text style={styles.buttonText2}>Online Payment</Text>
            </TouchableOpacity>
          </View>
        </View>

        {isConfettiVisible && (
          <ConfettiCannon count={500} origin={{ x: -10, y: 0 }} />
        )}

        <Modal
          transparent={true}
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {paymentType === "credit" ? (
                <>
                  <Text style={styles.modalTitle}>Online Payment</Text>
                  {error ? <Text style={styles.errorText}>{error}</Text> : null}
                  <TextInput
                    style={styles.input}
                    placeholder="Contact Number"
                    value={contactNumber}
                    onChangeText={setContactNumber}
                    keyboardType="phone-pad"
                    maxLength={11}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="PIN"
                    value={pin}
                    onChangeText={setPin}
                    secureTextEntry
                    keyboardType="numeric"
                    maxLength={5}
                  />
                  <View style={styles.modalButtonContainer}>
                    <TouchableOpacity
                      style={styles.modalButtonCancel}
                      onPress={handleCloseModal}
                    >
                      <Text style={styles.modalButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={handlePaymentSubmit}
                    >
                      <Text style={styles.modalButtonText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <Text style={styles.modalTitle}>
                    Thank you for your order!
                  </Text>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handlePaymentSubmit}
                  >
                    <Text style={styles.modalButtonText}>Close</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
      </ScrollView>
    </LinearGradient>
  );
};

export default Payment;

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    marginTop: 30,
    marginLeft: 20,
  },
  section: {
    marginBottom: 20,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#ffac5e",
  },
  mainSectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#000",
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  cartItem: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
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
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#dea981",
  },
  buttonText2: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#752100",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  modalButton: {
    backgroundColor: "#ffac5e",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  modalButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalButtonCancel: {
    backgroundColor: "#ddd",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 10,
  },

  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
