import * as React from "react";
import {
  ScrollView,
  Dimensions,
  TouchableHighlight,
  Alert,
  StatusBar,
} from "react-native";
import { Avatar } from "react-native-elements";
import { LineChart } from "react-native-chart-kit";
import { Text, View } from "../components/Themed";
import Clock from "../components/Clock";
import MoodChart from "../components/MoodChart";
import { Picker } from "@react-native-community/picker";
import Calendar from "../components/Calendar";
import MonthCalendar from "../components/MonthCalendar";
import AnalyzeStreaks from "../components/AnalyzeStreaks";
import { COLORS } from "../assets/COLORS";
import OpenAchievements from "../components/OpenAchievements";
import EStyleSheet from "react-native-extended-stylesheet";
import { SafeAreaView } from "react-native-safe-area-context";
import OpenStreaks from "../components/OpenStreaks";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import MyHeader from "../components/MyHeader";
import firebase from "firebase";
import { useFocusEffect } from "@react-navigation/native";

const StatsScreen = (props: { navigation: any }) => {
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const [streak, setStreak] = React.useState(0);
  const [language] = React.useState({
    language: "java",
  });

  useFocusEffect(
    React.useCallback(() => {
      let refresh = true;
      async function getStreak() {
        const doc = await firebase
          .firestore()
          .collection("users")
          .doc(user?.uid)
          .get();
        setStreak(doc.get("streak"));
      }
      if (refresh) {
        let doc = getStreak();
      }
      return () => (refresh = false);
    }, [])
  );

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.beige }}>
      <ScrollView style={styles.scrollContainer}>
        <View style={{ backgroundColor: COLORS.beige }}>
          <View style={styles.container}>
            <View style={styles.headContainer}>
              <Text style={styles.headText}>Stats</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                backgroundColor: COLORS.beige,
              }}
            >
              <Clock showDate={true} showTime={false} />
            </View>
            <View style={styles.spacing}></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "95%",
                backgroundColor: COLORS.beige,
              }}
            ></View>
            <MoodChart></MoodChart>

            <View style={styles.calendarStyle}>
              <MonthCalendar />
            </View>
            <AnalyzeStreaks></AnalyzeStreaks>
            <View style={styles.spacing2}></View>
            <View style={styles.modal}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Achievements</Text>
                <View style={styles.badgeContainer1}>
                  <OpenAchievements />
                </View>
              </View>
              <View style={styles.spacing2}></View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Streak</Text>
                <View style={styles.badgeContainer1}>
                  <OpenStreaks />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <MyHeader navigation={props.navigation} />
    </SafeAreaView>
  );
};

export default StatsScreen;

const styles = EStyleSheet.create({
  badge: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "transparent",
  },
  modal: {
    flex: 3,
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  spacing: {
    padding: "5rem",
    backgroundColor: "transparent",
  },
  spacing2: {
    padding: "15rem",
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.beige,
    marginTop: StatusBar.currentHeight,
  },
  scrollContainer: {
    paddingHorizontal: "10rem",
  },
  statsStyle: {
    backgroundColor: COLORS.yellow,
    width: "25%",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    left: "260rem",
  },
  headContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: COLORS.beige,
  },
  headText: {
    fontSize: "30rem",
    color: COLORS.darkBlue,
    fontFamily: "HindSiliguri_700Bold",
  },

  calendarStyle: {
    justifyContent: "center",
    width: "95%",
    backgroundColor: COLORS.beige,
  },
  badgeText: {
    color: "#464D77",
    fontFamily: "HindSiliguri_500Medium",
  },
  badgeContainer1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    padding: "10rem",
    height: "100rem",
    width: "100rem",
  },
});
