import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import Modal from "react-native-modal";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../assets/COLORS";
import * as firebase from "firebase";
import { useFocusEffect } from "@react-navigation/native";
import { User } from "realm";
import { useState } from "react";
import DatePicker from "react-native-datepicker";
import AvatarCarousel from "./AvatarCarousel";

export default function InitialInfoModal() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const [streak, setStreak] = React.useState(0);
  const [avatar, setAvatar] = React.useState("");
  const [date, setDate] = useState("09-10-2010");

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
            <View style={styles.container}>
              <AvatarCarousel />
            </View>
            <View style={styles.spacing}></View>
            <View style={styles.avatarHeader}>
              <Text style={styles.Header}>YOUR AVATAR PREVIEW:</Text>
            </View>
            <View style={styles.spacing}></View>
            <Image
              style={styles.circle2}
              resizeMode="contain"
              source={require("../assets/images/avatars/1.png")}
            />
            <View style={styles.spacing}></View>
            <View style={styles.avatarHeader}>
              <Text style={styles.Header}>BIRTHDAY</Text>
            </View>
            <View style={styles.spacing}></View>
            <View style={styles.date}>
              <DatePicker
                style={styles.datePickerStyle}
                date={date} // Initial date from state
                mode="date" // The enum of date, datetime and time
                placeholder="select date"
                format="MM-DD-YYYY"
                minDate="01-01-1950"
                maxDate="01-01-2020"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  btnTextConfirm: {
                    color: COLORS.pink,
                  },
                  dateIcon: {
                    //display: 'none',
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                    borderWidth: 0,
                  },
                  dateText: {
                    color: COLORS.darkBlue,
                    fontFamily: "HindSiliguri_500Medium",
                    fontSize: 18,
                  },
                }}
                onDateChange={(date) => {
                  setDate(date);
                }}
              />
            </View>
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
