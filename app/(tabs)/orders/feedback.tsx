import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Octicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import ConfettiCannon from "react-native-confetti-cannon";
import { useDispatch, useSelector } from "react-redux";

type OrderedItem = {
  _id: string;
  userEmail: string;
  pickupDate: string;
  items: { ItemName: string; selectedServices: any; totalPrice: number }[];
  totalPrice: number;
  totalItems: number;
  paymentMethod: string;
  contactNumber: string | null;
  pin: string | null;
};

type Feedback = {
  order: any;
  _id: string;
  userEmail: string;
  orderId: string;
  rating: number;
  text: string;
  date: string; // Assuming the feedback date is provided
};

export default function Feedback() {
  const [feedbackDetails, setFeedbackDetails] = useState<Feedback[] | null>(
    null
  );
  const [orderedItems, setOrderedItems] = useState<OrderedItem[] | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter();
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    const fetchFeedbackAndOrderedItems = async () => {
      try {
        const feedbackResponse = await fetch(
          "https://laundry-mate-server.onrender.com/feedback"
        );
        const feedbackData: Feedback[] = await feedbackResponse.json();

        const orderedItemsResponse = await fetch(
          "https://laundry-mate-server.onrender.com/orderedItems"
        );
        const orderedItemsData: OrderedItem[] =
          await orderedItemsResponse.json();

        const userEmail = user?.user?.email;
        const userFeedback = feedbackData.filter(
          (feedback) => feedback.userEmail === userEmail
        );

        const detailedFeedback = userFeedback.map((feedback) => {
          const order = orderedItemsData.find(
            (item) => item._id === feedback.orderId
          );
          return {
            ...feedback,
            order,
            date: feedback.date || new Date().toISOString(),
          };
        });

        setFeedbackDetails(detailedFeedback);
        setOrderedItems(orderedItemsData);
      } catch (error) {
        Alert.alert("Error fetching details", (error as Error).message);
      }
    };

    fetchFeedbackAndOrderedItems();
  }, [user]);

  return (
    <LinearGradient
      colors={["#b521ff", "#691991", "#53007d"]}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.push("/home")}>
              <Image
                style={styles.logo}
                source={require("@/assets/images/logo.png")}
              />
            </TouchableOpacity>
            <Pressable onPress={() => router.push("/(tabs)/orders")}>
              <MaterialCommunityIcons
                name="order-bool-descending-variant"
                size={24}
                color="black"
              />
            </Pressable>
          </View>

          <View style={styles.titleContainer}>
            <MaterialIcons name="feedback" size={24} color="black" />
            <Text style={styles.title}>My Feedbacks</Text>
          </View>
        </View>

        {feedbackDetails?.length === 0 && (
          <Text style={styles.noFeedbackText}>No feedback available</Text>
        )}

        {feedbackDetails?.map((feedback) => (
          <View key={feedback._id} style={styles.feedbackContainer}>
            <Text style={styles.feedbackRating}>Rating: {feedback.rating}</Text>
            <Text style={styles.feedbackText}>{feedback.text}</Text>
            <Text style={styles.feedbackOrder}>
              Order ID: {feedback.order?._id}
            </Text>
            <Text style={styles.feedbackDate}>
              Date: {new Date(feedback.date).toLocaleDateString()}
            </Text>
            {feedback?.order && (
              <>
                <Text style={styles.orderDate}>
                  Pickup Date:{" "}
                  {new Date(feedback.order.pickupDate).toLocaleDateString()}
                </Text>
                <Text style={styles.orderDetails}>Items:</Text>
                {feedback.order.items.map((item: any, index: any) => (
                  <Text key={index} style={styles.itemDetails}>
                    {item.ItemName} - ${item.totalPrice}
                  </Text>
                ))}
              </>
            )}
          </View>
        ))}

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
  headerContainer: {
    backgroundColor: "#ffac5e",
    height: 180,
    borderRadius: 20,
  },
  headerContent: {
    padding: 16,
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    position: "absolute",
    top: 60,
    left: 135,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  feedbackContainer: {
    marginVertical: 12,
    backgroundColor: "white",
    borderRadius: 7,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    padding: 10,
    margin: 16,
    marginTop: -40,
  },
  feedbackRating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  feedbackText: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  feedbackOrder: {
    fontSize: 14,
    color: "#000",
    marginTop: 10,
  },
  feedbackDate: {
    fontSize: 14,
    color: "gray",
  },
  orderDate: {
    fontSize: 14,
    color: "#000",
    marginTop: 10,
  },
  orderDetails: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
  },
  itemDetails: {
    fontSize: 14,
    color: "gray",
  },
  noFeedbackText: {
    textAlign: "center",
    fontSize: 18,
    color: "gray",
    marginTop: 20,
  },
});
