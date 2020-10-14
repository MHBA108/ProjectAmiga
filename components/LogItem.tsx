import React, { Component } from "react";
import { Text, View, ScrollView, Alert, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { AntDesign } from "@expo/vector-icons";
import Slider from "react-native-slider";
import { LinearGradient } from "expo-linear-gradient";

const emotions = ["happy", "excited", "anxious", "enthusiastic"];
const color = "#67d642";

export default class LogItem extends Component {
  value = 80;

  // TODO: one version of this method to import where needed
  perc2color(perc: number) {
    var r,
      g,
      b = 0;
    if (perc < 50) {
      r = 255;
      g = Math.round(5.1 * perc);
    } else {
      g = 255;
      r = Math.round(510 - 5.1 * perc);
    }
    let h = r * 0x10000 + g * 0x100 + b * 0x1;
    return "#" + ("000000" + h.toString(16)).slice(-6);
  }

  renderBubble = (emotion: string, color: String) => {
    return (
      <View style={styles.moodSpacer}>
        <View style={[styles.emotionBubble, { backgroundColor: color }]}>
          <Text style={styles.moodHeaderText}>{emotion}</Text>
        </View>
      </View>
    );
  };

  // TODO: mapping over emotions array
  render() {
    return (
      <View style={styles.log}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>5/12/2020</Text>
        </View>
        <View style={styles.moodHeaderContainer}>
          <Text style={styles.moodHeaderText}>Mood Descriptions:</Text>
        </View>
        <View style={styles.moodBubbleContainer}>
          <ScrollView horizontal={true}>
            {this.renderBubble(emotions[0], color)}
            {this.renderBubble(emotions[1], color)}
            {this.renderBubble(emotions[2], color)}
          </ScrollView>
        </View>
        <View style={styles.sliderContainer}>
          <View style={styles.bar}>
            <View style={styles.sliderDummy}>
              <LinearGradient
                start={[0, 1]}
                end={[1, 0]}
                colors={["#ff0000", "#ffff00", "#00ff00"]}
                style={styles.linearGradient}
              ></LinearGradient>
            </View>
            <Slider
              style={styles.slider}
              thumbStyle={styles.thumb}
              value={this.value}
              minimumValue={0}
              maximumValue={100}
              onSlidingComplete={(value: number) => {
                console.log(this.perc2color(value), value);
                {
                  this.setState({ sliderValue: value });
                }
              }}
              maximumTrackTintColor="transparent"
              minimumTrackTintColor="transparent"
            />
          </View>
          <View style={styles.textCon}>
            <Text style={styles.sliderText}>terrible</Text>
            <Text style={[styles.sliderText, { alignSelf: "center" }]}>
              okay
            </Text>
            <Text style={styles.sliderText}>great</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.editContainer}
          onPress={() => Alert.alert("Edit button pressed")}
        >
          <AntDesign name="edit" size={24} color="#F9A2A2" />
        </TouchableOpacity>
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
    color: "#F2E9E3",
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
    color: "#F2E9E3",
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
    color: "#F2E9E3",
    fontSize: "14rem",
    fontFamily: "HindSiliguri_600SemiBold",
    textAlign: "center",
  },
  moodSpacer: {
    paddingRight: "8rem",
  },
  textCon: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "transparent",
    paddingHorizontal: "5rem",
    justifyContent: "space-between",
    alignSelf: "flex-end",
    alignItems: "center",
  },
  linearGradient: {
    width: "100%",
    aspectRatio: 50 / 1,
    position: "absolute",
    top: 0,
  },
  sliderDummy: {
    backgroundColor: "blue",
    width: "100%",
    aspectRatio: 50 / 1,
    position: "absolute",
    top: "10rem",
  },
  thumb: {
    width: "14rem",
    height: "14rem",
    borderRadius: "7rem",
    backgroundColor: "#464D77",
    borderColor: "white",
    borderWidth: "1rem",
    position: "absolute",
  },
  bar: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  slider: {
    width: "100%",
    aspectRatio: 50 / 1,
    position: "absolute",
    top: "-6rem",
    borderRadius: 50,
  },
  sliderText: {
    color: "#F2E9E3",
    fontSize: "15rem",
    fontFamily: "HindSiliguri_700Bold",
  },
});
