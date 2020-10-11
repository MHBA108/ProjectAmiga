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

import { MaterialIcons } from "@expo/vector-icons";

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
      value: "",
      modalVisible: false,
      expanded: false,
      height: 0,
      selected: false,
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

  openModal() {
    this.setState({ modalVisible: true });
    this.setState({ value: this.props.noteText });
  }

  closeModal() {
    this.setState({ modalVisible: false });
    this.setState({ value: this.props.noteText });
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          hasBackdrop={true}
          isVisible={this.state.modalVisible}
          backdropColor="#464D77"
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
              //TO-DO future implementation here for a username input.
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
                  value={this.props.sliderValue}
                  minimumValue={0}
                  maximumValue={100}
                  onSlidingComplete={(value: number) =>
                    console.log(this.perc2color(value))
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
                value={this.state.value}
                onChangeText={(text) => this.onChangeText(text)}
                onContentSizeChange={(event) => {
                  this.setState({
                    height: event.nativeEvent.contentSize.height + 20,
                  });
                }}
                placeholderTextColor="#F2E9E3"
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
                  onChangeChips={(chips: SelectableChips) => console.log(chips)}
                  alertRequired={false}
                  chipStyleSelected={styles.chipSelectedStyle}
                  chipStyle={styles.chipStyle}
                  valueStyle={styles.valueStyle}
                  valueStyleSelected={styles.valueStyle}
                />
                {/* <List.Section>
                  <View style={styles.row}>
                    <Chip selected={} onPress={() => {}} style={styles.chip}>
                      <Text style={{color: "#4F5D85"}}>Simple</Text>
                    </Chip>
                    <Chip selectedColor='#F9A2A2' onPress={() => {}} style={styles.chip}>
                      Close button
                    </Chip>
                    <Chip onPress={() => {}} style={styles.chip}>
                      Icon
                    </Chip>
                    <Chip onPress={() => {}} style={styles.chip}>
                      Avatar
                    </Chip>
                    <Chip onPress={() => {}} style={styles.chip}>
                      Avatar (selected)
                    </Chip>
                    <Chip onPress={() => {}} style={styles.chip}>
                      Icon (disabled)
                    </Chip>
                    <Chip onPress={() => {}} style={styles.chip}>
                      Avatar (disabled)
                    </Chip>
                  </View>
                </List.Section> */}
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
                <MaterialIcons name="add-circle" size={24} color="#F2E9E3" />
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
    backgroundColor: "#464D77",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#464D77",
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
    backgroundColor: "#464D77",
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
    backgroundColor: "#464D77",
    marginLeft: 10,
    marginRight: 10,
  },
  buttonStyle: {
    justifyContent: "center",
    borderRadius: 20,
    padding: 5,
    color: "#F2E9E3",
    fontSize: 20,
  },
  note: {
    height: 40,
    color: "#F2E9E3",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
    backgroundColor: "#4F5D85",
    borderRadius: 20,
  },
  textStyle: {
    color: "#F2E9E3",
    backgroundColor: "#464D77",
    fontSize: 16,
  },
  saveTextStyle: {
    color: "#464D77",
    fontSize: 20,
    borderRadius: 10,
    padding: 10,
  },
  questionStyle: {
    marginBottom: 10,
    color: "#F2E9E3",
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
    backgroundColor: "#F9A2A2",
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
    backgroundColor: "#F9A2A2",
    borderColor: "#F9A2A2",
  },
  valueStyle: {
    color: "#464D77",
  },
  chipStyle: {
    backgroundColor: "#6699CC",
    borderColor: "#6699CC",
  },
});
