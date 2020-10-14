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
import { Picker } from "@react-native-community/picker";
import Calendar from "../components/Calendar";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function StatsScreen(this: string) {
  const [language] = React.useState({
    language: "java",
  });
  return (
    <ScrollView style={{ backgroundColor: "#F2E9E3" }}>
      <View style={{ backgroundColor: "#F2E9E3" }}>
        <SafeAreaView style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "90%",
              marginBottom: windowHeight * 0.01,
              backgroundColor: "#F2E9E3",
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
              width: "95%",
              backgroundColor: "#F2E9E3",
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
                backgroundColor: "#464D77",
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
                width={Dimensions.get("window").width * 0.85} // from react-native
                height={220}
                // yAxisLabel="$"
                // yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "blue",
                  backgroundGradientFrom: "#464D77",
                  backgroundGradientTo: "#464D77",
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
                    stroke: "#464D77",
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

        </SafeAreaView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F2E9E3",
  },

  statsStyle: {
    backgroundColor: "#FBD1A2",
    width: "45%",
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
    width: "95%",
    backgroundColor: "#464D77",
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 10,
    borderRadius: 10,
  },

  graphHeaderStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "88%",
    backgroundColor: "#464D77",
    // paddingHorizontal: 15,
    // paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 10,
  },

  calendarStyle: {
    justifyContent: "center",
    width: "95%",
    backgroundColor: "#F2E9E3",
  },
});
