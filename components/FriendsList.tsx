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
import * as firebase from "firebase";

export default function FriendList() {
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const [streak, setStreak] = React.useState(0);
  const [avatar, setAvatar] = React.useState("");
  const [friendEmail, setfriendEmail] = React.useState("");
  function checkUser(email: any) {
    console.log("checking for: " + email);
    if (validateEmail(email)) {
      firebase
        .auth()
        .fetchSignInMethodsForEmail(email)
        .then((providers) => {
          if (providers.length === 0) {
            Alert.alert("This user does not exist");
          } else {
            Alert.alert("Sending Friend Request to: " + email);
            friendRequest(email);
          }
        });
    } else {
      Alert.alert("This user does not exist");
    }
  }
  function validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  async function friendRequest(email: any) {
    try {
      const res = await firebase
        .firestore()
        .collection("userLookup")
        .doc(email)
        .get();
      let friendUID = res.get("uid");
      const data = {
        accepted: false,
        uid: user?.uid,
        email: user?.email,
      };
      const setUserRequest = await firebase
        .firestore()
        .collection("users")
        .doc(friendUID)
        .collection("requests")
        .doc(user?.uid)
        .set(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View style={styles.addFriend}>
        <TextInput
          style={styles.input}
          placeholder="type friend's email here..."
          placeholderTextColor={COLORS.darkBlueAccent}
          returnKeyType="next"
          onChangeText={(text) => setfriendEmail(text)}
        />
        <TouchableHighlight
          onPress={() => {
            checkUser(friendEmail);
          }}
          underlayColor="transparent"
        >
          <Feather name="plus-circle" size={30} color={COLORS.beige} />
        </TouchableHighlight>
      </View>
      <View style={styles.spacing} />
      <FriendItem />
      <View style={styles.spacing} />
    </KeyboardAvoidingView>
  );
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
  spacing: {
    padding: "10rem",
    backgroundColor: "transparent",
  },
});
