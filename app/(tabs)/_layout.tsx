//app/(tabs)/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import store from "@/store";

export default function Layout() {
  return (
    <Provider store={store}>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome name="home" size={24} color="#ffac5e" />
              ) : (
                <FontAwesome name="home" size={24} color="black" />
              ),
          }}
        />
        <Tabs.Screen
          name="basket"
          options={{
            tabBarLabel: "Basket",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome5
                  name="shopping-basket"
                  size={24}
                  color="#ffac5e"
                />
              ) : (
                <FontAwesome5 name="shopping-basket" size={24} color="black" />
              ),
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            tabBarLabel: "Orders",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons
                  name="account-details"
                  size={24}
                  color="#ffac5e"
                />
              ) : (
                <MaterialCommunityIcons
                  name="account-details"
                  size={24}
                  color="black"
                />
              ),
          }}
        />
      </Tabs>
    </Provider>
  );
}
