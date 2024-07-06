import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Step4 = () => {
  return (
    <View style={{ marginTop: 10, backgroundColor: "white", borderRadius: 10 }}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Your Cart</Text>
      </View>
      <View style={{ marginHorizontal: 12 }}>
        <Pressable style={styles.itemDetail}>
          <View>
            <Image style={{ width: 40, height: 40 }} />
          </View>
          <View style={{ flex: 1 }}>
            <Text>item.name</Text>
          </View>
          <Pressable>
            <AntDesign name="pluscircleo" size={24} color="#89CFF0" />
          </Pressable>
        </Pressable>
      </View>
      <View style={styles.itemBg}>
        <View style={styles.itemBG2}>
          <Text style={{ color: "white", fontWeight: "500" }}>Total Amount</Text>
          <Text style={{ color: "white", fontWeight: "500" }}>BDT</Text>
        </View>
        <View style={[styles.common, { marginVertical: 10 }]}>
          <Text style={{ color: "white", fontWeight: "500" }}>Promo Code</Text>
          <Text style={{ color: "white", fontWeight: "500" }}>Rs 0</Text>
        </View>
        <View style={[styles.common, { marginVertical: 10 }]}>
          <Text style={{ color: "white", fontWeight: "500" }}>Delivery Charges</Text>
          <Text style={{ color: "white", fontWeight: "500" }}>Rs 25</Text>
        </View>
        <View style={[styles.common, { marginVertical: 10 }]}>
          <Text style={{ color: "white", fontWeight: "500" }}>Total Payable</Text>
          <Text style={{ color: "white", fontWeight: "500" }}>BDT total + 25</Text>
        </View>
      </View>
      <View style={styles.totalBG}>
        <View style={[styles.common, { marginVertical: 10 }]}>
          <Text style={{ color: "white", fontWeight: "500" }}>TOTAL AMOUNT</Text>
          <Text style={{ color: "white", fontWeight: "500" }}>BDT</Text>
        </View>
        <View style={[styles.common, { marginVertical: 10 }]}>
          <Text style={{ color: "white", fontWeight: "500" }}>TAXES AND CHARGES</Text>
          <Text style={{ color: "white", fontWeight: "500" }}>BDT</Text>
        </View>
        <Pressable style={[styles.placeOrderButton, styles.common]}>
          <Text style={{ color: "white", fontWeight: "600" }}>Place Order</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  itemBg: {
    backgroundColor: "#0066b2",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  itemBG2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  common: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalBG: {
    backgroundColor: "#0066b2",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  placeOrderButton: {
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default Step4;
