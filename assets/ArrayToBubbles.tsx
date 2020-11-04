import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../assets/COLORS";
import React from "react";
import { Text, View } from "react-native";

var valueToColor = require("../assets/ValueToColor");

module.exports = function (emotions: String[], perc: number) {
  return emotions.map((item, key) => (
    <View key={key}>
      <View
        style={[
          styles.emotionBubble,
          {
            backgroundColor: valueToColor(perc),
          },
        ]}
      >
        <Text style={styles.moodHeaderText}>{item}</Text>
      </View>
    </View>
  ));
};

const styles = EStyleSheet.create({
  moodHeaderText: {
    color: COLORS.beige,
    fontSize: "14rem",
    fontFamily: "HindSiliguri_600SemiBold",
    textAlign: "left",
  },
  emotionBubble: {
    height: "32rem",
    overflow: "hidden",
    borderRadius: 18,
    justifyContent: "center",
    padding: "5rem",
    marginVertical: "2rem",
    marginHorizontal: "2rem",
  },
});
