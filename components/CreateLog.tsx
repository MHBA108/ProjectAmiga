import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableHighlight,
  Dimensions,
  Alert,
} from "react-native";
import Slider from "@react-native-community/slider";
import LogModal from "../components/LogModal";

import {
  SliderHuePicker,
  SliderSaturationPicker,
  SliderValuePicker,
} from "react-native-slider-color-picker";

const { width } = Dimensions.get("window");

export default class CreateLog extends Component<
  {},
  {
    value: string;
    expanded: boolean;
    modalVisible: boolean;
    height: number;
    sliderValue: number;
    noteText: string;
  }
> {
  onChangeText = (text: string) => {
    this.setState({ value: text });
  };

  triggerModal = () => this.setState({ modalVisible: true });

  constructor(props: {}) {
    super(props);
    this.state = {
      value: "",
      modalVisible: false,
      expanded: false,
      height: 0,
      sliderValue: 50,
      noteText: "",
    };

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

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
    var h = r * 0x10000 + g * 0x100 + b * 0x1;
    return "#" + ("000000" + h.toString(16)).slice(-6);
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
        <Slider
          style={{
            height: 40,
            marginLeft: 30,
            marginRight: 30,
          }}
          value={50}
          minimumValue={0}
          maximumValue={100}
          trackImage={require("../assets/images/RYG-slider-image.png")}
          thumbTintColor="#F2E9E3"
          onSlidingComplete={(value) => {
            console.log(this.perc2color(value), value);
            {
              this.setState({ sliderValue: value });
            }
          }}
        />
        {/* This is for the slider which is still being worked on, theres two implementations so i'm keeping both until its resolved */}
        {/* <View
          style={{ backgroundColor: "#6699CC", alignItems: 'center' }}
        >
          <SliderHuePicker
            //ref={view => {sliderHuePicker = view;}}
            trackImage={require("../assets/images/RYG-slider-image.png")}
            trackStyle={{ width: width - 96, justifyContent: "center", }}
            thumbStyle={styles.thumb}
            useNativeDriver={true}
            style={{
              height: 40,
              marginLeft: 10,
              marginRight: 10,
            }}
            onColorChange={console.log()}
          />
        </View> */}
        <View style={styles.textCon}>
          <Text style={styles.textStyle}>Poor</Text>
          <Text style={styles.textStyle}>Neutral</Text>
          <Text style={styles.textStyle}>Good</Text>
        </View>
        <TextInput
          placeholder="Write note here ..."
          style={[styles.note, { height: this.state.height }]}
          onChangeText={(text) => this.onChangeText(text)}
          onContentSizeChange={(event) => {
            this.setState({
              height: event.nativeEvent.contentSize.height + 20,
            });
          }}
          value={this.state.value}
          placeholderTextColor="#F2E9E3"
          multiline={true}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View style={styles.buttonStyle}>
            <TouchableHighlight
              underlayColor="none"
              onPress={() => Alert.alert("Save button pressed")}
            >
              <Text style={styles.textStylePurple}>Save thoughts</Text>
            </TouchableHighlight>
          </View>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6699CC",
    margin: 10,
    borderRadius: 20,
    padding: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },

  textCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#6699CC",
    marginLeft: 10,
    marginRight: 10,
  },

  note: {
    height: 40,
    color: "#F2E9E3",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },

  todayStyle: {
    color: "#464D77",
    fontSize: 75,
    fontWeight: "bold",
    fontFamily: "HindSiliguri_700Bold",
    marginLeft: 10,
  },

  textStyle: {
    color: "#F2E9E3",
    backgroundColor: "#6699CC",
    fontSize: 20,
  },

  textStylePurple: {
    color: "#F2E9E3",
    fontSize: 20,
  },

  questionStyle: {
    color: "#F2E9E3",
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
    textAlign: "center",
  },

  modalView: {
    margin: 20,
    marginTop: 40,
    flex: 1,
    backgroundColor: "#6699CC",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  openButton: {
    backgroundColor: "#6699CC",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginLeft: 10,
    marginRight: 10,
  },

  buttonStyle: {
    backgroundColor: "#464D77",
    justifyContent: "center",
    borderRadius: 20,
    padding: 5,
    color: "#F2E9E3",
    fontSize: 20,
  },

  thumb: {
    width: 20,
    height: 20,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: "white",
    shadowRadius: 2,
    shadowOpacity: 0.35,
  },
});
