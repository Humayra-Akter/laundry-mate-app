// import { LinearGradient } from "expo-linear-gradient";
// import React from "react";
// import { Image, StyleSheet, Text, View } from "react-native";

// const TrackOrder = () => {
//   return (
//     <LinearGradient
//       colors={["#fff", "#fafafa"]}
//       style={{ flex: 1, paddingVertical: 16 }}
//     >
//       <View style={styles.header}>
//         <Image
//           source={require("@/assets/images/logo.png")}
//           style={styles.logo}
//         />
//         <Text style={styles.title1}>Laundry Mate</Text>
//       </View>
//       <View style={styles.container}>
//         <Text style={styles.title}>Track Your Order</Text>
//         <View style={styles.timeline}>
//           <View style={styles.timelineItem}>
//             <View style={[styles.dot, styles.dotActive]} />
//             <Text style={styles.timelineText}>Order Placed</Text>
//           </View>
//           <View style={styles.verticalLine} />
//           <View style={styles.timelineItem}>
//             <View style={styles.dot} />
//             <Text style={styles.timelineText}>Picked Up</Text>
//           </View>
//           <View style={styles.verticalLine} />
//           <View style={styles.timelineItem}>
//             <View style={styles.dot} />
//             <Text style={styles.timelineText}>Out for Delivery</Text>
//           </View>
//           <View style={styles.verticalLine} />
//           <View style={styles.timelineItem}>
//             <View style={styles.dot} />
//             <Text style={styles.timelineText}>Delivered</Text>
//           </View>
//         </View>
//       </View>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#FFFFFF",
//   },
//   header: {
//     flexDirection: "row",
//     gap: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 10,
//   },
//   logo: {
//     width: 60,
//     height: 60,
//     marginBottom: 8,
//     marginTop: 10,
//   },
//   title1: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#752100",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//     color: "#333333",
//   },
//   timeline: {
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   timelineItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   verticalLine: {
//     width: 1,
//     height: 80,
//     backgroundColor: "#CCCCCC",
//     marginLeft: 5,
//     marginRight: 5,
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: "#CCCCCC",
//     marginRight: 10,
//   },
//   dotActive: {
//     backgroundColor: "#FF725E",
//   },
//   timelineText: {
//     fontSize: 16,
//     color: "#666666",
//   },
// });

// export default TrackOrder;
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const mockOrderData = [
  {
    id: 1,
    status: "Picked Up",
    timestamp: "2024-07-12T10:00:00Z",
  },
  {
    id: 2,
    status: "In Process",
    timestamp: "2024-07-13T10:00:00Z",
  },
  {
    id: 3,
    status: "Ready for Delivery",
    timestamp: "2024-07-14T10:00:00Z",
  },
];

const TrackOrderScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Track Order</Text>
      {mockOrderData.map((order) => (
        <View key={order.id} style={styles.orderContainer}>
          <Text style={styles.statusText}>Status: {order.status}</Text>
          <Text style={styles.timestampText}>
            Date: {new Date(order.timestamp).toDateString()}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fafafa",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FF725E",
  },
  orderContainer: {
    width: "90%",
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#FFF8E6",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  statusText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
  },
  timestampText: {
    fontSize: 16,
    color: "#666",
  },
});

export default TrackOrderScreen;
