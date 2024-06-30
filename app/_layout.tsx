import { useEffect, useState } from "react";
import "react-native-reanimated";
import { Stack } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <>
      {user ? (
        <Stack  screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="/(routes)/welcome-intro/index" />
          <Stack.Screen name="/(routes)/landing/index" />
          <Stack.Screen name="/(routes)/pricing/index" />
          <Stack.Screen name="/(routes)/pickup-date/index" />
          <Stack.Screen name="/(routes)/items/index" />
        </Stack>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
  },
});
