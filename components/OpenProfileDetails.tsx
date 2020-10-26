import React, { Component } from "react";
import { View, Platform } from "react-native";

import { COLORS } from "../assets/COLORS";
import ProfileDetailsModal from "./ProfileDetailsModal";
import EStyleSheet from "react-native-extended-stylesheet";

export default class OpenProfileDetails extends Component<
  {},
  {
    modalVisible: boolean;
  }
> {
  triggerModal = () => this.setState({ modalVisible: true });

  constructor(props: {}) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ProfileDetailsModal />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 2 / 1,
    height: "30rem",
    backgroundColor: COLORS.yellow,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 7,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
