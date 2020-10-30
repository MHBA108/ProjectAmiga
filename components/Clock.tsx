import React, { Component } from "react";
import { View, Text } from "react-native";
import moment from "moment";
import { COLORS } from "../assets/COLORS";

import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  dateText: {
    color: COLORS.darkBlue,
    fontSize: "16rem",
    fontFamily: "HindSiliguri_400Regular",
    textAlign: "right",
  },
});

export default class Clock extends Component<
  { showDate: boolean; showTime: boolean },
  { date: string; month: string; dayOfWeek: string }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      date: moment().format("D YYYY"),
      month: moment().format("MMMM").toUpperCase(),
      dayOfWeek: moment().format("dddd").toUpperCase(),
    };
  }

  dateText() {
    return (
      <Text style={styles.dateText}>
        {this.state.dayOfWeek}
        {this.state.month}
        {this.state.date}
      </Text>
    );
  }

  render() {
    setTimeout(() => {
      this.setState({
        date: moment().format("D YYYY"),
        month: moment().format("MMMM ").toUpperCase(),
        dayOfWeek: moment().format("dddd, ").toUpperCase(),
      });
    });

    return (
      <View style={styles.container}>
        {this.props.showDate ? this.dateText() : null}
      </View>
    );
  }
}
