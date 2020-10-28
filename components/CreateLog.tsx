import React, { Component, useState } from "react";
import {
  View,
  Text,
  TextInput,
  LayoutAnimation,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";

import LogModal from "../components/LogModal";
import MoodSlider from "../components/MoodSlider";
import { COLORS } from "../assets/COLORS";

import { MaterialIcons } from "@expo/vector-icons";
import EStyleSheet from "react-native-extended-stylesheet";

interface CreateLogProps {
  sliderValue: number;
  noteText: string;
}

export default class CreateLog extends Component<
  CreateLogProps,
  {
    value: string;
    expanded: boolean;
    modalVisible: boolean;
    height: number;
    sliderValue: number;
  }
> {
  onChangeText = (text: string) => {
    this.setState({ value: text });
  };

  triggerModal = () => this.setState({ modalVisible: true });

  constructor(props: CreateLogProps) {
    super(props);
    this.state = {
      value: "",
      modalVisible: false,
      expanded: false,
      height: 0,
      sliderValue: 50,
    };
  }

  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.questionStyle}>How are you feeling today?</Text>
        <View style={styles.sliderContainer}>
          {/*TODO update this.state.sliderValue based on slider changes*/}
          <MoodSlider />
        </View>
        <TextInput
          placeholder="Tap here to write your entry..."
          style={[styles.note, { height: this.state.height }]}
          onChangeText={(text) => this.onChangeText(text)}
          onContentSizeChange={(event) => {
            this.setState({
              height: event.nativeEvent.contentSize.height + 20,
            });
          }}
          value={this.state.value}
          placeholderTextColor={COLORS.beige}
          multiline={true}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => Alert.alert("Save button pressed")}
          >
            <MaterialIcons name="save" size={24} color={COLORS.beige} />
            <Text style={styles.buttonText}> Save entry</Text>
          </TouchableOpacity>
          <View style={styles.buttonStyle}>
            <LogModal
              sliderValue={this.state.sliderValue}
              noteText={this.state.value}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: COLORS.darkBlue,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
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
    height: 40,
    color: COLORS.beige,
    fontSize: "18rem",
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  buttonText: {
    color: COLORS.beige,
    fontSize: "14rem",
    fontFamily: "HindSiliguri_600SemiBold",
  },
  questionStyle: {
    color: COLORS.beige,
    fontSize: "18rem",
    textAlign: "center",
    fontFamily: "HindSiliguri_600SemiBold",
  },
  buttonStyle: {
    backgroundColor: COLORS.darkBlue1,
    width: "40%",
    aspectRatio: 4 / 1.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
