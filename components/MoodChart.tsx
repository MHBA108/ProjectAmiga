import React, { useEffect, useState } from "react";
import {
  View,
  Platform,
  Dimensions,
  Text,
  TouchableHighlight,
  Alert,
  ScrollView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { COLORS } from "../assets/COLORS";
import moment from "moment";
import firebase, { firestore } from "firebase";
import EStyleSheet from "react-native-extended-stylesheet";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
const valueToColor = require("../assets/ValueToColor");

export default function MoodChart() {
  const [user, setUser] = useState(firebase.auth().currentUser);
  const [limit, setLimit] = useState(7);
  const [colorMap, setColorMap] = useState(new Map());
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = React.useState<firestore.DocumentData[]>([]);
  const [highestColor, setHighestColor] = useState("");
  const [lowestColor, setLowestColor] = useState("");
  const [length, setLength] = useState(0);
  const [graphSize, setGraphSize] = useState(0);
  const [scrollViewEnabled, setScrollViewEnabled] = useState(false);
  const valueToColor = require("../assets/ValueToColor");

  async function retrieveDataWeek() {
    let allDocumentData: firestore.DocumentData[] = [];
    try {
      const tempMap = new Map();
      let highestPoint = -1;
      let lowestPoint = 101;
      setLoading(true);
      let initialQuery = await firestore()
        .collection("users")
        .doc(user?.uid)
        .collection("userLogs")
        .orderBy("timestamp", "desc")
        .limit(limit);
      let documentSnapshots = await initialQuery.get();
      let graphData = documentSnapshots.docs.map((document) => document.data());
      graphData.map((item: any) => {
        if (moment(item.timestamp).isAfter(moment().subtract(limit, "days"))) {
          if (highestPoint < item.moodPercentile) {
            highestPoint = item.moodPercentile;
          }
          if (lowestPoint > item.moodPercentile) {
            lowestPoint = item.moodPercentile;
          }
          var dateString = moment(item.timestamp).format("M/D");
          tempMap.set(dateString, item.moodPercentile);
        }
      });
      setHighestColor(valueToColor(highestPoint));
      setLowestColor(valueToColor(lowestPoint));
      setLoading(false);
      setColorMap(tempMap);
      setLength(graphData.length);
      setGraphSize(tempMap.size);
    } catch (error) {
      console.log(error);
    }
    return allDocumentData;
  }

  useFocusEffect(
    React.useCallback(() => {
      let isLoading = true;
      async function retrieveData() {
        try {
          const data = await retrieveDataWeek();
          if (isLoading) {
            setLogs(data);
          }
        } catch (error) {
          console.log(error);
        }
      }
      retrieveData();
      return () => (isLoading = false);
    }, [limit])
  );

  return (
    <View style={styles.graphContainer}>
      {Array.from(colorMap.keys()).length == 0 || graphSize < 3 ? (
        <View>
          {graphSize > 0 && graphSize < 3 ? (
            <View>
              <Text
                style={{
                  alignSelf: "center",
                  alignItems: "center",
                  color: "white",
                  fontFamily: "HindSiliguri_600SemiBold",
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                You've only logged {graphSize}{" "}
                {graphSize == 1 ? "time" : "times"} this week. Come back in
                {" " + (3 - graphSize) + " "}
                {3 - graphSize == 1 ? "day" : "days"}!
              </Text>
            </View>
          ) : (
            <Text
              style={{
                alignSelf: "center",
                color: "white",
                fontFamily: "HindSiliguri_600SemiBold",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              You haven't logged enough to display data.
            </Text>
          )}
        </View>
      ) : (
        <View>
          <View style={styles.graphHeaderStyle}>
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 25,
                }}
              >
                Mood Chart
              </Text>
            </View>
            {limit == 7 ? (
              //week view
              <View
                style={{
                  flexDirection: "row",
                  borderRadius: 10,
                  padding: 3,
                  backgroundColor: "white",
                }}
              >
                <TouchableHighlight
                  underlayColor={COLORS.pink}
                  onPress={() => {
                    setScrollViewEnabled(false);
                    setLimit(7);
                    retrieveDataWeek();
                  }}
                  style={styles.graphRangeStyleSelected}
                >
                  <Text style={{ color: "white" }}>W</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={COLORS.pink}
                  onPress={() => {
                    setScrollViewEnabled(true);
                    setLimit(30);
                    retrieveDataWeek();
                    console.log(limit);
                  }}
                  style={styles.graphRangeStyle}
                >
                  <Text style={{ color: "white" }}>M</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={COLORS.pink}
                  onPress={() => {
                    if (length <= 31) {
                      Alert.alert(
                        "You haven't logged enough to generate this graph!"
                      );
                    } else {
                      setScrollViewEnabled(true);
                      setLimit(length);
                      retrieveDataWeek();
                    }
                  }}
                  style={styles.graphRangeStyle}
                >
                  <Text style={{ color: "white" }}>Y</Text>
                </TouchableHighlight>
              </View>
            ) : limit == 30 ? (
              <View
                style={{
                  flexDirection: "row",
                  borderRadius: 10,
                  padding: 3,
                  backgroundColor: "white",
                }}
              >
                <TouchableHighlight
                  underlayColor={COLORS.pink}
                  onPress={() => {
                    setScrollViewEnabled(false);
                    setLimit(7);
                    retrieveDataWeek();
                  }}
                  style={styles.graphRangeStyle}
                >
                  <Text style={{ color: "white" }}>W</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={COLORS.pink}
                  onPress={() => {
                    setScrollViewEnabled(true);
                    setLimit(30);
                    retrieveDataWeek();
                  }}
                  style={styles.graphRangeStyleSelected}
                >
                  <Text style={{ color: "white" }}>M</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={COLORS.pink}
                  onPress={() => {
                    if (length <= 31) {
                      Alert.alert(
                        "You haven't logged enough to generate this graph!"
                      );
                    } else {
                      setScrollViewEnabled(true);
                      setLimit(length);
                      retrieveDataWeek();
                    }
                  }}
                  style={styles.graphRangeStyle}
                >
                  <Text style={{ color: "white" }}>Y</Text>
                </TouchableHighlight>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  borderRadius: 10,
                  padding: 3,
                  backgroundColor: "white",
                }}
              >
                <TouchableHighlight
                  underlayColor={COLORS.pink}
                  onPress={() => {
                    setScrollViewEnabled(false);
                    setLimit(7);
                    retrieveDataWeek();
                  }}
                  style={styles.graphRangeStyle}
                >
                  <Text style={{ color: "white" }}>W</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={COLORS.pink}
                  onPress={() => {
                    setScrollViewEnabled(true);
                    setLimit(30);
                    retrieveDataWeek();
                  }}
                  style={styles.graphRangeStyle}
                >
                  <Text style={{ color: "white" }}>M</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={COLORS.pink}
                  onPress={() => {
                    if (length <= 31) {
                      Alert.alert(
                        "You haven't logged enough to generate this graph!"
                      );
                    } else {
                      setScrollViewEnabled(true);
                      setLimit(length);
                      retrieveDataWeek();
                    }
                  }}
                  style={styles.graphRangeStyleSelected}
                >
                  <Text style={{ color: "white" }}>Y</Text>
                </TouchableHighlight>
              </View>
            )}
          </View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <ScrollView
              horizontal={scrollViewEnabled}
              scrollEnabled={scrollViewEnabled}
            >
              <LineChart
                data={{
                  labels: Array.from(colorMap.keys()).reverse(),
                  datasets: [
                    {
                      data: Array.from(colorMap.values()).reverse(),
                    },
                  ],
                }}
                width={Dimensions.get("window").width * 0.125 * graphSize}
                height={220}
                chartConfig={{
                  backgroundColor: COLORS.darkBlue,
                  backgroundGradientFrom: COLORS.darkBlue,
                  backgroundGradientTo: COLORS.darkBlue,
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,

                  propsForDots: {
                    r: "6",
                    strokeWidth: "1",
                    stroke: "white",
                  },
                }}
                getDotColor={(value: any, index: any) => valueToColor(value)}
                bezier
                fromZero
                withVerticalLines={false}
                style={{
                  marginVertical: 8,
                }}
              />
            </ScrollView>
            <LinearGradient
              start={[0, 1]}
              end={[1, 0]}
              colors={["#ff0000", "#ffff00", highestColor]}
              style={styles.linearGradient}
            ></LinearGradient>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
  },

  textStyle: {
    fontFamily: "HindSiliguri_400Regular",
    color: COLORS.darkBlue,
  },
  graphContainer: {
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
    marginVertical: 10,
  },
  graphRangeStyle: {
    marginHorizontal: 2,
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: COLORS.darkBlue,
  },
  graphRangeStyleSelected: {
    marginHorizontal: 2,
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: COLORS.pink,
  },
  linearGradient: {
    position: "absolute",
    height: 170,
    aspectRatio: 1 / 30,
    top: 20,
    left: "-3rem",
    borderRadius: 3,
    overflow: "hidden",
  },
});
