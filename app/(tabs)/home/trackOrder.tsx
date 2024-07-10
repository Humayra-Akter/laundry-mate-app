import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TrackOrder = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Order is on the way</Text>
      <View style={styles.timeline}>
        <View style={styles.timelineItem}>
          <View style={[styles.dot, styles.dotActive]} />
          <Text style={styles.timelineText}>Order Placed</Text>
        </View>
        <View style={styles.verticalLine} />
        <View style={styles.timelineItem}>
          <View style={styles.dot} />
          <Text style={styles.timelineText}>Picked Up</Text>
        </View>
        <View style={styles.verticalLine} />
        <View style={styles.timelineItem}>
          <View style={styles.dot} />
          <Text style={styles.timelineText}>Out for Delivery</Text>
        </View>
        <View style={styles.verticalLine} />
        <View style={styles.timelineItem}>
          <View style={styles.dot} />
          <Text style={styles.timelineText}>Delivered</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF", 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333333",
  },
  timeline: {
    flexDirection: "column", 
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20, 
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20, 
  },
  verticalLine: {
    width: 1,
    height: 80,
    backgroundColor: "#CCCCCC",
    marginLeft: 5, 
    marginRight: 5, 
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#CCCCCC",
    marginRight: 10,
  },
  dotActive: {
    backgroundColor: "#FF725E", 
  },
  timelineText: {
    fontSize: 16,
    color: "#666666", 
  },
});

export default TrackOrder;
