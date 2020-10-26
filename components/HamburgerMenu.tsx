import React from "react";
import { Icon } from "react-native-elements";
import { COLORS } from "../assets/COLORS";

const HamburgerMenu = (props: { navigation: { toggleDrawer: () => void } }) => {
  return (
    <Icon
      color={COLORS.darkBlue}
      name="menu"
      onPress={() => props.navigation.toggleDrawer()}
    />
  );
};

export default HamburgerMenu;
