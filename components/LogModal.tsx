import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import Slider from "react-native-slider";
import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";
import SelectableChips from "react-native-chip/SelectableChips";
import { COLORS } from "../assets/COLORS";
import firebase, { firestore } from "firebase";
import moment, { Moment } from "moment";
import { Log } from "../types";

import { MaterialIcons } from "@expo/vector-icons";
import { ModalSlideFromBottomIOS } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets";

interface LogModalProps {
  sliderValue: number;
  noteText: string;
}

export default class LogModal extends Component<
  LogModalProps,
  {
    moodPercentile: number;
    text: string;
    timestamp: string;
    moodWords: string[];
    expanded: boolean;
    modalVisible: boolean;
    height: number;
    selected: boolean;
    user: firebase.User | null;
  }
> {
  constructor(props: LogModalProps) {
    super(props);
    this.state = {
      moodPercentile: this.props.sliderValue,
      text: props.noteText,
      timestamp: moment().format(),
      moodWords: [],
      modalVisible: false,
      expanded: false,
      height: 0,
      selected: false,
      user: firebase.auth().currentUser,
    };
  }

  onChangeMoodPercentile = (perc: number) => {
    console.log(this.perc2color(perc));
    this.setState({ moodPercentile: perc });
  };

  onChangeText = (text: string) => {
    this.setState({ text: text });
  };

  onChangeMoodWords = (moodWords: string[]) => {
    console.log(moodWords);
    this.setState({ moodWords: moodWords });
  };

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

  openModal() {
    this.setState({ modalVisible: true });
    this.setState({ text: this.props.noteText });
    this.setState({ moodPercentile: this.props.sliderValue });
  }

  async closeModal() {
    this.setState({ modalVisible: false });
    this.setState({ text: this.props.noteText });
    const date = moment().format("MM-DD-YYYY");
    console.log(date);
    const log: Log = {
      moodPercentile: this.state.moodPercentile,
      text: this.state.text,
      timestamp: this.state.timestamp,
      moodWords: this.state.moodWords,
    };
    if (this.state.user) {
      firestore()
        .collection("users")
        .doc(this.state.user.uid)
        .collection("userLogs")
        .doc(date)
        .set(log);
      const userRef = firestore().collection("users").doc(this.state.user.uid);
      const res = await userRef.update({
        streak: firestore.FieldValue.increment(1),
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          hasBackdrop={true}
          isVisible={this.state.modalVisible}
          backdropColor={COLORS.darkBlue}
          backdropOpacity={0.5}
          animationIn="zoomInDown"
          animationOut="zoomOutDown"
          animationInTiming={300}
          animationOutTiming={300}
          backdropTransitionInTiming={300}
          backdropTransitionOutTiming={300}
        >
          <View style={styles.modalContainer}>
            <ScrollView style={styles.innerContainer}>
              {/* TODO future implementation here for a username input. */}
              <Text style={styles.questionStyle}>
                How are you feeling today?
              </Text>
              <View style={{ borderRadius: 50, overflow: "hidden" }}>
                <View
                  style={{
                    flexDirection: "row",
                    position: "absolute",
                  }}
                >
                  <View style={styles.sliderDummy}>
                    <LinearGradient
                      start={[0, 1]}
                      end={[1, 0]}
                      colors={["#ff0000", "#ffff00", "#00ff00"]}
                      style={styles.linearGradient}
                    ></LinearGradient>
                  </View>
                </View>
                <Slider
                  style={{ height: 20, borderRadius: 50 }}
                  thumbStyle={styles.thumb}
                  value={this.state.moodPercentile}
                  minimumValue={0}
                  maximumValue={100}
                  onSlidingComplete={(value: number) =>
                    this.onChangeMoodPercentile(value)
                  }
                  maximumTrackTintColor="transparent"
                  minimumTrackTintColor="transparent"
                />
              </View>
              <View style={styles.textCon}>
                <Text style={styles.textStyle}>Terrible</Text>
                <Text style={styles.textStyle}>Okay</Text>
                <Text style={styles.textStyle}>Great</Text>
              </View>
              <TextInput
                // placeholder="Write note here ..."
                style={[styles.note, { height: this.state.height }]}
                defaultValue={this.props.noteText}
                value={this.state.text}
                onChangeText={(text) => this.onChangeText(text)}
                onContentSizeChange={(event) => {
                  this.setState({
                    height: event.nativeEvent.contentSize.height + 20,
                  });
                }}
                placeholderTextColor={COLORS.beige}
                multiline={true}
              />
              <Text
                style={[
                  styles.textStyle,
                  { textAlign: "center", marginTop: 20 },
                ]}
              >
                Mood Descriptions:
              </Text>
              <View style={styles.moodContainer}>
                <SelectableChips
                  initialChips={[
                    "excited",
                    "positive",
                    "energetic",
                    "happy",
                    "stressed",
                    "cheerful",
                    "content",
                    "okay",
                    "calm",
                    "rested",
                    "bored",
                    "lonely",
                    "sad",
                    "grumpy",
                    "negative",
                    "mad",
                  ]}
                  onChangeChips={(chips: SelectableChips) =>
                    this.onChangeMoodWords(chips)
                  }
                  alertRequired={false}
                  chipStyleSelected={styles.chipSelectedStyle}
                  chipStyle={styles.chipStyle}
                  valueStyle={styles.valueStyle}
                  valueStyleSelected={styles.valueStyle}
                />
              </View>
              <View style={styles.saveButton}>
                <TouchableHighlight
                  onPress={() => this.closeModal()}
                  underlayColor="none"
                >
                  <Text style={styles.saveTextStyle}>Save Entry</Text>
                </TouchableHighlight>
              </View>
            </ScrollView>
          </View>
        </Modal>
        <View>
          <TouchableHighlight
            onPress={() => this.openModal()}
            underlayColor="none"
          >
            <View
              style={{
                flex: 2,
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "stretch",
                alignSelf: "stretch",
              }}
            >
              <View style={styles.buttonStyle}>
                <MaterialIcons
                  name="add-circle"
                  size={24}
                  color={COLORS.beige}
                />
              </View>
              <Text style={styles.buttonStyle}>Add more</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    margin: -10,
    marginTop: 50,
    flex: 1,
    backgroundColor: COLORS.darkBlue,
    borderRadius: 20,
    padding: 10,
    shadowColor: COLORS.darkBlue,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 7,
    elevation: 5,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    //borderRadius: 5,
    marginTop: 6,
    marginVertical: 16,
  },
  sliderDummy: {
    backgroundColor: "transparent",
    width: 400,
    height: 30,
    borderRadius: 50,
    position: "absolute",
  },
  thumb: {
    width: 16,
    height: 16,
    borderRadius: 15,
    backgroundColor: COLORS.darkBlue,
    borderColor: "white",
    borderWidth: 1,
  },
  innerContainer: {
    marginTop: 10,
  },
  textCon: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.darkBlue,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonStyle: {
    justifyContent: "center",
    borderRadius: 20,
    padding: 5,
    color: COLORS.beige,
    fontSize: 20,
  },
  note: {
    height: 40,
    color: COLORS.beige,
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
    backgroundColor: "#4F5D85",
    borderRadius: 20,
  },
  textStyle: {
    color: COLORS.beige,
    backgroundColor: COLORS.darkBlue,
    fontSize: 16,
  },
  saveTextStyle: {
    color: COLORS.darkBlue,
    fontSize: 20,
    borderRadius: 10,
    padding: 10,
  },
  questionStyle: {
    marginBottom: 10,
    color: COLORS.beige,
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
    textAlign: "center",
  },
  moodContainer: {
    backgroundColor: "#4F5D85",
    borderRadius: 20,
  },
  saveButton: {
    backgroundColor: COLORS.pink,
    borderRadius: 20,
    padding: 5,
    marginTop: 10,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
  },
  chipSelectedStyle: {
    backgroundColor: COLORS.pink,
    borderColor: COLORS.pink,
  },
  valueStyle: {
    color: COLORS.darkBlue,
  },
  chipStyle: {
    backgroundColor: COLORS.lightBlue,
    borderColor: COLORS.lightBlue,
  },
});
