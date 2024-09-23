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
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { router } from "expo-router";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import { Alert } from "react-native";
import { setUser } from "@/redux/UserReducer";
import { useDispatch } from "react-redux";

export default function LoginScreen() {
  const auth = FIREBASE_AUTH;
  const dispatch = useDispatch();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [required, setRequired] = useState("");
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [error, setError] = useState({ password: "" });
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [focusedInput, setFocusedInput] = useState("");

  const handleSignIn = async () => {
    try {
      setButtonSpinner(true);
      const response = await fetch(
        "https://laundry-mate-server.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userInfo?.email,
            password: userInfo?.password,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch(setUser({ email: userInfo.email }));
        router.push("/home");
      } else {
        Alert.alert("Login Failed", data.message);
      }
    } finally {
      setButtonSpinner(false);
    }
  };

  return (
    <LinearGradient
      colors={["#b521ff", "#691991", "#53007d"]}
      style={styles.gradient}
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
                style={[
                  styles.input,
                  focusedInput === "email" && styles.inputFocused,
                ]}
                keyboardType="email-address"
                value={userInfo.email}
                placeholder="example@gmail.com"
                placeholderTextColor="#A1A1A1"
                autoCapitalize="none"
                onChangeText={(value) => {
                  setUserInfo({ ...userInfo, email: value });
                }}
                onFocus={() => setFocusedInput("email")}
                onBlur={() => setFocusedInput("")}
              />

              <Fontisto
                style={styles.icon}
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
                style={[
                  styles.input,
                  focusedInput === "password" && styles.inputFocused,
                ]}
                keyboardType="default"
                value={userInfo.password}
                placeholder="********"
                placeholderTextColor="#A1A1A1"
                secureTextEntry={!isPasswordVisible}
                onChangeText={(value) => {
                  setUserInfo({ ...userInfo, password: value });
                }}
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput("")}
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
                  <Text style={styles.errorText}>{error?.password}</Text>
                </View>
              )}
            </View>
            {/* forget password  */}
            <TouchableOpacity onPress={() => router.push("/forgotPassword")}>
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
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            {/* redirect button  */}
            <View style={styles.signUpRedirect}>
              <Text style={styles.signUpText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text style={styles.registerText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  signInImage: {
    width: "60%",
    height: 250,
    alignItems: "center",
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffac5e",
  },
  welcome2Text: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 5,
    color: "#fff",
  },
  inputContainer: {
    marginHorizontal: 16,
    marginTop: 40,
    rowGap: 30,
  },
  input: {
    width: "90%",
    paddingHorizontal: 20,
    height: 40,
    marginHorizontal: 16,
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: 55,
    backgroundColor: "white",
    color: "#A1A1A1",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    marginBottom: 4,
  },
  inputFocused: {
    borderColor: "#ffac5e",
    color: "black",
  },
  icon: {
    position: "absolute",
    left: 36,
    top: 10,
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
    color: "#ffac5e",
    fontWeight: "semibold",
  },
  buttonContainer: {
    width: "90%",
    backgroundColor: "#ffac5e",
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
  },
  buttonText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  signUpRedirect: {
    flexDirection: "row",
    marginHorizontal: 22,
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  signUpText: {
    fontSize: 18,
    fontWeight: "400",
    color: "#fff",
  },
  registerText: {
    fontWeight: "400",
    fontSize: 18,
    marginLeft: 4,
    color: "#ffac5e",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    position: "absolute",
    top: 60,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -1,
  },
});
