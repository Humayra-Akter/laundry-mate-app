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
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import ConfettiCannon from "react-native-confetti-cannon";
import { clearCart } from "../../../redux/CartReducer";
import { clearPickupDate } from "../../../redux/DateReducer";

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
    setModalVisible(true);
  };

  const handlePaymentSubmit = async () => {
    if (paymentType === "credit" && (!contactNumber || !pin)) {
      setError("Please enter both contact number and PIN.");
      return;
    }

    const orderDetails = {
      pickupDate: selectedPickupDate,
      items: cart,
      totalPrice,
      totalItems,
      paymentMethod:
        paymentType === "cash" ? "Cash on Delivery" : "Credit Card",
      contactNumber: paymentType === "credit" ? contactNumber : null,
      pin: paymentType === "credit" ? pin : null,
    };

    try {
      const response = await fetch("http://192.168.1.170:5000/orderedItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        if (paymentType === "cash") {
          setConfettiVisible(true);
          setTimeout(() => {
            setConfettiVisible(false);
            handleCloseModal();
          }, 3000);
        } else {
          handleCloseModal();
        }
      } else {
        console.error("Failed to store order details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setPaymentType("");
    setContactNumber("");
    setPin("");
    setError("");
    dispatch(clearCart());
    dispatch(clearPickupDate());
    router.push("/(tabs)/home");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Laundry Mate</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
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
          style={[styles.text, { fontWeight: "bold", textAlign: "center" }]}
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
            <Text style={styles.buttonText2}>Credit Card</Text>
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
                <Text style={styles.modalTitle}>bkash</Text>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <TextInput
                  style={styles.input}
                  placeholder="Contact Number"
                  value={contactNumber}
                  onChangeText={setContactNumber}
                  keyboardType="phone-pad"
                />
                <TextInput
                  style={styles.input}
                  placeholder="PIN"
                  value={pin}
                  onChangeText={setPin}
                  secureTextEntry
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handlePaymentSubmit}
                >
                  <Text style={styles.modalButtonText}>Submit</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>Thank you for your order!</Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.modalButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 8,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#752100",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#FF725E",
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
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  buttonText2: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: "#FF725E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
