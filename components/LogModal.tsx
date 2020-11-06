import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import SelectableChips from "react-native-chip/SelectableChips";
import { COLORS } from "../assets/COLORS";
import firebase, { firestore } from "firebase";
import moment from "moment";
import { Log } from "../types";
import MoodSlider from "../components/MoodSlider";

import { MaterialIcons } from "@expo/vector-icons";
import EStyleSheet from "react-native-extended-stylesheet";

interface LogModalProps {
  sliderValue: number;
  noteText: string;
  onModalHide: () => void;
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

  sliderHandler = (sliderValue: number) => {
    this.setState({ moodPercentile: sliderValue });
  };

  onChangeMoodPercentile = (perc: number) => {
    this.setState({ moodPercentile: perc });
  };

  onChangeText = (text: string) => {
    this.setState({ text: text });
  };

  onChangeMoodWords = (moodWords: string[]) => {
    this.setState({ moodWords: moodWords });
  };

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

  renderText() {
    if (this.state.text === "") {
      return (
        <TextInput
          placeholder="Tap here to write your entry..."
          style={[styles.note, { height: this.state.height }]}
          onChangeText={(text) => this.onChangeText(text)}
          onContentSizeChange={(event) => {
            this.setState({
              height: event.nativeEvent.contentSize.height + 20,
            });
          }}
          placeholderTextColor={COLORS.beige}
          multiline={true}
        />
      );
    } else {
      return (
        <TextInput
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
      );
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
          onModalHide={this.props.onModalHide}
        >
          <View style={styles.modalContainer}>
            <ScrollView style={styles.innerContainer}>
              <Text style={styles.questionStyle}>
                How are you feeling today?
              </Text>
              <MoodSlider
                sliderValue={this.state.moodPercentile}
                parentSync={this.sliderHandler}
              />
              {this.renderText()}
              <View style={styles.spacer} />
              <Text style={styles.questionStyle}>Mood Descriptions:</Text>
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
                  <MaterialIcons
                    name="save"
                    size={24}
                    color={COLORS.darkBlue}
                  />
                </TouchableHighlight>
              </View>
            </ScrollView>
          </View>
        </Modal>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.openModal()}
          >
            <MaterialIcons name="add-circle" size={24} color={COLORS.beige} />
            <Text style={styles.buttonText}> Add more</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
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
  innerContainer: {
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.beige,
    fontSize: "14rem",
    fontFamily: "HindSiliguri_600SemiBold",
  },
  note: {
    height: "40rem",
    color: COLORS.beige,
    fontSize: "18rem",
    paddingHorizontal: "10rem",
    paddingTop: "10rem",
    backgroundColor: COLORS.darkBlueAccent,
    borderRadius: 15,
    marginTop: "20rem",
  },
  textStyle: {
    color: COLORS.beige,
    backgroundColor: COLORS.darkBlue,
    fontSize: "14rem",
    textAlign: "center",
    paddingTop: "20rem",
    paddingBottom: "5rem",
    fontFamily: "HindSiliguri_600SemiBold",
  },
  questionStyle: {
    marginBottom: 10,
    color: COLORS.beige,
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
    textAlign: "center",
    fontFamily: "HindSiliguri_600SemiBold",
  },
  moodContainer: {
    backgroundColor: COLORS.darkBlueAccent,
    borderRadius: 20,
  },
  saveButton: {
    backgroundColor: COLORS.pink,
    width: "25%",
    aspectRatio: 2 / 1,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
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
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  spacer: {
    width: "100%",
    padding: "10rem",
  },
});
