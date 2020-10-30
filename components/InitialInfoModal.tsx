import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../assets/COLORS";
import * as firebase from "firebase";
import { useFocusEffect } from "@react-navigation/native";
import { User } from "realm";
import Carousel from "./Carousel";

export default function InitialInfoModal() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [height, setHeight] = React.useState(0);
  const [selected, setSelected] = React.useState(false);
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const [streak, setStreak] = React.useState(0);
  const [avatar, setAvatar] = React.useState("");

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
          <ScrollView style={styles.innerContainer}>
            <View style={styles.spacing}></View>
            <View style={styles.avatarHeader}>
              <Text style={styles.Header}>CHOOSE YOUR AVATAR</Text>
            </View>
            <View style={styles.spacing}></View>
            <Carousel />
            <View style={styles.spacing}></View>
            <View style={styles.spacing}></View>
            <View style={styles.avatarHeader}>
              <Text style={styles.Header}>USERNAME</Text>
            </View>
            <View style={styles.spacing}></View>
            <TextInput
              style={styles.input}
              placeholder="username..."
              placeholderTextColor="#4E5E85"
              returnKeyType="next"
              textContentType="username"
            />
            <View style={styles.spacing}></View>
            <View style={styles.spacing}></View>
            <View style={styles.avatarHeader}>
              <Text style={styles.Header}>BIRTHDAY</Text>
            </View>
            <View style={styles.spacing}></View>
            <TextInput
              style={styles.input}
              placeholder="mm/dd/yyy"
              placeholderTextColor="#4E5E85"
              returnKeyType="next"
              textContentType="none"
            />
          </ScrollView>
          <View style={styles.saveButton}>
            <TouchableHighlight
              onPress={() => closeModal()}
              underlayColor="none"
            >
              <Text style={styles.saveText}> Save </Text>
            </TouchableHighlight>
          </View>
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
  input: {
    fontSize: "30rem",
    borderColor: "#707070",
    backgroundColor: "#FCDDB9",
    borderRadius: 10,
  },
  spacing: {
    padding: "15rem",
    backgroundColor: "transparent",
  },
  Header: {
    color: COLORS.darkBlue,
    fontFamily: "HindSiliguri_500Medium",
    fontSize: "30rem",
  },
  avatarHeader: {
    flexDirection: "row",
    backgroundColor: "#FCDDB9",
    alignSelf: "center",
    borderRadius: 10,
  },
  countText: {
    color: COLORS.darkBlue,
    fontFamily: "HindSiliguri_500Medium",
    fontSize: "30rem",
  },
  saveText: {
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
    backgroundColor: "#FCD7AE",
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
  saveButton: {
    backgroundColor: COLORS.pink,
    borderRadius: 20,
    padding: 5,
    alignSelf: "center",
  },
  innerContainer: {
    alignSelf: "center",
  },
});
