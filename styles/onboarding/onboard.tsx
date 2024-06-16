import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  gradient: {},
  firstContainer: {
    alignItems: "center",
    marginTop: 250,
  },
  logo: {
    width: wp("25%"),
    height: hp("12%"),
  },
  titleText: {
    fontSize: hp("3%"),
    textAlign: "center",
    color: "#000",
  },
  titleWrapper: {
    flexDirection: "row",
  },
  dscpWrapper: {
    marginTop: 30,
  },
  dscpText: {
    textAlign: "center",
    color: "#575757",
    fontSize: hp("2%"),
    marginTop: 10,
  },
  buttonWrapper: {
    backgroundColor: "#FF725E",
    width: wp("70%"),
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 100,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: hp("2%"),
    fontWeight: "bold",
  },
});
