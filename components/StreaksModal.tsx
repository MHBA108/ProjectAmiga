import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import EStyleSheet from "react-native-extended-stylesheet";
import { Feather } from "@expo/vector-icons";
import StreaksList from "./StreaksList";
import { COLORS } from "../assets/COLORS";
import * as firebase from "firebase";
import { useFocusEffect } from "@react-navigation/native";

export default function StreaksModal() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [height, setHeight] = React.useState(0);
  const [selected, setSelected] = React.useState(false);
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const [streak, setStreak] = React.useState(0);
  const [avatar, setAvatar] = React.useState("");
  const [friendEmail, setfriendEmail] = React.useState("");

  useFocusEffect(() => {
    let doc = getStreak();
    async function getStreak() {
      const doc = await firebase
        .firestore()
        .collection("users")
        .doc(user?.uid)
        .get();
      setStreak(doc.get("streak"));
      setAvatar(doc.get("avatar"));
    }
  });

  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }
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
            friendFollow(email);
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
  async function friendFollow(email: any) {
    try {
      const res = await firebase
        .firestore()
        .collection("userLookup")
        .doc(email)
        .get();
      let friendUID = res.get("uid");
      const data = {
        uid: user?.uid,
        email: user?.email,
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
  return (
    <View style={styles.container}>
      <Modal
        hasBackdrop={true}
        isVisible={modalVisible}
        backdropColor={COLORS.darkBlue}
        backdropOpacity={0.5}
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
      >
        <View style={styles.modalContainer}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <ScrollView style={styles.innerContainer}>
              <View style={styles.achievementsHeader}>
                <Text style={styles.Header}>Log Streaks</Text>
                <View style={styles.backButton}>
                  <TouchableHighlight
                    onPress={() => closeModal()}
                    underlayColor="none"
                  >
                    <Feather
                      name="chevron-up"
                      size={24}
                      color={COLORS.darkBlue}
                    />
                  </TouchableHighlight>
                </View>
              </View>
              <StreaksList />
              <View style={styles.spacing} />
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
                  <Feather
                    name="plus-circle"
                    size={30}
                    color={COLORS.darkBlueAccent}
                  />
                </TouchableHighlight>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
      <View>
        <TouchableHighlight onPress={() => openModal()} underlayColor="none">
          <View style={styles.badgeContainer}>
            <Text style={styles.countText}>{streak}</Text>
            <Image
              source={require("../assets/images/streak.png")}
              style={styles.badge}
            />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = EStyleSheet.create({
  addFriend: {
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  innerContainer: {
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
  },
  spacing: {
    padding: "8rem",
    backgroundColor: "transparent",
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
  Header: {
    color: COLORS.darkBlue,
    fontFamily: "HindSiliguri_500Medium",
    fontSize: "30rem",
  },
  achievementsHeader: {
    flexDirection: "row",
  },
  countText: {
    color: COLORS.darkBlue,
    fontFamily: "HindSiliguri_500Medium",
    fontSize: "30rem",
  },
  badgeContainer: {
    flexDirection: "row",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    aspectRatio: 1 / 1,
    height: "100rem",
  },
  badge: {
    backgroundColor: COLORS.yellow,
    width: "50rem",
    height: "50rem",
  },
  modalContainer: {
    margin: -10,
    marginTop: 50,
    flex: 1,
    backgroundColor: COLORS.yellow,
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
  backButton: {
    backgroundColor: "#FCDDB9",
    borderRadius: 20,
    padding: 5,
    alignSelf: "flex-start",
    left: "155rem",
  },
});
