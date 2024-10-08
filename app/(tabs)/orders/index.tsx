import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Alert,
  ScrollView,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  Octicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { FIREBASE_AUTH } from "../../../firebaseConfig";
import { Redirect, useRouter } from "expo-router";
import ConfettiCannon from "react-native-confetti-cannon";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/redux/UserReducer";

type OrderItem = {
  ItemName: string;
  selectedServices: Record<string, number>;
  totalPrice: number;
};

type OrderDetails = {
  _id: string;
  pickupDate: string;
  items: OrderItem[];
  totalPrice: number;
  totalItems: number;
  paymentMethod: string;
  contactNumber: string;
  pin: string;
  userEmail: string;
};

const StarRating = ({ rating, setRating }: any) => {
  const stars = Array(5).fill(0);

  return (
    <View style={styles.starContainer}>
      {stars.map((_, index) => (
        <Pressable key={index} onPress={() => setRating(index + 1)}>
          <Text
            style={[
              styles.star,
              { color: index < rating ? "#ffac5e" : "gray" },
            ]}
          >
            ★
          </Text>
        </Pressable>
      ))}
    </View>
  );
};
const getTentativeDeliveryDate = (
  pickupDate: string,
  timeslotIndex: number
): Date => {
  const date = new Date(pickupDate);
  const additionalDays = 2 + timeslotIndex;
  date.setDate(date.getDate() + additionalDays);
  return date;
};

const getStatusColor = (deliveryDate: Date): string => {
  const today = new Date();
  return deliveryDate > today ? "blue" : "green";
};

