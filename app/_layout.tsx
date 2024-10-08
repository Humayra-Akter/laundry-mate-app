//app/_layout.tsx

import React from "react";
import { Tabs, Slot } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import store from "@/store";
import { AuthProvider, useAuth } from "@/app/AuthContext";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

function MainLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push("/(authenticate)/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#ffac5e" />
      </View>
    );
  }

  return user ? (
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
        name="orders"
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
    </Tabs>
  ) : null;
}

export default function Layout() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Slot />
        {/* <MainLayout /> */}
      </Provider>
    </AuthProvider>
  );
}
