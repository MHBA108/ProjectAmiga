import * as React from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  Alert,
} from "react-native";
import { Avatar } from "react-native-elements";
import { LineChart } from "react-native-chart-kit";
import { Text, View } from "../components/Themed";
import Clock from "../components/Clock";
import { Picker } from "@react-native-community/picker";
import Calendar from "../components/Calendar";
import { COLORS } from "../assets/COLORS";
import OpenAchievements from "../components/OpenAchievements";
import EStyleSheet from "react-native-extended-stylesheet";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import MyHeader from "../components/MyHeader";

const StatsScreen = (props: { navigation: any }) => {
  const [language] = React.useState({
    language: "java",
  });

  return (
    <View style={{ backgroundColor: COLORS.beige }}>
      <MyHeader navigation={props.navigation} />
      <ScrollView style={{ backgroundColor: COLORS.beige }}>
        <View style={{ backgroundColor: COLORS.beige }}>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "90%",
                marginBottom: windowHeight * 0.01,
                backgroundColor: COLORS.beige,
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
            <View style={styles.graphContainer}>
              <View style={styles.graphHeaderStyle}>
                <View style={{ backgroundColor: COLORS.darkBlue }}>
                  <Text
                    style={{
                      color: "white",
                      backgroundColor: COLORS.darkBlue,
                      fontSize: 25,
                    }}
                  >
                    Mood Chart
                  </Text>
                </View>
                {/* TODO: change buttons to picker */}
                {/* <Picker
                selectedValue={this.state.language}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ language: itemValue })
                }
              >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
              </Picker> */}
                <View
                  style={{ flexDirection: "row", borderRadius: 10, padding: 3 }}
                >
                  <TouchableHighlight
                    underlayColor="none"
                    onPress={() => Alert.alert("Week pressed")}
                    style={styles.graphRangeStyle}
                  >
                    <Text style={{ color: "white" }}>W</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor="none"
                    onPress={() => Alert.alert("Month pressed")}
                    style={styles.graphRangeStyle}
                  >
                    <Text style={{ color: "white" }}>M</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor="none"
                    onPress={() => Alert.alert("Year pressed")}
                    style={styles.graphRangeStyle}
                  >
                    <Text style={{ color: "white" }}>Y</Text>
                  </TouchableHighlight>
                </View>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: COLORS.darkBlue,
                }}
              >
                <LineChart
                  data={{
                    labels: [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                    ],
                    datasets: [
                      {
                        data: [
                          Math.floor(Math.random() * 100),
                          Math.floor(Math.random() * 100),
                          Math.floor(Math.random() * 100),
                          Math.floor(Math.random() * 100),
                          Math.floor(Math.random() * 100),
                          Math.floor(Math.random() * 100),
                        ],
                      },
                    ],
                  }}
                  width={Dimensions.get("window").width * 0.9} // from react-native
                  height={220}
                  chartConfig={{
                    backgroundColor: "blue",
                    backgroundGradientFrom: COLORS.darkBlue,
                    backgroundGradientTo: COLORS.darkBlue,
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      // borderRadius: 16,
                      alignContent: "stretch",
                    },
                    propsForDots: {
                      r: "6",
                      strokeWidth: "2",
                      stroke: COLORS.darkBlue,
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                />
              </View>
            </View>
            <View style={styles.calendarStyle}>
              <Calendar />
            </View>
            <Text style={styles.badgeText}>Achievements</Text>
            <View style={styles.badgeContainer1}>
              <OpenAchievements />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default StatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.beige,
  },

  statsStyle: {
    backgroundColor: COLORS.yellow,
    width: "45%",
    borderRadius: 10,
    padding: 10,
  },

  graphRangeStyle: {
    marginHorizontal: 2,
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: COLORS.darkBlue,
  },

  graphContainer: {
    justifyContent: "center",
    width: "95%",
    backgroundColor: COLORS.darkBlue,
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 10,
    borderRadius: 10,
  },

  graphHeaderStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "88%",
    backgroundColor: COLORS.darkBlue,
    marginVertical: 10,
    borderRadius: 10,
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
    height: "10%"
    
    // aspectRatio: 1 / 4,
    // padding: "10rem",
  },
});
