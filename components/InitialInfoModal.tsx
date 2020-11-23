import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
} from "react-native";
import Modal from "react-native-modal";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../assets/COLORS";
import * as firebase from "firebase";
import { useFocusEffect } from "@react-navigation/native";
import { User } from "realm";
import { useState } from "react";
import AvatarCarousel from "./AvatarCarousel";
import avatars from "../assets/images/avatars/avatars";
import { AuthContext } from "../navigation/context";

export default function InitialInfoModal(props: {
  visible: boolean;
  setVisible: Function;
}) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const [avatar, setAvatar] = React.useState(1);
  const authContext = React.useContext(AuthContext);

  function openModal() {
    props.setVisible(true);
  }

  function closeModal() {
    props.setVisible(false);
    // Send avatar to database
    async function setUserAvatar() {
      const user = firebase.auth().currentUser;
      const userDoc = await firebase
        .firestore()
        .collection("users")
        .doc(user?.uid)
        .update({
          avatar: avatar,
        });
      authContext.avatar = "" + avatar;
    }
    setUserAvatar();
  }

  return (
    <View style={styles.container}>
      <Modal
        hasBackdrop={true}
        isVisible={props.visible}
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
            <View style={styles.container}>
              <AvatarCarousel setAvatar={setAvatar} />
            </View>
            <View style={styles.spacing}></View>
            <View style={styles.avatarHeader}>
              <Text style={styles.Header}>YOUR AVATAR PREVIEW:</Text>
            </View>
            <View style={styles.spacing}></View>
            <Image
              style={styles.circle2}
              resizeMode="contain"
              source={avatars[`${avatar}`]}
            />
            <View style={styles.spacing}></View>
            <View style={styles.spacing}></View>
            <View style={styles.saveButton}>
              <TouchableHighlight
                onPress={() => closeModal()}
                underlayColor="none"
              >
                <Text style={styles.saveText}> Save </Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = EStyleSheet.create({
  circle2: {
    left: "-10rem",
    top: "-3rem",
    height: "150rem",
    width: "150rem",
    borderRadius: "75rem",
    backgroundColor: COLORS.lightBlue,
    borderColor: "transparent",
    borderWidth: "14rem",
    alignSelf: "center",
  },
  avatar: {
    height: "150rem",
    width: "150rem",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.yellowAccent,
    borderRadius: 10,
  },
  datePickerStyle: {
    width: "200rem",
    backgroundColor: COLORS.yellowAccent,
    borderRadius: 10,
  },
  date: {
    alignSelf: "center",
  },
  input: {
    fontSize: "30rem",
    backgroundColor: COLORS.yellowAccent,
    borderRadius: 10,
    color: COLORS.darkBlue,
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
    backgroundColor: COLORS.yellowAccent2,
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