export default function Index() {
  const [showLogout, setShowLogout] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails[] | null>(null);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
  const [starCount, setStarCount] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.user);

  const timeSlots = [
    "10AM to 11AM",
    "11AM to 12PM",
    "12PM to 1PM",
    "3PM to 4PM",
    "4PM to 5PM",
    "5PM to 6PM",
  ];

  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      setLoggedOut(true);
      dispatch(clearUser());
      Alert.alert("Logged out", "You have been logged out successfully.");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          "https://laundry-mate-server.onrender.com/orderedItems"
        );
        const data: OrderDetails[] = await response.json();

        const userEmail = user?.user?.email;
        const userOrders = data.filter(
          (order) => order.userEmail === userEmail
        );

        setOrderDetails(userOrders);
      } catch (error: any) {
        Alert.alert("Error fetching order details", error.message);
      }
    };

    fetchOrderDetails();
  }, [user]);

  const handleFeedbackSubmit = async () => {
    if (!selectedOrder) return;
    const userEmail = user?.user?.email || null;
    const feedback = {
      userEmail,
      orderId: selectedOrder._id,
      rating: starCount,
      text: feedbackText,
    };

    try {
      const response = await fetch(
        "https://laundry-mate-server.onrender.com/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedback),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      Alert.alert("Thank you", "Your feedback has been submitted.");
      setShowConfetti(true);
      setFeedbackVisible(false);
      setStarCount(0);
      setFeedbackText("");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  if (loggedOut) {
    return <Redirect href="/(authenticate)/login" />;
  }

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
          <View
            style={{
              padding: 16,
              marginTop: 10,
            }}
          >
            <View style={styles.headerTopRow}>
              <TouchableOpacity onPress={() => router.push("/home")}>
                <Image
                  style={styles.logo}
                  source={require("@/assets/images/logo.png")}
                />
              </TouchableOpacity>
              <Pressable onPress={() => setShowLogout(!showLogout)}>
                <Octicons name="three-bars" size={24} color="black" />
              </Pressable>
            </View>

            {showLogout && (
              <>
                <Pressable
                  style={[
                    styles.logoutButton,
                    { position: "absolute", top: 70, right: 16, width: 80 },
                  ]}
                  onPress={handleLogout}
                >
                  <Text style={styles.logoutButtonText}>Logout</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.logoutButton,
                    { position: "absolute", top: 100, right: 16 },
                  ]}
                  onPress={() => router.push("/orders/feedback")}
                >
                  <Text style={styles.logoutButtonText}>Feedback</Text>
                </Pressable>
              </>
            )}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                position: "absolute",
                top: 60,
                left: 135,
              }}
            >
              <MaterialCommunityIcons
                name="order-bool-descending-variant"
                size={24}
                color="#000"
              />
              <Text style={styles.title}>My Orders</Text>
            </View>
          </View>
        </View>

        <View style={[styles.ordersContainer, { marginTop: -60 }]}>
          {orderDetails && orderDetails.length > 0 ? (
            orderDetails.map((order) => {
              const tentativeDeliveryDate = getTentativeDeliveryDate(
                order.pickupDate,
                0
              );
              const isDelivered = tentativeDeliveryDate <= new Date();
              return (
                <Pressable key={order?._id} style={styles.orderDetailContainer}>
                  <View style={styles.orderDetailHeader}>
                    <Text style={styles.orderDetailHeaderText}>
                      Order Detail
                    </Text>
                    <Text style={styles.orderDetailHeaderSubText}>
                      Pickup Date:{" "}
                      {new Date(order.pickupDate).toLocaleDateString()}
                    </Text>
                    <Text
                      style={{
                        color: getStatusColor(tentativeDeliveryDate),
                        fontWeight: "bold",
                        marginTop: 1,
                      }}
                    >
                      Delivery Date:{" "}
                      {tentativeDeliveryDate?.toLocaleDateString()}
                    </Text>
                  </View>

                  {/* feedback icon  */}
                  <Pressable
                    style={styles.feedbackIcon}
                    onPress={() => {
                      if (isDelivered) {
                        setSelectedOrder(order);
                        setFeedbackVisible(true);
                      } else {
                        Alert.alert(
                          "Not Delivered",
                          "You can only provide feedback after the order has been delivered."
                        );
                      }
                    }}
                    disabled={!isDelivered}
                  >
                    <FontAwesome
                      name="folder-open-o"
                      size={24}
                      color={isDelivered ? "black" : "gray"}
                    />
                  </Pressable>

                  <View style={styles.orderDetailBody}>
                    {order.items.map((item, index) => (
                      <View key={index} style={styles.orderItem}>
                        <Text style={styles.orderDetailBodyText}>
                          {item.ItemName}
                        </Text>
                        <View style={styles.orderDetailBodySection}>
                          <Text style={styles.orderDetailBodySectionTitle}>
                            Services
                          </Text>
                          {Object.entries(item.selectedServices)
                            .filter(([_, count]) => count > 0)
                            .map(([service, count]) => (
                              <Text
                                key={service}
                                style={styles.orderDetailBodySectionText}
                              >
                                {service}: {count}
                              </Text>
                            ))}
                        </View>
                        <View style={styles.orderDetailBodySection}>
                          <Text style={styles.orderDetailBodySectionTitle}>
                            Total Price
                          </Text>
                          <Text style={styles.orderDetailBodySectionText}>
                            {item.totalPrice}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </Pressable>
              );
            })
          ) : (
            <Text style={styles.noOrdersText}>No orders till now.</Text>
          )}
        </View>

        {/* modal  */}
        <Modal
          visible={feedbackVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Please give your valuable feedback
              </Text>
              <StarRating rating={starCount} setRating={setStarCount} />
              <TextInput
                style={styles.feedbackInput}
                multiline
                numberOfLines={4}
                placeholder="Write your feedback here..."
                value={feedbackText}
                onChangeText={setFeedbackText}
              />
              <View style={styles.buttonsContainer}>
                <Pressable
                  style={[
                    styles.buttonContainer,
                    {
                      backgroundColor:
                        starCount === 0 || feedbackText === ""
                          ? "gray"
                          : "#ffac5e",
                    },
                  ]}
                  onPress={handleFeedbackSubmit}
                  disabled={starCount === 0 || feedbackText === ""}
                >
                  <Text style={styles.buttonText2}>Submit</Text>
                </Pressable>
                <Pressable
                  style={styles.buttonContainer}
                  onPress={() => setFeedbackVisible(false)}
                >
                  <Text style={styles.buttonText2}>Close</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        {showConfetti && (
          <ConfettiCannon
            count={400}
            origin={{ x: -10, y: 0 }}
            fadeOut={true}
            autoStart={true}
          />
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  starContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  star: {
    fontSize: 30,
    marginHorizontal: 2,
  },

  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    marginTop: 30,
  },
  logoutButton: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 10,
    alignSelf: "flex-end",
  },
  logoutButtonText: {
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  ordersContainer: {
    padding: 10,
  },
  orderDetailContainer: {
    marginVertical: 12,
    backgroundColor: "white",
    borderRadius: 7,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    padding: 1,
  },
  orderDetailHeader: {
    backgroundColor: "#ffac5e",
    padding: 10,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  orderDetailHeaderText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  orderDetailHeaderSubText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 3,
  },
  feedbackIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  orderDetailBody: {
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  orderItem: {
    width: "48%",
    marginBottom: 10,
    marginRight: "2%",
  },
  orderDetailBodyText: {
    fontSize: 14,
    fontWeight: "500",
    color: "gray",
  },
  orderDetailBodySection: {
    marginTop: 10,
  },
  orderDetailBodySectionTitle: {
    fontSize: 13,
    fontWeight: "600",
  },
  orderDetailBodySectionText: {
    fontSize: 15,
    marginTop: 4,
    color: "#000",
  },
  noOrdersText: {
    textAlign: "center",
    fontSize: 18,
    color: "gray",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  feedbackInput: {
    width: "100%",
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    textAlignVertical: "top",
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
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  closeButtonText: {
    color: "#ffac5e",
    fontWeight: "bold",
    fontSize: 16,
  },
});
