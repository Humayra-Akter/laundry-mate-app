import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Fontisto,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { router } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "@/firebaseConfig";

export default function SignupScreen() {
  const toast = useToast();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [required, setRequired] = useState("");
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [error, setError] = useState({ password: "" });
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const auth = FIREBASE_AUTH;

  const handleSignUp = async () => {
    try {
      if (!userInfo.name || !userInfo.email || !userInfo.password) {
        setRequired("All fields are required");
        return;
      }
      setButtonSpinner(true);
      const response = await createUserWithEmailAndPassword(
        auth,
        userInfo?.email,
        userInfo?.password
      );
      console.log(response);
      await fetch("http://192.168.1.170:5000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          router.push("/(routes)/landing");
        });
    } catch (error: any) {
      console.log(error);
      alert("Login failed " + error.message);
    }
  };

  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, paddingHorizontal: 16, paddingTop: 20 }}
    >
      <ScrollView>
        <Image
          source={require("@/assets/signin/signup.png")}
          style={styles.signInImage}
        />
        <Text style={styles.welcomeText}>Let's Get Started</Text>
        <Text style={styles.welcome2Text}>
          Create an account to LAUNDRY MATE to get all features
        </Text>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.inputContainer}>
            <View>
              {/* name input  */}
              <View>
                <TextInput
                  style={styles.input}
                  keyboardType="default"
                  value={userInfo.name}
                  placeholder="your name"
                  onChangeText={(value) => {
                    setUserInfo({ ...userInfo, name: value });
                  }}
                />
                <AntDesign
                  style={{ position: "absolute", left: 36, top: 10 }}
                  name="user"
                  size={20}
                  color={"#A1A1A1"}
                />
                {required && (
                  <View style={styles.errorContainer}>
                    <Entypo name="cross" size={18} color={"#A1A1A1"} />
                  </View>
                )}
              </View>
              {/* email input  */}
              <View style={{ marginTop: 16 }}>
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
              {/* sign in button  */}
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleSignUp}
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
                    Sign Up
                  </Text>
                )}
              </TouchableOpacity>

              {/* redirect button  */}
              <View style={styles.signUpRedirect}>
                <Text
                  style={{ fontSize: 18, fontFamily: "Raleway_600SemiBold" }}
                >
                  Already have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/(routes)/login")}
                >
                  <Text
                    style={{
                      fontFamily: "Raleway_600SemiBold",
                      fontSize: 18,
                      marginLeft: 4,
                      color: "#FF725E",
                    }}
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
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
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    position: "absolute",
    top: 60,
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
});
