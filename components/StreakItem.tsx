import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import EStyleSheet from "react-native-extended-stylesheet";
import { Feather, AntDesign } from "@expo/vector-icons";
import { COLORS } from "../assets/COLORS";
import { useFocusEffect } from "@react-navigation/native";
import firebase from "firebase";

//TODO give props
export default function StreakItem() {
  const [modalVisible, setModalVisible] = React.useState(false);
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

  return (
    <View style={styles.container}>
      <View style={styles.spacing}></View>
      <View style={styles.achievement}>
        <View style={styles.achievementTitleContainer}>
          <Text style={styles.achievemetTitle}> {user?.displayName}</Text>
          <View style={styles.spacing}></View>
          <View style={styles.streakContainer}>
            <Text style={styles.achievementDescription}>{streak}</Text>
            <Image
              source={require("../assets/images/streak.png")}
              style={styles.badge}
            />
          </View>
        </View>
        <View style={styles.circle} />
        <Image
          style={styles.circle2}
          resizeMode="contain"
          source={require("../assets/images/avatars/70.png")}
        />
      </View>
    </View>
  );
}

const styles = EStyleSheet.create({
  badge: {
    backgroundColor: "transparent",
    width: "50rem",
    height: "50rem",
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  achievementTitleContainer: {
    width: "63%",
    backgroundColor: "transparent",
    aspectRatio: 1.5 / 1,
  },
  achievemetTitle: {
    color: COLORS.darkBlue,
    fontSize: "27rem",
    fontFamily: "HindSiliguri_500Medium",
    textAlign: "center",
  },
  achievementDescription: {
    color: COLORS.darkBlue,
    fontSize: "25rem",
    fontFamily: "HindSiliguri_500Medium",
    textAlign: "center",
  },
  circle: {
    position: "absolute",
    top: "6rem",
    height: "125rem",
    width: "125rem",
    borderRadius: "63rem",
    backgroundColor: COLORS.pink,
    borderColor: COLORS.pink,
    borderWidth: "14rem",
    alignSelf: "flex-end",
  },
  circle2: {
    position: "absolute",
    top: "16rem",
    height: "115rem",
    width: "115rem",
    borderRadius: "57.5rem",
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: "14rem",
    alignSelf: "flex-end",
    right: "4rem",
  },
  achievement: {
    width: "100%",
    aspectRatio: 5 / 2,
    backgroundColor: "#FCDDB9",
    borderRadius: 10,
    flexDirection: "column",
    padding: "5rem",
    justifyContent: "space-around",
  },
  spacing: {
    padding: "8rem",
    backgroundColor: "transparent",
  },
});
