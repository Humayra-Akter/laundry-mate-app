import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  firstContainer: {
    alignItems: "center",
    marginTop: 250,
  },
  logo: {
    width: wp("25%"),
    height: hp("12%"),
  },
  titleText: {
    fontSize: hp("4%"),
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
  },
  buttonWrapper: {
    backgroundColor: "#2467EC",
    width: wp("80%"),
    paddingVertical: 18,
    borderRadius: 5,
    marginTop: 50,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight:"bold"
  },
});
