import React, { Component } from "react";
import { Text, View, ScrollView, Alert, Image } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../assets/COLORS";
import avatar from "../assets/images/avatars/1.png";

//TODO: add props
export default class FriendItem extends Component {
  render() {
    return (
      <View style={styles.feed}>
        <View style={styles.dateContainer}>
          <Text style={styles.usernameFont}> @Username </Text>
          <View style={styles.spacing}></View>
          <View style={styles.streakAndAchievement}>
            <Text style={styles.streakFont}>23</Text>
            <Image
              source={require("../assets/images/streak.png")}
              style={styles.badge}
            />
            <View style={styles.achievementContainer}>
              <Text style={styles.streakFont}>3</Text>
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
              source={avatar}
            />
          </View>
        </View>
        <View style={styles.bar}></View>
      </View>
    );
  }
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
    fontSize: "30rem",
    fontFamily: "HindSiliguri_600SemiBold",
  },
  circleContainer: {
    height: "120rem",
    width: "120rem",
    borderRadius: "60rem",
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
