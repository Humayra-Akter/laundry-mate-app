import { useState } from "react";
import { Text, View } from "react-native";
import "react-native-reanimated";
import OnBoarding from "./(routes)/onboarding";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <View></View>
      ) : (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="/(routes)/welcome-intro/index" />
        </Stack>
      )}
    </>
  );
}
