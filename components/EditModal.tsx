import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import { COLORS } from "../assets/COLORS";
import MoodSlider from "./MoodSlider";
import { Log } from "../types";
import moment from "moment";
import firebase, { firestore } from "firebase";
import { AntDesign, MaterialIcons, Entypo } from "@expo/vector-icons";
import EStyleSheet from "react-native-extended-stylesheet";

import SelectableChips from "react-native-chip/SelectableChips";

const arrayToBubbles = require("../assets/ArrayToBubbles");

interface EditModalProps {
  logItemCallback: Function;
}

export default class EditModal extends Component<
  Log & EditModalProps,
  {
    modalVisible: boolean;
    moodPercentile: number;
    text: string;
    moodWords: string[];
    editable: boolean;
  }
> {
  constructor(props: Log & EditModalProps) {
    super(props);
    this.state = {
      modalVisible: false,
      moodPercentile: this.props.moodPercentile,
      text: this.props.text,
      moodWords: this.props.moodWords,
      editable: false,
    };
  }

  sliderHandler = (sliderValue: number) => {
    this.setState({ moodPercentile: sliderValue });
  };

  //TODO: refresh LogList on delete
  async onDelete() {
    console.log("onDelete in EditModal");
    const docID = moment(this.props.timestamp).format("MM-DD-YYYY");
    const res = await firestore()
      .collection("users")
      .doc(firebase.auth().currentUser?.uid)
      .collection("userLogs")
      .doc(docID)
      .delete();
    const today = new Date(Date.now());
    let date = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    let deletedLogTimestamp = new Date(this.props.timestamp);
    console.log(deletedLogTimestamp);
    if ( deletedLogTimestamp.getFullYear() == year ) {
      if ( deletedLogTimestamp.getMonth() == month ) {
        if ( deletedLogTimestamp.getDate() == date ) {
          const userRef = firestore().collection("users").doc(firebase.auth().currentUser?.uid);
          const stre = await userRef.update({
            streak: firestore.FieldValue.increment(-1),
          });
        }
      }
    }
    this.closeModal();
    this.props.logItemCallback();
  }

  openModal() {
    this.setState({
      modalVisible: true,
      text: this.props.text,
      moodPercentile: this.props.moodPercentile,
      moodWords: this.props.moodWords,
    });
  }

  closeModal() {
    this.setState({ modalVisible: false, editable: false });
  }

  //TODO: refresh LogItem on edit
  async saveLog() {
    console.log("saveLog in EditModal");

    const user = firebase.auth().currentUser;
    const docID = moment(this.props.timestamp).format("MM-DD-YYYY");
    const log: Log = {
      moodPercentile: this.state.moodPercentile,
      text: this.state.text,
      timestamp: this.props.timestamp,
      moodWords: this.state.moodWords,
    };
    if (user) {
      firestore()
        .collection("users")
        .doc(user.uid)
        .collection("userLogs")
        .doc(docID)
        .set(log);
    }
    console.log("the log that was saved in EditModal", log);
    this.props.logItemCallback();
  }

  renderDate() {
    let date = moment(this.props.timestamp);
    let day = date.format("dddd, ").toUpperCase();
    let month = date.format("MMMM ").toUpperCase();
    let dayAndYear = date.format("D YYYY");
    let time = date.format("LT");

    return (
      <View>
        <Text style={styles.dateStyle}>
          {day}
          {month}
          {dayAndYear}
        </Text>
        <Text style={styles.timeStyle}>{time}</Text>
      </View>
    );
  }

  onChangeText = (text: string) => {
    this.setState({ text: text });
  };

  toggleEdit() {
    if (this.state.editable) {
      this.saveLog();
      this.setState({ editable: false });
    } else {
      this.setState({ editable: true });
    }
  }

  renderEditSaveButton() {
    if (this.state.editable) {
      return <MaterialIcons name="save" size={36} color={COLORS.lightBlue} />;
    } else {
      return <AntDesign name="edit" size={36} color={COLORS.lightBlue} />;
    }
  }

  sliderContainer() {
    if (this.state.editable) {
      return styles.editableSliderContainer;
    } else {
      return styles.sliderContainer;
    }
  }

  noteContainer() {
    if (this.state.editable) {
      return styles.editableNoteContainer;
    } else {
      return styles.noteContainer;
    }
  }

  //TODO: allow mood words to be edited
  moodContainer() {
    if (this.state.editable) {
      return styles.editableMoodContainer;
    } else {
      return styles.moodContainer;
    }
  }

  onChangeMoodWords = (moodWords: string[]) => {
    this.setState({ moodWords: moodWords });
  };

  //TODO: allow mood words to be pre-populated
  renderMood() {
    if (this.state.editable) {
      return (
        <View style={this.moodContainer()}>
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
            chipStyleSelected={styles.chipSelectedStyle}
            chipStyle={styles.chipStyle}
            valueStyle={styles.valueStyle}
            valueStyleSelected={styles.valueStyle}
          />
        </View>
      );
    } else {
      return (
        <View style={this.moodContainer()}>
          {arrayToBubbles(this.state.moodWords, this.state.moodPercentile)}
        </View>
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
        >
          <View style={styles.modalContainer}>
            <ScrollView style={styles.innerContainer}>
              {this.renderDate()}
              <Text style={styles.questionStyle}>On this day you felt:</Text>
              <View style={this.sliderContainer()}>
                <MoodSlider
                  sliderValue={this.props.moodPercentile}
                  parentSync={this.sliderHandler}
                  disabled={!this.state.editable}
                />
              </View>
              <View style={styles.spacer} />
              <Text style={styles.questionStyle}>Journal Entry:</Text>
              <View style={this.noteContainer()}>
                <TextInput
                  style={styles.note}
                  value={this.state.text}
                  onChangeText={(text) => this.onChangeText(text)}
                  multiline={true}
                  editable={this.state.editable}
                ></TextInput>
              </View>
              <View style={styles.spacer} />
              <Text style={styles.questionStyle}>Mood Descriptions:</Text>
              <View style={this.moodContainer()}>{this.renderMood()}</View>
            </ScrollView>
            <View style={styles.buttons}>
              <TouchableHighlight
                onPress={() => this.closeModal()}
                underlayColor="none"
              >
                <AntDesign name="back" size={36} color={COLORS.lightBlue} />
              </TouchableHighlight>
              <View style={styles.bottomRight}>
                <TouchableHighlight
                  onPress={() => this.toggleEdit()}
                  underlayColor="none"
                >
                  {this.renderEditSaveButton()}
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => this.onDelete()}
                  underlayColor="none"
                >
                  <MaterialIcons
                    name="delete"
                    size={36}
                    color={COLORS.lightBlue}
                  />
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
        <View>
          <TouchableOpacity
            style={styles.editContainer}
            onPress={() => this.openModal()}
          >
            <Entypo name="open-book" size={24} color={COLORS.pink} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
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
  sliderContainer: {
    backgroundColor: COLORS.darkBlueAccent,
    width: "100%",
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    padding: "10rem",
  },
  editableSliderContainer: {
    backgroundColor: COLORS.darkBlueAccent2,
    width: "100%",
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    padding: "10rem",
  },
  noteContainer: {
    backgroundColor: COLORS.darkBlueAccent,
    width: "100%",
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    paddingTop: "5rem",
    paddingBottom: "10rem",
    paddingHorizontal: "10rem",
  },
  editableNoteContainer: {
    backgroundColor: COLORS.darkBlueAccent2,
    width: "100%",
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    paddingTop: "5rem",
    paddingBottom: "10rem",
    paddingHorizontal: "10rem",
  },
  note: {
    color: COLORS.beige,
    fontSize: "14rem",
  },
  questionStyle: {
    color: COLORS.beige,
    fontSize: "20rem",
    textAlign: "center",
    fontFamily: "HindSiliguri_600SemiBold",
  },
  dateStyle: {
    color: COLORS.beige,
    fontSize: "18rem",
    fontFamily: "HindSiliguri_400Regular",
  },
  timeStyle: {
    color: COLORS.beige,
    fontSize: "14rem",
    fontFamily: "HindSiliguri_400Regular",
  },
  buttonText: {
    color: COLORS.beige,
    fontSize: "15rem",
    textAlign: "center",
    fontFamily: "HindSiliguri_600SemiBold",
  },
  moodContainer: {
    backgroundColor: COLORS.darkBlueAccent,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    borderRadius: 10,
    padding: "5rem",
  },
  editableMoodContainer: {
    backgroundColor: COLORS.darkBlueAccent2,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    borderRadius: 10,
    padding: "5rem",
  },
  saveButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10rem",
  },
  spacer: {
    width: "100%",
    padding: "10rem",
  },
  buttonStyle: {
    backgroundColor: COLORS.darkBlueAccent,
    width: "15%",
    aspectRatio: 3 / 1.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.darkBlue,
  },
  bottomRight: {
    flexDirection: "row",
  },
  countText: {
    color: COLORS.beige,
    fontFamily: "HindSiliguri_600SemiBold",
    fontSize: "20rem",
  },
  editContainer: {
    position: "absolute",
    top: "-128rem",
    right: "-165rem",
    backgroundColor: "#555E90",
    borderRadius: 10,
    padding: "5rem",
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
