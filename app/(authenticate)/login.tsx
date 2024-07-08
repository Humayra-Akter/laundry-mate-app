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
  FontAwesome,
  Fontisto,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { router } from "expo-router";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function LoginScreen() {

  const auth = FIREBASE_AUTH;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [required, setRequired] = useState("");
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [error, setError] = useState({ password: "" });
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });


  const handleSignIn = async () => {
    try {
      setButtonSpinner(true);
      const response = await fetch("http://192.168.1.170:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userInfo?.email,
          password: userInfo?.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        router.push("/(routes)/landing");
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (error: any) {
      console.log(error);
      alert("Login failed: " + error.message);
    } finally {
      setButtonSpinner(false);
    }
  };

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
            {/* email input  */}
            <View>
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                value={userInfo.email}
                placeholder="example@gmail.com"
                autoCapitalize="none"
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
                <View style={styles.errorContainer}>
                  <Entypo name="cross" size={18} color={"#A1A1A1"} />
                </View>
              )}
            </View>
            {/* password input  */}
            <View style={{ marginTop: 16 }}>
              <TextInput
                style={styles.input}
                keyboardType="default"
                defaultValue=""
                placeholder="********"
                secureTextEntry={!isPasswordVisible}
                onChangeText={(value) => {
                  setUserInfo({ ...userInfo, password: value });
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
                <View style={styles.errorContainer}>
                  <Entypo name="cross" size={18} color={"red"} />
                  <Text style={{ color: "red", fontSize: 12, marginTop: -1 }}>
                    {error?.password}
                  </Text>
                </View>
              )}
            </View>
            {/* forget password  */}
            <TouchableOpacity
              onPress={() => router.push("/(routes)/forgot-password")}
            >
              <Text style={styles.forgetSection}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* sign in button  */}
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
                  Login
                </Text>
              )}
            </TouchableOpacity>
            {/* google login  */}
            {/* <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                gap: 16,
              }}
            >
              <TouchableOpacity>
                <FontAwesome
                  name="google"
                  size={30}
                  style={{ color: "#FF725E" }}
                />
              </TouchableOpacity>
            </View> */}
            {/* redirect button  */}
            <View style={styles.signUpRedirect}>
              <Text style={{ fontSize: 18, fontFamily: "Raleway_600SemiBold" }}>
                Don't have an account?
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/(routes)/sign-up")}
              >
                <Text
                  style={{
                    fontFamily: "Raleway_600SemiBold",
                    fontSize: 18,
                    marginLeft: 4,
                    color: "#FF725E",
                  }}
                >
                  Register
                </Text>
              </TouchableOpacity>
            </View>
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
    fontSize: 12,
    fontWeight: "semibold",
    marginTop: 5,
  },
  inputContainer: {
    marginHorizontal: 16,
    marginTop: 40,
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
  signUpRedirect: {
    flexDirection: "row",
    marginHorizontal: 22,
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: hp("2%"),
    fontWeight: "bold",
  },
  dotStyle: {
    backgroundColor: "#FF725E",
    width: wp("2%"),
    height: hp("1%"),
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDotStyle: {
    backgroundColor: "#000",
    width: wp("2%"),
    height: hp("1%"),
    borderRadius: 5,
    marginHorizontal: 5,
  },
  titleText: {
    fontSize: hp("3.5%"),
    textAlign: "center",
  },
  description: {
    fontSize: hp("1.5%"),
    textAlign: "center",
    color: "#FF725E",
    marginTop: 10,
  },
  shortDescription: {
    fontSize: hp("2%"),
    textAlign: "center",
    color: "#000",
    marginTop: 10,
  },
  
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    position: "absolute",
    top: 60,
  },
});
