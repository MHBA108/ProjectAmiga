import { useFocusEffect } from "@react-navigation/native";
import firebase from "firebase";
import { firestore } from "firebase";
import React, { Component } from "react";
import { Text, View, ScrollView, Alert, Image } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../assets/COLORS";
import avatars from "../assets/images/avatars/avatars";
import Swipeout from "react-native-swipeout";

export default function FriendItem(props: {
  email: any;
  uid: any;
  callbackFriendsList: Function;
}) {
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const [friendData, setFriendData] = React.useState(new Map());
  const [avatar, setAvatar] = React.useState(0);
  const [streak, setStreak] = React.useState(0);
  const [achievements, setAchievements] = React.useState(0);

  async function retrieveData() {
    try {
      let friendInfo = await getFriendsInfo(props.uid);
      console.log(
        "the avatar number for " + props.email + " is: " + friendInfo[1]
      );
      setStreak(friendInfo[0]);
      setAvatar(friendInfo[1]);
      setAchievements(5);
      props.callbackFriendsList();
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
  async function onDelete() {
    const setUserRequest = await firebase
      .firestore()
      .collection("users")
      .doc(user?.uid)
      .collection("friends")
      .doc(props.uid)
      .delete();
    props.callbackFriendsList();
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
    }, [props.email])
  );
  let swipeBtns = [
    {
      text: "Delete",
      backgroundColor: "red",
      underlayColor: "rgba(0, 0, 0, 1, 0.6)",
      borderRadius: 10,
      onPress: () => {
        onDelete();
      },
    },
  ];
  return (
    <View>
      <Swipeout
        style={{ borderRadius: 10 }}
        right={swipeBtns}
        backgroundColor="transparent"
        autoClose={true}
      >
        <View style={styles.feed}>
          <View style={styles.dateContainer}>
            <Text style={styles.usernameFont}> {props.email} </Text>
            <View style={styles.spacing}></View>
            <View style={styles.streakAndAchievement}>
              <Text style={styles.streakFont}>{streak} </Text>
              <Image
                source={require("../assets/images/streak.png")}
                style={styles.badge}
              />
              <View style={styles.achievementContainer}>
                <Text style={styles.streakFont}>{achievements} </Text>
                <Image
                  source={require("../assets/images/achievement.png")}
                  style={styles.badge}
                />
              </View>
            </View>
          </View>
          <View style={styles.HeaderContainer}>
            <View style={styles.containerUpperRight}>
              <View style={styles.circle}></View>
              <Image
                style={styles.circleContainer}
                resizeMode="contain"
                source={avatars[`${avatar}`]}
              />
            </View>
          </View>
          <View style={styles.bar}></View>
        </View>
      </Swipeout>
    </View>
  );
}

const styles = EStyleSheet.create({
  achievementContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "10rem",
  },
  spacing: {
    padding: "8rem",
    backgroundColor: "transparent",
  },
  streakFont: {
    color: COLORS.beige,
    fontSize: "20rem",
    fontFamily: "HindSiliguri_600SemiBold",
  },
  containerUpperRight: {
    flexDirection: "row",
  },
  usernameFont: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
    paddingHorizontal: "5rem",
    justifyContent: "space-between",
    alignSelf: "center",
    color: COLORS.beige,
    fontSize: "16rem",
    fontFamily: "HindSiliguri_600SemiBold",
  },
  circleContainer: {
    height: "120rem",
    width: "120rem",
    borderRadius: "90rem",
    top: "5rem",
    left: "2rem",
  },
  circle: {
    position: "absolute",
    height: "125rem",
    width: "125rem",
    borderRadius: "62.5rem",
    backgroundColor: COLORS.lightBlue,
    borderColor: COLORS.lightBlue,
    borderWidth: "5rem",
  },
  feed: {
    width: "100%",
    aspectRatio: 5 / 2,
    backgroundColor: COLORS.darkBlueAccent,
    borderRadius: 10,
    flexDirection: "column",
    padding: "5rem",
    justifyContent: "space-around",
  },
  HeaderContainer: {
    width: "100%",
    backgroundColor: "transparent",
    alignSelf: "center",
  },
  logContainer: {
    width: "100%",
    aspectRatio: 7 / 1,
    backgroundColor: COLORS.darkBlueAccent2,
    flexDirection: "row",
    paddingVertical: "5rem",
    alignItems: "center",
    alignSelf: "flex-end",
    position: "absolute",
    borderRadius: 10,
    padding: "5rem",
    right: "5rem",
    top: "100rem",
    height: "55rem",
  },
  streakAndAchievement: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateContainer: {
    position: "absolute",
    alignSelf: "flex-end",
    backgroundColor: "transparent",
    flexDirection: "column",
    borderRadius: 10,
    padding: "5rem",
    top: "5rem",
  },
  textCon: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "transparent",
    paddingHorizontal: "5rem",
    justifyContent: "space-between",
    alignSelf: "flex-end",
    alignItems: "center",
  },
  bar: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    height: "40rem",
    width: "40rem",
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: "10rem",
  },
});
