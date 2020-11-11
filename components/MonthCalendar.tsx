import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { COLORS } from "../assets/COLORS";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import firebase, { firestore } from "firebase";
import { Object } from "realm";
import { useFocusEffect } from "@react-navigation/native";
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
      console.log("Retrieving Data in Month Calendar");
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
        tempMarkedDates[date] = {
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
    }, [])
  );

  React.useEffect(() => {});

  return (
    <View style={styles.container}>
      {}
      <Calendar
        displayLoadingIndicator
        markingType={"custom"}
        onDayPress={(day: any) => {
          console.log("selected day", day);
        }}
        markedDates={markedDates}
        theme={{
          arrowColor: COLORS.darkBlue,
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
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
