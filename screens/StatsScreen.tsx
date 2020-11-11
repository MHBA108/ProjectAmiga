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
import { COLORS } from "../assets/COLORS";
import OpenAchievements from "../components/OpenAchievements";
import EStyleSheet from "react-native-extended-stylesheet";
import { SafeAreaView } from "react-native-safe-area-context";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import MyHeader from "../components/MyHeader";

const StatsScreen = (props: { navigation: any }) => {
  const [language] = React.useState({
    language: "java",
  });

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
                width: "90%",
                marginBottom: windowHeight * 0.01,
                backgroundColor: COLORS.beige,
                paddingTop: 10,
              }}
            >
              <Avatar
                size="medium"
                rounded
                title="MT"
                activeOpacity={0.7}
                avatarStyle={{ borderWidth: 2 }}
                titleStyle={{ color: "black" }}
                containerStyle={{ alignContent: "flex-start" }}
              />
              <Clock showDate={true} showTime={false} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "95%",
                backgroundColor: COLORS.beige,
              }}
            >
              <View style={styles.statsStyle}>
                <Text style={{ color: COLORS.darkBlue }}>
                  {" "}
                  Leaderboard Position: 1
                </Text>
              </View>
              <View style={styles.statsStyle}>
                <Text style={{ color: COLORS.darkBlue }}>
                  {" "}
                  Longest Log Streak: 23
                </Text>
              </View>
            </View>
            <MoodChart></MoodChart>
            <View style={styles.calendarStyle}>
              <MonthCalendar />
            </View>
            <Text style={styles.badgeText}>Achievements</Text>
            <View style={styles.badgeContainer1}>
              <OpenAchievements />
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
    width: "45%",
    borderRadius: 10,
    padding: 10,
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
    // fontSize: "11rem",
  },
  badgeContainer: {
    flexDirection: "row",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FCD7AE",
    // aspectRatio: 1 / 1,
    padding: "15rem",
  },
  badgeContainer1: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "transparent",
    width: "20%",
    height: "10%",

    // aspectRatio: 1 / 4,
    // padding: "10rem",
  },
});
