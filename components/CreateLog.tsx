import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import {
  Alert,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import Slider from "react-native-slider";
import { COLORS } from "../assets/COLORS";
import LogModal from "../components/LogModal";
import moment, { Moment } from "moment";
import firebase, { firestore } from "firebase";
import { Log } from "../types";

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
    user: firebase.User | null;
    timestamp: string;
  }
> {
  onChangeText = (text: string) => {
    this.setState({ value: text });
  };

  onChangeMoodPercentile = (sliderValue: number) => {
    this.setState({ sliderValue });
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
    Alert.alert("Log saved!");
  }

  triggerModal = () => this.setState({ modalVisible: true });

  constructor(props: CreateLogProps) {
    super(props);
    this.state = {
      value: "",
      modalVisible: false,
      expanded: false,
      height: 0,
      sliderValue: 50,
      user: firebase.auth().currentUser,
      timestamp: moment().format(),
    };
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
            value={50}
            minimumValue={0}
            maximumValue={100}
            onSlidingComplete={(value: number) => {
              console.log(this.perc2color(value), value);
              {
                this.onChangeMoodPercentile(value);
              }
            }}
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
          placeholder="Write note here ..."
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
          <View style={styles.buttonStyle}>
            <TouchableHighlight
              underlayColor="none"
              onPress={() => this.onSave()}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "stretch",
                  alignSelf: "stretch",
                }}
              >
                <MaterialIcons name="save" size={24} color={COLORS.beige} />
                <Text style={styles.textStylePurple}> Save entry</Text>
              </View>
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
    backgroundColor: COLORS.darkBlue,
    borderRadius: 10,
    padding: 10,
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
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 6,
    marginVertical: 16,
  },
  sliderDummy: {
    backgroundColor: "transparent",
    width: 400,
    height: 30,
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
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.darkBlue,
    marginLeft: 10,
    marginRight: 10,
  },
  note: {
    height: 40,
    color: COLORS.beige,
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  todayStyle: {
    color: COLORS.darkBlue,
    fontSize: 75,
    fontWeight: "bold",
    fontFamily: "HindSiliguri_700Bold",
    marginLeft: 10,
  },
  textStyle: {
    color: COLORS.beige,
    fontSize: 16,
  },
  textStylePurple: {
    color: COLORS.beige,
    fontSize: 20,
  },
  questionStyle: {
    marginBottom: 10,
    color: COLORS.beige,
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
    textAlign: "center",
  },
  modalView: {
    margin: 20,
    marginTop: 40,
    flex: 1,
    backgroundColor: COLORS.lightBlue,
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
    backgroundColor: COLORS.lightBlue,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonStyle: {
    backgroundColor: COLORS.lightBlue,
    justifyContent: "center",
    borderRadius: 20,
    padding: 5,
    color: COLORS.beige,
    fontSize: 20,
  },
});
