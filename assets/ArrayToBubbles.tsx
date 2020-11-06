import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../assets/COLORS";
import React from "react";
import { Text, View } from "react-native";

const valueToColor = require("../assets/ValueToColor");

module.exports = function (emotions: String[], perc: number) {
  return emotions.map((item, key) => (
    <View key={key}>
      <View
        style={[
          styles.emotionBubble,
          {
            borderColor: valueToColor(perc),
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
    textAlign: "center",
  },
  emotionBubble: {
    height: "32rem",
    overflow: "hidden",
    borderWidth: "2rem",
    borderRadius: 18,
    justifyContent: "center",
    padding: "2rem",
    marginVertical: "2rem",
    marginHorizontal: "2rem",
    backgroundColor: "transparent",
  },
});
