import React from "react";
import { Header } from "react-native-elements";
import HamburgerMenu from "./HamburgerMenu";
import { COLORS } from "../assets/COLORS";

const MyHeader = (props: { navigation: any }) => {
  return (
    <Header
      leftComponent={<HamburgerMenu navigation={props.navigation} />}
      statusBarProps={{ barStyle: "light-content" }}
      containerStyle={{
        backgroundColor: COLORS.beige,
      }}
    />
  );
};

export default MyHeader;
