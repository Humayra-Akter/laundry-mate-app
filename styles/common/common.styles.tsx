import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#FF725E",
    width: wp("90%"),
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
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
  input: {
    height: 40,
    marginHorizontal: 16,
    borderRadius: 8,
    paddingLeft: 36,
    fontSize: 16,
    backgroundColor: "white",
    color: "#A1A1A1",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    position: "absolute",
    top: 60,
  },
});
