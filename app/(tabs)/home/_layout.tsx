//app/(tabs)/home/_layout.tsx

import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="pickup" />
      <Stack.Screen name="trackOrder" />
      <Stack.Screen name="search" />
      <Stack.Screen name="addToCart" />
    </Stack>
  );
}
