import React, { Component } from "react";
import { Text, View, ScrollView, Alert, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Log } from "../types";
import MoodSlider from "./MoodSlider";
import EditModal from "./EditModal";
import { COLORS } from "../assets/COLORS";
import moment from "moment";

const arrayToBubbles = require("../assets/ArrayToBubbles");

export default class LogItem extends Component<Log, Log> {
  render() {
    return (
      <View style={styles.log}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            {moment(this.props.timestamp).format("M/D/YYYY")}
          </Text>
        </View>
        <View style={styles.moodHeaderContainer}>
          <Text style={styles.moodHeaderText}>Mood Descriptions:</Text>
        </View>
        <View style={styles.moodBubbleContainer}>
          <ScrollView horizontal={true}>
            {arrayToBubbles(this.props.moodWords, this.props.moodPercentile)}
          </ScrollView>
        </View>
        {<MoodSlider sliderValue={this.props.moodPercentile} disabled={true} />}
        <EditModal
          moodPercentile={this.props.moodPercentile}
          text={this.props.text}
          timestamp={this.props.timestamp}
          moodWords={this.props.moodWords}
        />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  log: {
    width: "100%",
    aspectRatio: 5 / 2,
    backgroundColor: "#4E5E85",
    borderRadius: 10,
    flexDirection: "column",
    padding: "5rem",
    justifyContent: "space-around",
  },
  dateContainer: {
    width: "100%",
    backgroundColor: "transparent",
    aspectRatio: 20 / 1,
  },
  date: {
    color: COLORS.beige,
    fontSize: "13rem",
    textAlign: "center",
    fontFamily: "HindSiliguri_400Regular",
  },
  moodHeaderContainer: {
    width: "100%",
    backgroundColor: "transparent",
    aspectRatio: 15 / 1,
  },
  moodHeaderText: {
    color: COLORS.beige,
    fontSize: "14rem",
    fontFamily: "HindSiliguri_600SemiBold",
    textAlign: "left",
  },
  moodBubbleContainer: {
    width: "100%",
    aspectRatio: 7 / 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    paddingVertical: "5rem",
  },
  sliderContainer: {
    width: "100%",
    backgroundColor: "transparent",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "flex-end",
    aspectRatio: 7 / 1,
  },
  editContainer: {
    position: "absolute",
    alignSelf: "flex-end",
    backgroundColor: "#555E90",
    borderRadius: 10,
    padding: "5rem",
    right: "5rem",
    top: "5rem",
  },
  emotionBubble: {
    height: "100%",
    overflow: "hidden",
    borderRadius: 20,
    justifyContent: "center",
    padding: "5rem",
  },
  moodText: {
    color: COLORS.beige,
    fontSize: "14rem",
    fontFamily: "HindSiliguri_600SemiBold",
    textAlign: "center",
  },
  moodSpacer: {
    paddingRight: "8rem",
  },
});
