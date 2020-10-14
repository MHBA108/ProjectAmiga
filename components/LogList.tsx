import React, { Component } from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import LogItem from "./LogItem";

export default class LogList extends Component {
  // TODO get number of logs

  // if none, display penny for your thoughts

  // otherwise construct list of LogItem

  render() {
    return (
      <View>
        <View style={styles.spacing}></View>
        <LogItem></LogItem>
        <View style={styles.spacing}></View>
        <LogItem></LogItem>
        <View style={styles.spacing}></View>
        <LogItem></LogItem>
      </View>
    );
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
    color: "#F2E9E3",
    fontSize: "20rem",
    textAlign: "center",
    fontFamily: "HindSiliguri_300Light",
  },
});
