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
  FlatList,
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import FriendItem from "./FriendItem";
import { COLORS } from "../assets/COLORS";
import { Feather } from "@expo/vector-icons";
import * as firebase from "firebase";
import { useFocusEffect } from "@react-navigation/native";
import { firestore } from "firebase";

export default function FriendList() {
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const [streak, setStreak] = React.useState(0);
  const [avatar, setAvatar] = React.useState("");
  const [friendEmail, setfriendEmail] = React.useState("");
  const [friendData, setFriendData] = React.useState<firestore.DocumentData[]>(
    []
  );

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
            Alert.alert("Now following: " + email);
            friendFollow();
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
  async function friendFollow() {
    try {
      console.log("friendEmail:" + friendEmail);
      const res = await firebase
        .firestore()
        .collection("userLookup")
        .doc(friendEmail.toLowerCase())
        .get();
      let friendUID = res.get("uid");
      console.log("friend UID:" + friendUID);
      const data = {
        uid: friendUID,
        email: friendEmail.toLowerCase(),
      };
      const setUserRequest = await firebase
        .firestore()
        .collection("users")
        .doc(user?.uid)
        .collection("friends")
        .doc(friendUID)
        .set(data);
      //TODO friend should know they're being followed/being stalked
    } catch (error) {
      console.log(error);
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      let refresh = true;
      async function getData() {
        try {
          if (refresh) {
            await retrieveData();
          }
        } catch (error) {
          console.log(error);
        }
      }
      getData();
      return () => (refresh = false);
    }, [])
  );

  async function retrieveData() {
    try {
      const tempMap = new Map();
      let initialQuery = await firestore()
        .collection("users")
        .doc(user?.uid)
        .collection("friends");
      let documentSnapshots = await initialQuery.get();
      let documentData = documentSnapshots.docs.map((document) =>
        document.data()
      );
      setFriendData(friendData);
      console.log("documentData ", documentData);
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
      <FlatList
        data={friendData}
        renderItem={({ item }: { item: firestore.DocumentData }) => (
          <View>
            <FriendItem email={item.email} uid={item.uid} />
            <View style={styles.spacing} />
          </View>
        )}
        onEndReachedThreshold={0.5}
      />
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
