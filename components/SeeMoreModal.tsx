import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import { COLORS } from "../assets/COLORS";
import MoodSlider from "../components/MoodSlider";
import { Log } from "../types";
import moment from "moment";
import * as firebase from "firebase";

import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import EStyleSheet from "react-native-extended-stylesheet";

var arrayToBubbles = require("../assets/ArrayToBubbles");

export default class SeeMoreModal extends Component<
  Log,
  {
    text: string;
    expanded: boolean;
    modalVisible: boolean;
    height: number;
    selected: boolean;
    streak: number;
  }
> {
  constructor(props: Log) {
    super(props);
    this.state = {
      text: this.props.text,
      modalVisible: false,
      expanded: false,
      height: 0,
      selected: false,
      streak: 0,
    };
  }

  // TODO: delete log from firebase, make sure homescreen refreshes (goes back to having createLog instead of TodayEntry)
  onDelete() {
    Alert.alert("Delete button pressed");
    this.closeModal();
  }

  openModal() {
    this.setState({ modalVisible: true });
    this.setState({ text: this.props.text });
  }

  closeModal() {
    this.setState({ modalVisible: false });
    this.setState({ text: this.props.text });
  }

  async componentDidMount() {
    const user = firebase.auth().currentUser;
    const doc = await firebase
      .firestore()
      .collection("users")
      .doc(user?.uid)
      .get();
    this.setState({ streak: doc.get("streak") });
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

  renderStreak() {
    let count = this.state.streak;
    return (
      <View style={styles.streakBox}>
        <Text style={styles.countText}>{count}</Text>
        <Image
          source={require("../assets/images/streak.png")}
          style={styles.badge}
        />
      </View>
    );
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
              {this.renderStreak()}
              {this.renderDate()}
              <Text style={styles.questionStyle}>On this day you felt:</Text>
              <View style={styles.sliderContainer}>
                <MoodSlider sliderValue={this.props.moodPercentile} />
              </View>

              <View style={styles.spacer} />
              <Text style={styles.questionStyle}>Journal Entry:</Text>
              <View style={styles.noteContainer}>
                <Text style={styles.note}>{this.props.text}</Text>
              </View>
              <View style={styles.spacer} />
              <Text style={styles.questionStyle}>Mood Descriptions:</Text>
              <View style={styles.moodContainer}>
                {arrayToBubbles(
                  this.props.moodWords,
                  this.props.moodPercentile
                )}
              </View>
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
                  onPress={() => Alert.alert("TODO: Edit button pressed")}
                  underlayColor="none"
                >
                  <AntDesign name="edit" size={36} color={COLORS.lightBlue} />
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
            style={styles.buttonStyle}
            onPress={() => this.openModal()}
          >
            <AntDesign name="ellipsis1" size={16} color={COLORS.beige} />
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
  noteContainer: {
    backgroundColor: COLORS.darkBlueAccent,
    width: "100%",
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    padding: "10rem",
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
  streakBox: {
    position: "absolute",
    right: 0,
    top: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  badge: {
    width: "40rem",
    height: "40rem",
  },
  countText: {
    color: COLORS.beige,
    fontFamily: "HindSiliguri_600SemiBold",
    fontSize: "20rem",
  },
});
