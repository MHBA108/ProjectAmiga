import React, { Component } from "react";
import { Text, View, Alert } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import FeedItem from "./FeedItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "../assets/COLORS";

export default class FeedList extends Component {
  render() {
    return (
      <View>
        <View style={styles.spacing} />
        <FeedItem />
        <View style={styles.spacing} />
        <FeedItem />
        <View style={styles.spacing} />
        <FeedItem />
        <TouchableOpacity
          style={styles.friendButton}
          onPress={() => Alert.alert("Add friend button pressed")}
        >
          <Text style={styles.buttonText}>Click here to add friends!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  buttonText: {
    color: COLORS.darkBlue,
    fontSize: "30rem",
    fontFamily: "HindSiliguri_600SemiBold",
  },
  friendButton: {
    width: "100%",
    aspectRatio: 10 / 2,
    backgroundColor: COLORS.pink,
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
