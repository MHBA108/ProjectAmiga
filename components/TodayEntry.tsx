import React, { Component } from "react";
import { View, Text, LayoutAnimation, Platform } from "react-native";
import { Log } from "../types";

import SeeMoreModal from "../components/SeeMoreModal";
import MoodSlider from "../components/MoodSlider";
import { COLORS } from "../assets/COLORS";

import EStyleSheet from "react-native-extended-stylesheet";

export default class TodayEntry extends Component<
  Log,
  {
    expanded: boolean;
    modalVisible: boolean;
  }
> {
  triggerModal = () => this.setState({ modalVisible: true });

  constructor(props: Log) {
    super(props);
    this.state = {
      modalVisible: false,
      expanded: false,
    };
  }

  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.questionStyle}>Today's Entry:</Text>
        <View style={styles.sliderContainer}>
          <MoodSlider sliderValue={this.props.moodPercentile} disabled={true} />
        </View>
        <Text style={styles.note} numberOfLines={2}>
          {this.props.text}
        </Text>

        <SeeMoreModal
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
  container: {
    alignItems: "center",
    backgroundColor: COLORS.darkBlue,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 7,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  sliderContainer: {
    width: "100%",
    aspectRatio: 8 / 1,
    backgroundColor: "transparent",
  },
  note: {
    height: "35rem",
    color: COLORS.beige,
    fontSize: "14rem",
    marginVertical: "15rem",
  },
  questionStyle: {
    color: COLORS.beige,
    fontSize: "18rem",
    textAlign: "center",
    fontFamily: "HindSiliguri_600SemiBold",
  },
});
