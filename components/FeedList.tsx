import React, { Component } from "react";
import {
  Text,
  View,
  Alert,
  TextInput,
  TouchableHighlight,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import FeedItem from "./FeedItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "../assets/COLORS";
import { Feather } from "@expo/vector-icons";

export default class FeedList extends Component {
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.spacing} />
        <FeedItem />
        <View style={styles.spacing} />
        <FeedItem />
        <View style={styles.spacing} />
        <FeedItem />
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
    paddingHorizontal: "20rem",
    marginRight: "2rem",
  },
  buttonText: {
    color: COLORS.darkBlue,
    fontSize: "30rem",
    fontFamily: "HindSiliguri_600SemiBold",
  },
  friendButton: {
    width: "100%",
    aspectRatio: 10 / 2,
    backgroundColor: COLORS.pink,
    borderRadius: 10,
    flexDirection: "column",
    padding: "5rem",
    justifyContent: "space-around",
  },
  spacing: {
    padding: "5rem",
    backgroundColor: "transparent",
  },
});
