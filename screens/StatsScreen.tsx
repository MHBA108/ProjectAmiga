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

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import Clock from "../components/Clock";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function StatsScreen() {
  return (
    <ScrollView>
      <View>
        <SafeAreaView style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: windowWidth * 0.9,
              marginBottom: windowHeight * 0.01,
            }}
          >
            <Avatar
              size="medium"
              rounded
              title="MT"
              onPress={() => console.log("Works!")}
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
              width: windowWidth * 0.95,
            }}
          >
            <View style={styles.statsStyle}>
              <Text style={{ color: "#464D77" }}> Leaderboard Position: 1</Text>
            </View>
            <View style={styles.statsStyle}>
              <Text style={{ color: "#464D77" }}> Longest Log Streak: 23</Text>
            </View>
          </View>
          <View style={styles.graphContainer}>
            <View style={styles.graphHeaderStyle}>
              <View style={{ backgroundColor: "#464D77" }}>
                <Text
                  style={{
                    color: "white",
                    backgroundColor: "#464D77",
                    fontSize: 25,
                  }}
                >
                  Mood Chart
                </Text>
              </View>
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
            <View style={{justifyContent: "center", alignItems: "center"}}>
              <Text>Bezier Line Chart</Text>
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
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                      ],
                    },
                  ],
                }}
                width={Dimensions.get("window").width * .85} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#fb8c00",
                  backgroundGradientTo: "#ffa726",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726",
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
        </SafeAreaView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  statsStyle: {
    backgroundColor: "#FBD1A2",
    width: windowWidth * 0.45,
    borderRadius: 10,
    padding: 10,
  },

  graphRangeStyle: {
    marginHorizontal: 2,
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: "#464D77",
  },

  graphContainer: {
    justifyContent: "space-between",
    width: windowWidth * 0.95,
    backgroundColor: "#464D77",
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 10,
    borderRadius: 10,
  },

  graphHeaderStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: windowWidth * 0.88,
    backgroundColor: "#464D77",
    // paddingHorizontal: 15,
    // paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
});
