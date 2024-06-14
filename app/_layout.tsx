import { useFonts } from "expo-font";
import { useState } from "react";
import { Text, View } from "react-native";
import "react-native-reanimated";
import OnBoarding from "./(routes)/onboarding";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return <View>{isLoggedIn ? <View></View> : <OnBoarding />}</View>;
}
