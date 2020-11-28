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
import { Feather } from "@expo/vector-icons";
import AchievementsList from "./AchievementsList";
import { COLORS } from "../assets/COLORS";
import firebase from "firebase";
import { useFocusEffect } from "@react-navigation/native";

export default function AchievementsModal(props: { modalVisible: boolean }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [achievementsNumber, setAchievementsNumber] = React.useState(0);
  const [friendNumber, setFriendNumber] = React.useState(0);
  const [streakNumber, setStreakNumber] = React.useState(0);

  async function calculateAchieveNumber() {
    const user = firebase.auth().currentUser;
    let doc = await firebase
      .firestore()
      .collection("users")
      .doc(user?.uid)
      .get();
    let longestStreak = doc.get("longestStreak");
    let friendQuery = await firebase
      .firestore()
      .collection("users")
      .doc(user?.uid)
      .collection("friends");
    let friendsSnapshots = await friendQuery.get();
    var friendLength = friendsSnapshots.size;

    if (longestStreak == 0) {
      setStreakNumber(0);
    } else if (longestStreak == 1) {
      setStreakNumber(1);
    } else if (longestStreak == 2) {
      setStreakNumber(2);
    } else if (longestStreak > 2 && longestStreak < 5) {
      setStreakNumber(3);
    } else if (longestStreak >= 5 && longestStreak < 8) {
      setStreakNumber(4);
    } else if (longestStreak >= 8 && longestStreak < 13) {
      setStreakNumber(5);
    } else if (longestStreak >= 13 && longestStreak < 21) {
      setStreakNumber(6);
    } else {
      setStreakNumber(7);
    }

    if (friendLength == 0) {
      setFriendNumber(0);
    } else if (friendLength == 1) {
      setFriendNumber(1);
    } else if (friendLength == 2) {
      setFriendNumber(2);
    } else if (friendLength > 2 && friendLength < 5) {
      setFriendNumber(3);
    } else if (friendLength >= 5 && friendLength < 8) {
      setFriendNumber(4);
    } else {
      setFriendNumber(5);
    }
    setAchievementsNumber(friendNumber + streakNumber);
  }

  useFocusEffect(() => {
    let isLoading = true;
    async function retrieve() {
      try {
        if (isLoading) {
          await calculateAchieveNumber();
        }
      } catch (error) {
        console.log(error);
      }
    }
    retrieve();

    return () => (isLoading = false);
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
            <View style={styles.achievementsHeader}>
              <Text style={styles.Header}>Achievements</Text>
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
            <AchievementsList />
          </ScrollView>
        </View>
      </Modal>
      <View>
        <TouchableHighlight onPress={() => openModal()} underlayColor="none">
          <View style={styles.badgeContainer}>
            <Text style={styles.countText}> {achievementsNumber}</Text>
            <Image
              source={require("../assets/images/achievement.png")}
              style={styles.badge}
            />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = EStyleSheet.create({
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
    backgroundColor: "transparent",
    width: "50rem",
    height: "50rem",
  },
  modalContainer: {
    margin: -10,
    marginTop: "20rem",
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
    backgroundColor: COLORS.yellowAccent,
    borderRadius: 20,
    padding: 5,
    alignSelf: "flex-start",
    left: "120rem",
  },
});
