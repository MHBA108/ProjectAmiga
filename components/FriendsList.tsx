import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableHighlight,
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import FriendItem from "./FriendItem";
import { COLORS } from "../assets/COLORS";
import { Feather } from "@expo/vector-icons";

export default class FriendList extends Component {
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.spacing} />
        <FriendItem />
        <View style={styles.spacing} />

        <View style={styles.addFriend}>
          <TextInput
            style={styles.input}
            placeholder="type friend's email here..."
            placeholderTextColor={COLORS.darkBlueAccent}
            returnKeyType="next"
            textContentType="emailAddress"
          />
          <TouchableHighlight
            onPress={() => Alert.alert("friend added")}
            underlayColor="transparent"
          >
            <Feather name="plus-circle" size={30} color={COLORS.beige} />
          </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = EStyleSheet.create({
  addFriend: {
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  input: {
    fontSize: "20rem",
    backgroundColor: COLORS.pink,
    borderRadius: 10,
    fontFamily: "HindSiliguri_500Medium",
    color: COLORS.darkBlue,
    height: "50rem",
    width: "310rem",
  },
  spacing: {
    padding: "10rem",
    backgroundColor: "transparent",
  },
});
