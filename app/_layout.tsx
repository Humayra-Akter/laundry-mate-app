import { useState } from "react";
import { View } from "react-native";
import "react-native-reanimated";
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
          <Stack.Screen name="/(routes)/landing/index" />
          <Stack.Screen name="/(routes)/login/index" />
          <Stack.Screen name="/(routes)/sign-up/index" />
          <Stack.Screen name="/(routes)/forgot-password/index" />
          <Stack.Screen name="/(routes)/verifyAccount/index" />
        </Stack>
      )}
    </>
  );
}
