import React, { Component } from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import LogItem from "./LogItem";
import { LogData } from "../types";
import { COLORS } from "../assets/COLORS";

var valueToColor = require("../assets/ValueToColor");

// dummy logs
const log1: LogData = {
  date: new Date(2020, 8, 1),
  sliderValue: 90,
  emotions: ["happy", "excited", "anxious", "enthusiastic"],
  written: "It was a great day. I am so happy, I could fly.",
};
const log2: LogData = {
  date: new Date(2020, 8, 2),
  sliderValue: 12,
  emotions: ["sad", "anxious"],
  written: "It was a bad day. But I think tomorrow will be better.",
};
const log3: LogData = {
  date: new Date(2020, 8, 3),
  sliderValue: 65,
  emotions: ["cheerful", "energetic", "rested"],
  written:
    "It was middle of the road day. I stubbed my toe on the couch but then took a really nice nap.",
};

export default class LogList extends Component<
  {},
  {
    logNumber: number;
    logs: LogData[];
  }
> {
  // TODO get number of logs and log data from backend
  state = {
    logNumber: 3,
    logs: [log1, log2, log3],
  };

  render() {
    if (this.state.logNumber == 0) {
      return (
        <View style={styles.log}>
          <Text style={styles.text}>It's quiet... too quiet.</Text>
        </View>
      );
    } else {
      return (
        <View>
          {this.state.logs.map((item, key) => (
            <View key={key}>
              <View style={styles.spacing}></View>
              <LogItem
                date={item.date}
                sliderValue={item.sliderValue}
                emotions={item.emotions}
                written={item.written}
              ></LogItem>
            </View>
          ))}
        </View>
      );
    }
  }
}

const styles = EStyleSheet.create({
  spacing: {
    padding: "5rem",
    backgroundColor: "transparent",
  },
  log: {
    width: "100%",
    aspectRatio: 5 / 2,
    backgroundColor: COLORS.darkBlueAccent,
    borderRadius: 10,
    flexDirection: "column",
    padding: "5rem",
    justifyContent: "space-around",
  },
  text: {
    color: COLORS.beige,
    fontSize: "20rem",
    textAlign: "center",
    fontFamily: "HindSiliguri_300Light",
  },
});
