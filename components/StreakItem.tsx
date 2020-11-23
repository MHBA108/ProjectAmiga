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
import firebase, { firestore } from "firebase";
import avatars from "../assets/images/avatars/avatars";

//TODO give props
export default function StreakItem(props: { email: any; uid: any }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const [streak, setStreak] = React.useState(0);
  const [avatar, setAvatar] = React.useState(0);

  async function retrieveData() {
    try {
      let friendInfo = await getFriendsInfo(props.uid);
      //console.log("avatar number: ", friendInfo[1]);
      setStreak(friendInfo[0]);
      setAvatar(friendInfo[1]);
    } catch (error) {
      console.log(error);
    }
  }
  async function getFriendsInfo(item: any) {
    try {
      const doc = await firestore().collection("users").doc(item).get();
      return [doc.get("streak"), doc.get("avatar")];
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
  return (
    <View style={styles.container}>
      <View style={styles.spacing}></View>
      <View style={styles.achievement}>
        <View style={styles.achievementTitleContainer}>
          <Text style={styles.achievemetTitle}> {props.email}</Text>
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
          source={avatars[`${avatar}`]}
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
    fontSize: "18rem",
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
    borderRadius: "90rem",
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
    borderRadius: "90rem",
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
