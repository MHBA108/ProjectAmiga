import React from "react";
import { Icon } from "react-native-elements";

const HamburgerMenu = (props: { navigation: { toggleDrawer: () => void } }) => {
  return (
    <Icon
      color="#464D77"
      name="menu"
      onPress={() => props.navigation.toggleDrawer()}
    />
  );
};

export default HamburgerMenu;
