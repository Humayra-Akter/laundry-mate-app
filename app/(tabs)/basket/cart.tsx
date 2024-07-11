// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Pressable,
//   Image,
//   TouchableOpacity,
// } from "react-native";
// import React from "react";
// import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";

// const cart = () => {
//   return (
//     <ScrollView>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Basket Total</Text>
//         <View>
//           <Text style={styles.headerText}>Rs</Text>
//           <Text style={styles.headerText}>for {cart.length} items</Text>
//         </View>
//       </View>

//       <Text style={styles.cartItemsText}>Cart Items</Text>

//       <View style={styles.cartItemsContainer}>
//         <Pressable style={styles.cartItem}>
//           <View>
//             <Image
//               style={styles.cartItemImage}
//               source={require("@/assets/images/logo.png")}
//             />
//           </View>

//           <View style={styles.cartItemDetails}>
//             <Text>item.name</Text>
//             <Text>item.price * item?.item.quantity</Text>
//           </View>

//           <Pressable>
//             <AntDesign name="pluscircleo" size={24} color="#000" />
//           </Pressable>
//         </Pressable>
//       </View>

//       {/* Buttons */}
//       <View style={styles.buttonsContainer}>
//         <TouchableOpacity style={styles.buttonContainer}>
//           <Text style={styles.buttonText2}>Empty Basket</Text>
//           <FontAwesome5 name="cart-plus" size={24} color="#fff8e6" />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.buttonContainer}
//           onPress={() => router.push("/basket/payment")}
//         >
//           <Text style={styles.buttonText2}>Payment</Text>
//           <Ionicons name="bag-check" size={24} color="#fff8e6" />
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// export default cart;

// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: "#FF725E",
//     padding: 12,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   headerText: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#000",
//   },
//   cartItemsText: {
//     padding: 10,
//   },
//   cartItemsContainer: {
//     marginHorizontal: 12,
//   },
//   cartItem: {
//     padding: 10,
//     backgroundColor: "white",
//     marginVertical: 13,
//     flexDirection: "row",
//     gap: 12,
//     borderRadius: 5,
//   },
//   cartItemImage: {
//     width: 40,
//     height: 40,
//   },
//   cartItemDetails: {
//     flex: 1,
//   },
//   footer: {
//     flexDirection: "row",
//     padding: 15,
//     alignItems: "center",
//     gap: 12,
//     marginTop: 30,
//   },

//   buttonsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//     marginTop: 20,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   buttonContainer: {
//     backgroundColor: "#FF725E",
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     borderRadius: 8,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,
//     alignItems: "center",
//     flex: 1,
//     marginHorizontal: 5,
//     flexDirection: "row",
//     gap: 10,
//     justifyContent: "center",
//   },
//   buttonText2: {
//     color: "white",
//     textAlign: "center",
//     fontSize: 16,
//     fontWeight: "700",
//   },
// });
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";

type RouteParams = {
  selectedItems: string;
  totalPrice: number;
};

export default function CartScreen() {
  const route = useRoute<RouteProp<{ params: RouteParams }, "params">>();
  const { selectedItems, totalPrice } = route.params || {};
  const items = selectedItems ? JSON.parse(selectedItems) : [];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Checkout</Text>
      {items.map((item: any, index: any) => (
        <View key={index} style={styles.itemSection}>
          <Text style={styles.sectionTitle}>{item.ItemName}</Text>
          {item.selectedServices.Iron > 0 && (
            <Text>Iron: {item.selectedServices.Iron}</Text>
          )}
          {item.selectedServices.WashIron > 0 && (
            <Text>Wash & Iron: {item.selectedServices.WashIron}</Text>
          )}
          {item.selectedServices.DryClean > 0 && (
            <Text>Dry Clean: {item.selectedServices.DryClean}</Text>
          )}
          <Text>Total Price: BDT {item.totalPrice}</Text>
        </View>
      ))}
      <View style={styles.priceSection}>
        <Text style={styles.sectionTitle}>Total Price</Text>
        <Text style={styles.totalPrice}>BDT {totalPrice}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  priceSection: {
    marginTop: 20,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
