//app/basket/_layout.tsx

import { Stack } from "expo-router";

export default function BasketLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="payment" />
        <Stack.Screen name="cart" />
      </Stack>
    </>
  );
}
