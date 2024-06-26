import { Image, Text, View } from "react-native";
import React from "react";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import AppIntroSlider from "react-native-app-intro-slider";
import { onboardingSwiperData } from "@/constants/constants";
import { router } from "expo-router";
import { commonStyles } from "@/styles/common/common.styles";

export default function WelcomeScreen() {
  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontError && !fontsLoaded) {
    return null;
  }

  const renderItem = ({ item }: { item: onboardingSwiperDataType }) => (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, paddingHorizontal: 16 }}
    >
      <View style={{ marginTop: 80 }}>
        <Image
          source={item.image}
          style={{
            alignSelf: "center",
            marginBottom: 30,
            width: 200,
            height: 250,
          }}
        />
        <Text
          style={[commonStyles.titleText, { fontFamily: "Raleway_700Bold" }]}
        >
          {item?.title}
        </Text>
        <Text
          style={[
            commonStyles.description,
            { fontFamily: "Nunito_400Regular" },
          ]}
        >
          {item?.description}
        </Text>
        <Text
          style={[
            commonStyles.shortDescription,
            { fontFamily: "Nunito_400Regular" },
          ]}
        >
          {item?.shortDescription}
        </Text>
      </View>
    </LinearGradient>
  );

  const renderNextButton = () => (
    <View style={commonStyles.buttonContainer}>
      <Text style={commonStyles.buttonText}>NEXT</Text>
    </View>
  );

  const renderDoneButton = () => (
    <View style={commonStyles.buttonContainer}>
      <Text style={commonStyles.buttonText}>DONE</Text>
    </View>
  );

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={onboardingSwiperData}
      onDone={() => {
        router.push("/login");
      }}
      onSkip={() => {
        router.push("/login");
      }}
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
      showSkipButton={false}
      dotStyle={commonStyles.dotStyle}
      bottomButton={true}
      activeDotStyle={commonStyles.activeDotStyle}
    />
  );
}

