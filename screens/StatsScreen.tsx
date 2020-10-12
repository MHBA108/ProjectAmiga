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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: windowWidth * 0.95,
              backgroundColor: "#464D77",
              paddingHorizontal: 15,
              paddingVertical: 10,
              margin: 10,
              borderRadius: 10,
            }}
          >
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
});
