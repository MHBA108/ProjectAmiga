import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../assets/COLORS";
import avatar from "../assets/images/avatars/female.png";

//TODO: add props
export default class FeedItem extends Component {
  render() {
    return (
      <View style={styles.feed}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>5/12/2020</Text>
          <View style={styles.spacing}></View>
          <View style={styles.streakContainer}>
            <Text style={styles.streakFont}> 23</Text>
            <Image
              source={require("../assets/images/streak.png")}
              style={styles.badge}
            />
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
            <Text style={styles.usernameFont}> @Username </Text>
          </View>
        </View>
        <View style={styles.logContainer}>
          <Text style={styles.streakFont}> has logged today!</Text>
        </View>
        <View style={styles.bar}></View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
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
    paddingHorizontal: "15rem",
    justifyContent: "space-between",
    alignSelf: "center",
    color: COLORS.beige,
    fontSize: "20rem",
    fontFamily: "HindSiliguri_600SemiBold",
  },
  circleContainer: {
    height: "75rem",
    width: "75rem",
    borderRadius: "37.5rem",
    top: "5rem",
    left: "2rem",
  },
  circle: {
    position: "absolute",
    height: "80rem",
    width: "80rem",
    borderRadius: "40rem",
    backgroundColor: COLORS.lightBlue,
    borderColor: COLORS.lightBlue,
    borderWidth: "5rem",
  },
  feed: {
    width: "100%",
    aspectRatio: 4 / 2,
    backgroundColor: "#4E5E85",
    borderRadius: 10,
    flexDirection: "column",
    padding: "5rem",
    justifyContent: "space-around",
  },

  date: {
    color: COLORS.beige,
    fontSize: "13rem",
    textAlign: "center",
    fontFamily: "HindSiliguri_400Regular",
  },
  HeaderContainer: {
    width: "100%",
    backgroundColor: "transparent",
    aspectRatio: 15 / 1,
  },
  logContainer: {
    width: "100%",
    aspectRatio: 7 / 1,
    backgroundColor: "#6771A6",
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
  streakContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  dateContainer: {
    position: "absolute",
    alignSelf: "flex-end",
    backgroundColor: "transparent",
    flexDirection: "column",
    borderRadius: 10,
    padding: "5rem",
    right: "5rem",
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
  },
});
