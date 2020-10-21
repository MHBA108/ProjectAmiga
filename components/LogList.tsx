import React, { Component } from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import LogItem from "./LogItem";
import { LogData } from "../types";
import { COLORS } from "../assets/COLORS";

// dummy logs
const log1: LogData = {
  sliderValue: 90,
  emotions: ["happy", "excited", "anxious", "enthusiastic"],
  color: "#35ff00",
};
const log2: LogData = {
  sliderValue: 12,
  emotions: ["sad", "anxious"],
  color: "#ff4000",
};
const log3: LogData = {
  sliderValue: 65,
  emotions: ["cheerful", "energetic", "rested"],
  color: "#afff00",
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
                sliderValue={item.sliderValue}
                emotions={item.emotions}
                color={item.color}
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
    backgroundColor: "#4E5E85",
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
