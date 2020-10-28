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
import MoodSlider from "../components/MoodSlider";

import { MaterialIcons } from "@expo/vector-icons";
import EStyleSheet from "react-native-extended-stylesheet";

interface LogModalProps {
  sliderValue: number;
  noteText: string;
}

export default class LogModal extends Component<
  LogModalProps,
  {
    value: string;
    expanded: boolean;
    modalVisible: boolean;
    height: number;
    selected: boolean;
  }
> {
  onChangeText = (text: string) => {
    this.setState({ value: text });
  };

  constructor(props: LogModalProps) {
    super(props);
    this.state = {
      value: this.props.noteText,
      modalVisible: false,
      expanded: false,
      height: 0,
      selected: false,
    };
  }

  openModal() {
    this.setState({ modalVisible: true });
    this.setState({ value: this.props.noteText });
  }

  closeModal() {
    this.setState({ modalVisible: false });
    this.setState({ value: this.props.noteText });
    // TODO pass final sliderValue back to CreateLog on close of modal
  }

  // TODO fix spacing between devices (issue noticed on android)
  renderText() {
    if (this.state.value === "") {
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
          value={this.state.value}
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
        >
          <View style={styles.modalContainer}>
            <ScrollView style={styles.innerContainer}>
              {/* TODO future implementation here for a username input. */}
              <Text style={styles.questionStyle}>
                How are you feeling today?
              </Text>
              <MoodSlider sliderValue={this.props.sliderValue} />
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
                  onChangeChips={(chips: SelectableChips) => console.log(chips)}
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
    backgroundColor: COLORS.darkBlue1,
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
    backgroundColor: COLORS.darkBlue1,
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
