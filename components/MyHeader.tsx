import React from "react";
import { Header } from "react-native-elements";
import HamburgerMenu from "./HamburgerMenu";
import { COLORS } from "../assets/COLORS";
import EStyleSheet from "react-native-extended-stylesheet";
import { View, Platform } from "react-native";

const MyHeader = (props: { navigation: any }) => {
  return (
    <View style={styles.circle}>
      <HamburgerMenu navigation={props.navigation} />
    </View>
  );
};

const styles = EStyleSheet.create({
  circle: {
    width: "40rem",
    height: "40rem",
    borderRadius: "20rem",
    position: "absolute",
    top: "50rem",
    left: "18rem",
    backgroundColor: COLORS.beige,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

export default MyHeader;
