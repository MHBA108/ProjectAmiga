import React from "react";
import { Header } from "react-native-elements";
import HamburgerMenu from "./HamburgerMenu";

const MyHeader = (props: { navigation: any }) => {
  return (
    <Header
      leftComponent={<HamburgerMenu navigation={props.navigation} />}
      statusBarProps={{ barStyle: "light-content" }}
      containerStyle={{
        backgroundColor: "#F2E9E3",
      }}
    />
  );
};

export default MyHeader;
