import React, { Component } from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../assets/COLORS";

export default class ResourcesList extends Component {
  render() {
    return (
      <View>
        <View style={styles.spacing}></View>
        <View style={styles.resource}></View>
        <View style={styles.spacing}></View>
        <View style={styles.resource}></View>
        <View style={styles.spacing}></View>
        <View style={styles.resource}></View>
        <View style={styles.spacing}></View>
        <View style={styles.resource}></View>
        <View style={styles.spacing}></View>
        <View style={styles.resource}></View>
        <View style={styles.spacing}></View>
        <View style={styles.resource}></View>
        <View style={styles.spacing}></View>
        <View style={styles.resource}></View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  resource: {
    width: "100%",
    aspectRatio: 7 / 2,
    backgroundColor: "#4E5E85",
    borderRadius: 10,
    flexDirection: "column",
    padding: "5rem",
    justifyContent: "space-around",
  },
  spacing: {
    padding: "5rem",
    backgroundColor: "transparent",
  },
});
