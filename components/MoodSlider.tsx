import React, { Component } from "react";
import { Text, View } from "react-native";
import Slider from "react-native-slider";
import { LinearGradient } from "expo-linear-gradient";
import EStyleSheet from "react-native-extended-stylesheet";

var valueToColor = require("../assets/ValueToColor");

export default class MoodSlider extends Component<
  { sliderValue?: number; disabled?: Boolean; parentSync?: Function },
  {
    sliderValue: number;
  }
> {
  constructor(props: {
    sliderValue?: number;
    disabled?: Boolean;
    parentSync?: Function;
  }) {
    super(props);
    this.state = {
      sliderValue: props.sliderValue || 50,
    };
  }

  render() {
    return (
      <View style={styles.container}>
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
            value={this.props.sliderValue}
            disabled={this.props.disabled || false}
            minimumValue={0}
            maximumValue={100}
            onSlidingComplete={(value: number) => {
              console.log(valueToColor(value), value);
              {
                this.setState({ sliderValue: value });
                if (typeof this.props.parentSync !== "undefined") {
                  this.props.parentSync(value);
                }
              }
            }}
            maximumTrackTintColor="transparent"
            minimumTrackTintColor="transparent"
          />
        </View>
        <View style={styles.textCon}>
          <View style={styles.textBox}>
            <Text style={styles.sliderText}>terrible</Text>
          </View>
          <View style={styles.textBox}>
            <Text style={styles.sliderText}>okay</Text>
          </View>
          <View style={styles.textBox}>
            <Text style={styles.sliderText}>great</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 7 / 1,
  },
  textCon: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "transparent",
    paddingHorizontal: "5rem",
    justifyContent: "space-between",
    alignSelf: "flex-end",
    textAlign: "center",
  },
  linearGradient: {
    width: "100%",
    aspectRatio: 50 / 1,
    position: "absolute",
    top: 0,
    borderRadius: 3,
    overflow: "hidden",
  },
  sliderDummy: {
    backgroundColor: "transparent",
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
  textBox: {
    height: "100%",
    width: "60rem",
  },
  sliderText: {
    color: "#F2E9E3",
    fontSize: "15rem",
    fontFamily: "HindSiliguri_700Bold",
    textAlign: "center",
  },
});
