//app/(authenticate)/_layout.tsx
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "@/store";

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="forgotPassword" />
      </Stack>
    </Provider>
  );
}
