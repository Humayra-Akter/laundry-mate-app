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
  Alert,
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
import { setUser } from "@/redux/UserReducer";
import { useDispatch } from "react-redux";

export default function SignupScreen() {
  const toast = useToast();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [required, setRequired] = useState("");
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [error, setError] = useState({ password: "" });
  const [focusedInput, setFocusedInput] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const auth = FIREBASE_AUTH;
  const dispatch = useDispatch();

  const handleSignUp = async () => {
     try {
      if (!userInfo.name || !userInfo.email || !userInfo.password) {
        setRequired("All fields are required");
        return;
      }
      setButtonSpinner(true);
      // const response = await createUserWithEmailAndPassword(
      //   auth,
      //   userInfo?.email,
      //   userInfo?.password
      // );
      const response = await fetch("http://192.168.1.170:5000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name:userInfo?.name,
          email: userInfo?.email,
          password: userInfo?.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(setUser({ email: userInfo.email }));
        router.push("/home");
      } else {
        Alert.alert("Register Failed", data.message);
      }
    }
     catch (error: any) {
      console.log(error);
      alert("Register failed " + error.message);
    }
  };

  return (
    <LinearGradient
      colors={["#b521ff", "#691991", "#53007d"]}
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
                  style={[
                    styles.input,
                    focusedInput === "name" && styles.inputFocused,
                  ]}
                  keyboardType="default"
                  value={userInfo.name}
                  placeholder="your name"
                  placeholderTextColor="#A1A1A1"
                  onChangeText={(value) => {
                    setUserInfo({ ...userInfo, name: value });
                  }}
                  onFocus={() => setFocusedInput("name")}
                  onBlur={() => setFocusedInput("")}
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
                  style={[
                    styles.input,
                    focusedInput === "email" && styles.inputFocused,
                  ]}
                  keyboardType="email-address"
                  value={userInfo.email}
                  placeholderTextColor="#A1A1A1"
                  placeholder="example@gmail.com"
                  autoCapitalize="none"
                  onChangeText={(value) => {
                    setUserInfo({ ...userInfo, email: value });
                  }}
                  onFocus={() => setFocusedInput("email")}
                  onBlur={() => setFocusedInput("")}
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
              </View>
              {/* sign in button  */}
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleSignUp}
              >
                {buttonSpinner ? (
                  <ActivityIndicator size="small" color={"white"} />
                ) : (
                  <Text style={styles.buttonText}>Sign Up</Text>
                )}
              </TouchableOpacity>

              {/* redirect button  */}
              <View style={styles.signUpRedirect}>
                <Text style={styles.redirectText}>
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={() => router.push("/login")}>
                  <Text style={styles.signInText}>Sign In</Text>
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
    marginLeft: "auto",
    marginRight: "auto",
  },
  inputFocused: {
    borderColor: "#ffac5e",
    color: "black",
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
    height: 40,
    marginHorizontal: 16,
    borderRadius: 8,
    paddingLeft: 75,
    fontSize: 16,
    backgroundColor: "white",
    color: "#A1A1A1",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
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
    marginTop: 20,
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
  redirectText: {
    fontSize: 18,
    fontWeight: "300",
    color: "#fff",
  },
  signInText: {
    fontWeight: "400",
    fontSize: 18,
    marginLeft: 4,
    color: "#ffac5e",
  },
});
