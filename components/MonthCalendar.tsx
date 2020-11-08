import React, { useState } from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import { COLORS } from "../assets/COLORS";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";
import firebase, { firestore } from "firebase";
const valueToColor = require("../assets/ValueToColor");

export default function MonthCalendar() {
  const [user, setUser] = useState(firebase.auth().currentUser);
  const [limit, setLimit] = useState(9);
  const [markedDates, setMarkedDates] = useState({
    customStyles: { container: {}, text: {} },
  });
  const [loading, setLoading] = useState(false);
  const [colorMap, setColorMap] = useState(new Map());
  const updateMap = (key: any, value: any) => {
    setColorMap(new Map(colorMap.set(key, value)));
  };

  async function retrieveData() {
    let documentData: firestore.DocumentData[] = [];
    try {
      console.log("Retrieving Data");
      setLoading(true);
      let initialQuery = await firestore()
        .collection("users")
        .doc(user?.uid)
        .collection("userLogs")
        .orderBy("timestamp", "desc");
      //.limit(limit);
      let documentSnapshots = await initialQuery.get();
      let documentData = documentSnapshots.docs.map((document) =>
        document.data()
      );
      console.log("retrieve data length " + documentData.length);
      documentData.map((item: any) => {
        var dateString = moment(item.timestamp).format("YYYY-MM-DD");
        updateMap(dateString, item.moodPercentile);
      });

      colorMap.forEach((value, key) => {
        markedDates[key] = {
          customStyles: {
            container: {
              backgroundColor: valueToColor(value),
            },
            text: {
              color: "black",
              fontWeight: "bold",
            },
          },
        };
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    return markedDates;
  }
  useFocusEffect(
    React.useCallback(() => {
      let isLoading = true;
      async function retrieve() {
        try {
          console.log("ONFOCUS- Loading Logs: " + isLoading);
          const data = await retrieveData();
          if (isLoading) {
            //console.log(data);
            setMarkedDates(data);
          }
        } catch (error) {
          console.log(error);
        }
      }
      retrieve();
    }, [])
  );

  React.useEffect(() => {});

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day: any) => {
          console.log("selected day: " + day.dateString);
        }}
        onMonthChange={(month: any) => {
          console.log("month changed", month);
        }}
        markingType={"custom"}
        markedDates={markedDates}
        theme={{
          arrowColor: COLORS.darkBlue,
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
        enableSwipeMonths={true}
        current={moment().format("YYYY-MM-DD")}
        displayLoadingIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 25,
    fontFamily: "HindSiliguri_400Regular",
    padding: 10,
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
});
