import { MaterialIcons } from "@expo/vector-icons";
import React, { Component } from "react";
import {
  Alert,
  LayoutAnimation,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../assets/COLORS";
import LogModal from "../components/LogModal";
import moment from "moment";
import firebase, { firestore } from "firebase";
import { Log } from "../types";
import NotificationModal from "../components/NotificationModal";
import EStyleSheet from "react-native-extended-stylesheet";
import MoodSlider from "./MoodSlider";

interface CreateLogProps {
  sliderValue: number;
  noteText: string;
  homeCallback: Function;
}

export default class CreateLog extends React.Component<
  CreateLogProps,
  {
    value: string;
    expanded: boolean;
    height: number;
    sliderValue: number;
    user: firebase.User | null;
    timestamp: string;
    notificationVisible: boolean;
  }
> {
  onChangeText = (text: string) => {
    this.setState({ value: text });
  };
  onChangeMoodPercentile = (sliderValue: number) => {
    this.setState({ sliderValue });
  };
  callbackLogModal = (sliderValue: number, text: string) => {
    this.onChangeText(text);
    this.onChangeMoodPercentile(sliderValue);
    this.onSave();
  };

  async onSave() {
    const date = moment().format("MM-DD-YYYY");
    console.log(date);
    const log: Log = {
      moodPercentile: this.state.sliderValue,
      text: this.state.value,
      timestamp: this.state.timestamp,
      moodWords: [],
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
    const initialQuery = await firestore()
      .collection("users")
      .doc(this.state.user?.uid)
      .collection("userLogs")
      .orderBy("timestamp", "desc");
    let documentSnapshots = await initialQuery.get();
    let documentData = documentSnapshots.docs.map((document) =>
      document.data()
    );
    console.log("retrieve data length in create log ");
    console.log("The log that being saved: ", log);
    //homeCallback is called when the save button is pressed
    this.props.homeCallback();
  }

  notification() {
    this.setState({ notificationVisible: true });
  }

  dismissNotif() {
    this.setState({ notificationVisible: false });
  }

  constructor(props: CreateLogProps) {
    super(props);
    this.state = {
      value: "",
      expanded: false,
      height: 0,
      sliderValue: 50,
      user: firebase.auth().currentUser,
      timestamp: moment().format(),
      notificationVisible: false,
    };
  }

  sliderHandler = (sliderValue: number) => {
    this.setState({ sliderValue: sliderValue });
  };

  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.questionStyle}>How are you feeling today?</Text>
        <View style={styles.sliderContainer}>
          <MoodSlider parentSync={this.sliderHandler} />
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
            onPress={() => {
              this.onSave();
            }}
          >
            <MaterialIcons name="save" size={24} color={COLORS.beige} />
            <Text style={styles.buttonText}> Save entry</Text>
          </TouchableOpacity>

          <View style={styles.buttonStyle}>
            <LogModal
              sliderValue={this.state.sliderValue}
              noteText={this.state.value}
              onModalHide={() => this.notification()}
              parentCallback={this.callbackLogModal}
            />
          </View>
        </View>
        <NotificationModal
          modalVisible={this.state.notificationVisible}
          onModalHide={() => this.dismissNotif()}
        />
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
    backgroundColor: COLORS.darkBlueAccent,
    width: "40%",
    aspectRatio: 4 / 1.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
