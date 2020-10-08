import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  ScrollView,
  Modal,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import Slider from "@react-native-community/slider";
import SelectableChips from "react-native-chip/SelectableChips";

import {
  SliderHuePicker,
  SliderSaturationPicker,
  SliderValuePicker,
} from "react-native-slider-color-picker";

const { width } = Dimensions.get("window");

export default class LogModal extends Component<
  { sliderValue: any; noteText: any },
  {
    value: any;
    expanded: boolean;
    modalVisible: boolean;
    height: any;
    selected: boolean;
  }
> {
  onChangeText = (text: any) => {
    this.setState({ value: text });
  };

  constructor(props: any) {
    super(props);
    this.state = {
      value: undefined,
      modalVisible: false,
      expanded: false,
      height: 0,
      selected: false,
    };
  }

  perc2color(perc: any) {
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
          visible={this.state.modalVisible}
          animationType={"slide"}
          onRequestClose={() => this.closeModal()}
        >
          <View style={styles.modalContainer}>
            <ScrollView style={styles.innerContainer}>
              <Text style={styles.questionStyle}>
                How are you feeling today, Alex?
              </Text>
              <Slider
                style={{
                  height: 40,
                  margin: 20,
                  marginBottom: 10,
                }}
                value={this.props.sliderValue}
                minimumValue={0}
                maximumValue={100}
                trackImage={require("../assets/images/RYG-slider-image.png")}
                thumbTintColor="#F2E9E3"
                onSlidingComplete={(value) =>
                  console.log(this.perc2color(value))
                }
              />
              {/* <View
                style={{ backgroundColor: "#464D77", alignItems: "center" }}
              >
                <SliderHuePicker
                  //ref={view => {sliderHuePicker = view;}}

                  trackImage={require("../assets/images/RYG-slider-image.png")}
                  trackStyle={{ width: width - 108, justifyContent: "center" }}
                  thumbStyle={styles.thumb}
                  useNativeDriver={true}
                  style={{
                    height: 40,
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                />
              </View> */}
              <View style={styles.textCon}>
                <Text style={styles.textStyle}>Poor</Text>
                <Text style={styles.textStyle}>Neutral</Text>
                <Text style={styles.textStyle}>Good</Text>
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
                    "positive",
                    "excited",
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
                  onChangeChips={(chips) => console.log(chips)}
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
            <Text style={styles.buttonStyle}>Add more thoughts</Text>
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
    margin: 20,
    marginTop: 50,
    flex: 1,
    backgroundColor: "#464D77",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  innerContainer: {
    // marginTop: 50,
  },

  textCon: {
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
    fontSize: 20,
  },

  saveTextStyle: {
    color: "#464D77",
    fontSize: 20,
    borderRadius: 10,
    padding: 10,
  },

  questionStyle: {
    color: "#F2E9E3",
    fontSize: 30,
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
  thumb: {
    width: 20,
    height: 20,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 2
    },
    backgroundColor: "white",
    shadowRadius: 2,
    shadowOpacity: 0.35,
  },
});
