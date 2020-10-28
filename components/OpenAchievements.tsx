import React, { Component } from "react";
import { View, LayoutAnimation, Platform } from "react-native";
import { COLORS } from "../assets/COLORS";
import AchievementsModal from "./AchievementsModal";
import EStyleSheet from "react-native-extended-stylesheet";

export default class CreateLog extends Component<
  {},
  {
    modalVisible: boolean;
    height: number;
    sliderValue: number;
  }
> {
  triggerModal = () => this.setState({ modalVisible: true });

  constructor(props: {}) {
    super(props);
    this.state = {
      modalVisible: false,
      height: 0,
      sliderValue: 50,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <AchievementsModal />
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
    width: "100%",
    aspectRatio: 1 / 1,
  },
});
