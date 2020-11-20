import React, { useState } from "react";
import { View, Platform, Text, Image, Dimensions } from "react-native";
import { COLORS } from "../assets/COLORS";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";
import EStyleSheet from "react-native-extended-stylesheet";
import { summary } from "date-streaks";
import { firestore } from "firebase";
import firebase from "firebase";
const valueToColor = require("../assets/ValueToColor");

export default function AnalyzeStreaks() {
  const [user, setUser] = useState(firebase.auth().currentUser);
  const [allDatesArray, setAllDatesArray] = useState(new Array());
  const [loading, setLoading] = useState(false);
  const [longestStreak, setLongestStreak] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      let isLoading = true;
      let refresh = true;
      async function getStreak() {
        const doc = await firebase
          .firestore()
          .collection("users")
          .doc(user?.uid)
          .get();
        setCurrentStreak(doc.get("streak"));
      }
      async function retrieveData() {
        try {
          if (isLoading) {
            await retrieveDataWeek();
          }
        } catch (error) {
          console.log(error);
        }
      }
      retrieveData();
      if (refresh) {
        let doc = getStreak();
      }
      return () => (refresh = false);
    }, [])
  );

  React.useEffect(() => {}, []);

  async function retrieveDataWeek() {
    try {
      const dateArray = new Array();
      setLoading(true);
      let initialQuery = await firestore()
        .collection("users")
        .doc(user?.uid)
        .collection("userLogs")
        .orderBy("timestamp", "desc");
      let documentSnapshots = await initialQuery.get();
      let documentData = documentSnapshots.docs.map((document) =>
        document.data()
      );
      documentData.map((item: any) => {
        var date = moment(item.timestamp).format("MM/DD/YYYY");
        dateArray.push(date);
      });
      setLoading(false);
      setAllDatesArray(dateArray);
      setLongestStreak(summary({ dates: dateArray }).longestStreak);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      {longestStreak == 0 ? (
        //when the longest streak is 0 (means they haven't logged anything ever)
        <View
          style={{
            flexDirection: "column",
            width: Dimensions.get("window").width * 0.85,
          }}
        >
          <Text style={styles.textStyle}>
            You haven't logged yet! Check back here when you do!
          </Text>
        </View>
      ) : longestStreak > currentStreak ? (
        //when the longest streak is larger than the current streak
        <View style={styles.badgeContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.textStyle}>
              Your longest streak was {longestStreak}{" "}
            </Text>
            <Image
              source={require("../assets/images/streak.png")}
              style={styles.badge}
            />
          </View>
          <Text style={styles.textStyle}>
            You are {longestStreak - currentStreak}{" "}
            {longestStreak - currentStreak == 1 ? "day" : "days"} from catching
            up!
          </Text>
        </View>
      ) : longestStreak == currentStreak ? (
        //is current and longest streak are equal
        <View style={styles.badgeContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.textStyle}>
              Your longest and current streak is {longestStreak}{" "}
            </Text>
            <Image
              source={require("../assets/images/streak.png")}
              style={styles.badge}
            />
          </View>
        </View>
      ) : (
        //else
        <View style={styles.badgeContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.textStyle}>
              Your longest streak is {longestStreak}{" "}
            </Text>
            <Image
              source={require("../assets/images/streak.png")}
              style={styles.badge}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.pink,
    color: COLORS.darkBlue,
    marginTop: 25,
    fontFamily: "HindSiliguri_400Regular",
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 7,
      },
      android: {
        elevation: 5,
      },
    }),
    alignItems: "center",
    padding: "10rem",
  },

  textStyle: {
    fontFamily: "HindSiliguri_600SemiBold",
    color: COLORS.darkBlue,
    fontSize: 18,
  },
  subtextStyle: {
    fontFamily: "HindSiliguri_500Medium",
    color: COLORS.darkBlue,
    fontSize: 16,
  },
  badge: {
    width: "30rem",
    height: "30rem",
  },
  badgeContainer: {
    flexDirection: "column",
  },
});
