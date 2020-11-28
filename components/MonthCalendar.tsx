import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { COLORS } from "../assets/COLORS";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import firebase, { firestore } from "firebase";
import { Object } from "realm";
import { useFocusEffect } from "@react-navigation/native";
var Color = require("color");

const valueToColor = require("../assets/ValueToColor");
const colorMap = new Map();

export default function MonthCalendar() {
  const [user, setUser] = useState(firebase.auth().currentUser);
  const [limit, setLimit] = useState(9);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = React.useState<firestore.DocumentData[]>([]);
  const [markedDates, setMarkedDates] = useState({});

  async function retrieveData() {
    let documentData: firestore.DocumentData[] = [];
    try {
      const tempMap = new Map();
      const tempMarkedDates = {};
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
      documentData.map((item: any) => {
        var dateString = moment(item.timestamp);
        tempMap.set(dateString, item.moodPercentile);
      });

      tempMap.forEach((value, key) => {
        let date = moment(key).format("YYYY-MM-DD");
        var curColor = Color(valueToColor(value));
        tempMarkedDates[date] = {
          customStyles: {
            container: {
              //lightens all the background color of calendar dates because the red gets difficult to read
              backgroundColor: curColor.fade(0.3).string(),
              ...Platform.select({
                ios: {
                  top: 2,
                },
                android: {
                  top: 0,
                },
              }),
            },
            text: {
              color: "black",
              fontFamily: "HindSiliguri_600SemiBold",
              ...Platform.select({
                ios: {
                  bottom: 2,
                },
                android: {
                  bottom: 0,
                },
              }),
            },
          },
        };
      });
      setMarkedDates(tempMarkedDates);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    return documentData;
  }
  useFocusEffect(
    React.useCallback(() => {
      let isLoading = true;
      async function retrieve() {
        try {
          const data = await retrieveData();
          if (isLoading) {
            setLogs(data);
          }
        } catch (error) {
          console.log(error);
        }
      }
      retrieve();
      return () => (isLoading = false);
    }, [])
  );

  React.useEffect(() => {});

  return (
    <View style={styles.container}>
      {}
      <Calendar
        enableSwipeMonths={true}
        markingType={"custom"}
        onDayPress={(day: any) => {
          console.log("selected day", day);
        }}
        markedDates={markedDates}
        theme={{
          arrowColor: COLORS.darkBlue,
          monthTextColor: COLORS.darkBlue,
          textDayFontSize: 16,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 14,
          textSectionTitleColor: COLORS.lightBlue,
          todayTextColor: "black",
          textDayFontFamily: "HindSiliguri_400Regular",
          textMonthFontFamily: "HindSiliguri_600SemiBold",
          textDayHeaderFontFamily: "HindSiliguri_400Regular",
        }}
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
