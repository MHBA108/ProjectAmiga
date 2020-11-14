import React, { useEffect, useState } from "react";
import {
  View,
  Platform,
  Dimensions,
  Text,
  TouchableHighlight,
  Alert,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { COLORS } from "../assets/COLORS";
import moment from "moment";
import firebase, { firestore } from "firebase";
import EStyleSheet from "react-native-extended-stylesheet";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";
const valueToColor = require("../assets/ValueToColor");

export default function MoodChart() {
  const [user, setUser] = useState(firebase.auth().currentUser);
  const [limit, setLimit] = useState(7);
  const [colorMap, setColorMap] = useState(new Map());
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = React.useState<firestore.DocumentData[]>([]);

  const [arrayOfColors, setarrayOfColors] = useState(new Array());

  async function retrieveDataWeek() {
    let documentData: firestore.DocumentData[] = [];
    try {
      const tempMap = new Map();
      const tempArray = new Array();
      console.log("Retrieving Data in Mood Chart");
      setLoading(true);
      let initialQuery = await firestore()
        .collection("users")
        .doc(user?.uid)
        .collection("userLogs")
        .orderBy("timestamp", "desc")
        .limit(limit);
      let documentSnapshots = await initialQuery.get();
      let documentData = documentSnapshots.docs.map((document) =>
        document.data()
      );
      console.log("retrieve data length " + documentData.length);
      documentData.map((item: any) => {
        var dateString = moment(item.timestamp).format("M/D");
        tempMap.set(dateString, item.moodPercentile);
        tempArray.push(valueToColor(item.moodPercentile));
      });
      setarrayOfColors(tempArray.reverse());
      console.log("colors for points: " + tempArray);
      setLoading(false);
      setColorMap(tempMap);
    } catch (error) {
      console.log(error);
    }
    return documentData;
  }

  useFocusEffect(
    React.useCallback(() => {
      let isLoading = true;
      async function retrieveData() {
        try {
          console.log("Loading Logs: " + isLoading);
          const data = await retrieveDataWeek();
          if (isLoading) {
            setLogs(data);
          }
        } catch (error) {
          console.log(error);
        }
      }
      retrieveData();
    }, [])
  );

  React.useEffect(() => {});

  return (
    <View style={styles.graphContainer}>
      {Array.from(colorMap.keys()).length == 0 ? (
        <View>
          <Text
            style={{
              alignSelf: "center",
              color: "white",
              fontFamily: "HindSiliguri_600SemiBold",
              fontSize: 18,
            }}
          >
            Calculating your data...
          </Text>
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

            {/* 
            //TODO add button functionality
            <View
              style={{
                flexDirection: "row",
                borderRadius: 10,
                padding: 3,
                backgroundColor: "white",
              }}
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
            </View> */}
          </View>
          <View
            style={{
              alignItems: "center",
            }}
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
              width={Dimensions.get("window").width * 0.9} // from react-native
              height={220}
              chartConfig={{
                backgroundColor: COLORS.darkBlue,
                backgroundGradientFrom: COLORS.darkBlue,
                backgroundGradientTo: COLORS.darkBlue,
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
              fromZero
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
            <LinearGradient
              start={[0, 1]}
              end={[1, 0]}
              colors={["#ff0000", "#ffff00", "#00ff00"]}
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
  linearGradient: {
    position: "absolute",
    height: 190,
    aspectRatio: 1 / 30,
    top: 0,
    left: "10rem",
    borderRadius: 3,
    overflow: "hidden",
  },
});
