import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
import { useFonts } from "expo-font";
import { COLORS } from "../assets/COLORS";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeText: {
    color: COLORS.darkBlue,
    fontSize: 24,
    fontFamily: "HindSiliguri_400Regular",
    marginLeft: 10,
  },

  dateText: {
    color: COLORS.darkBlue,
    fontSize: 24,
    fontFamily: "HindSiliguri_400Regular",
    marginLeft: 10,
  },
});

export default class Clock extends Component<
  {},
  { time: string; date: string }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      time: moment().format("dddd, MMMM Do"),
      date: moment().format("H:mm A"),
    };
  }

  render() {
    setTimeout(() => {
      this.setState({
        date: moment().format("dddd, MMMM Do"),
        time: moment().format("h:mm A"),
      });
    });

    return (
      <View style={styles.container}>
        <Text style={styles.dateText}>{this.state.date}</Text>
        <Text style={styles.timeText}>{this.state.time}</Text>
      </View>
    );
  }
}
