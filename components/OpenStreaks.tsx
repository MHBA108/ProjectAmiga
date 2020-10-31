import React, { Component } from "react";
import { View, Platform } from "react-native";

import { COLORS } from "../assets/COLORS";
import StreaksModal from "./StreaksModal";
import EStyleSheet from "react-native-extended-stylesheet";

export default class OpenStreaks extends Component<
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
        <StreaksModal />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.yellow,
    aspectRatio: 1 / 1,
    flex: 1,
    borderRadius: 20,
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
