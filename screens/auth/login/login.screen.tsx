import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  Entypo,
  Fontisto,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { commonStyles } from "@/styles/common/common.styles";
import { router } from "expo-router";

export default function LoginScreen() {
  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [required, setRequired] = useState("");
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [error, setError] = useState({ password: "" });
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  if (!fontError && !fontsLoaded) {
    return null;
  }

  const handlePasswordValidation = (value: string) => {
    const password = value;
    const passwordSpecialCharacter = /(?=.*[!@#$&*])/;
    const passwordOneNumber = /(?=.*[0-9])/;
    const passwordSixValue = /(?=.*[6,])/;

    if (!passwordSpecialCharacter.test(password)) {
      setError({
        ...error,
        password: "Write at least one Character",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else if (!passwordOneNumber.test(password)) {
      setError({
        ...error,
        password: "Write at least one Number",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else if (!passwordSixValue.test(password)) {
      setError({
        ...error,
        password: "Write at least six digits",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else {
      setError({
        ...error,
        password: "",
      });
      setUserInfo({ ...userInfo, password: value });
    }
  };

  const handleSignIn = () => {};

  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, paddingHorizontal: 16, paddingTop: 20 }}
    >
      <ScrollView>
        <Image
          source={require("@/assets/signin/signin.png")}
          style={styles.signInImage}
        />
        <Text style={styles.welcomeText}>WELCOME BACK!</Text>
        <Text style={styles.welcome2Text}>
          Login to your existing account of LAUNDRY MATE
        </Text>
        <View style={styles.inputContainer}>
          <View>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              value={userInfo.email}
              placeholder="example@gmail.com"
              onChangeText={(value) => {
                setUserInfo({ ...userInfo, email: value });
              }}
            />
            <Fontisto
              style={{ position: "absolute", left: 36, top: 10 }}
              name="email"
              size={20}
              color={"#A1A1A1"}
            />
            {required && (
              <View style={commonStyles.errorContainer}>
                <Entypo name="cross" size={18} color={"#A1A1A1"} />
              </View>
            )}
            <View style={{ marginTop: 16 }}>
              <TextInput
                style={styles.input}
                keyboardType="default"
                defaultValue=""
                placeholder="********"
                secureTextEntry={!isPasswordVisible}
                onChangeText={(value) => {
                  setUserInfo({ ...userInfo, email: value });
                }}
              />
              <TouchableOpacity
                style={styles.visibleIcon}
                onPress={() => {
                  setIsPasswordVisible(!isPasswordVisible);
                }}
              >
                {isPasswordVisible ? (
                  <Ionicons
                    name="eye-off-outline"
                    size={24}
                    color={"#747474"}
                  />
                ) : (
                  <Ionicons name="eye-outline" size={24} color={"#747474"} />
                )}
              </TouchableOpacity>

              <SimpleLineIcons
                style={styles.icon2}
                name="lock"
                size={20}
                color={"#A1A1A1"}
              />
              {error.password && (
                <View style={commonStyles.errorContainer}>
                  <Entypo name="cross" size={18} color={"red"} />
                  <Text style={{ color: "red", fontSize: 12, marginTop: -1 }}>
                    {error?.password}
                  </Text>
                </View>
              )}
            </View>
            <TouchableOpacity onPress={() => router.push("forgot-password")}>
              <Text style={styles.forgetSection}>Forget Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleSignIn}
            >
              {buttonSpinner ? (
                <ActivityIndicator size="small" color={"white"} />
              ) : (
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: 16,
                    fontFamily: "Raleway_700Bold",
                  }}
                >
                  Sign In
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  signInImage: {
    width: "60%",
    height: 250,
    alignItems: "center",
    marginTop: 50,
    marginLeft: 80,
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF725E",
  },
  welcome2Text: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "semibold",
    marginTop: 5,
  },
  inputContainer: {
    marginHorizontal: 16,
    marginTop: 30,
    rowGap: 30,
  },
  input: {
    height: 40,
    marginHorizontal: 16,
    borderRadius: 8,
    paddingLeft: 75,
    fontSize: 16,
    backgroundColor: "white",
    color: "#A1A1A1",
  },
  visibleIcon: {
    position: "absolute",
    right: 30,
    top: 10,
  },
  icon2: {
    position: "absolute",
    left: 34,
    top: 10,
    marginTop: -2,
  },
  forgetSection: {
    marginHorizontal: 22,
    textAlign: "right",
    fontSize: 16,
    marginTop: 8,
  },
  buttonContainer: {
    backgroundColor: "#FF725E",
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 16,
    marginTop: 16,
  },
});
