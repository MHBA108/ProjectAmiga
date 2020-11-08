import React, { Component, useEffect, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { COLORS } from "../assets/COLORS";
import moment from "moment";
import firebase, { firestore } from "firebase";
import { useFocusEffect } from "@react-navigation/native";
const valueToColor = require("../assets/ValueToColor");

export default function Calendar() {
  const [user, setUser] = useState(firebase.auth().currentUser);
  const [limit, setLimit] = useState(9);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = React.useState<firestore.DocumentData[]>([]);
  const [customDatesStyles, setCustomDatesStyles] = useState(new Array());

  //TODO
  //implement rerendering of this component when a log is saved

  async function retrieveData() {
    let documentData: firestore.DocumentData[] = [];
    try {
      const tempMap = new Map();
      const tempCustomDatesStyles = new Array();
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
        var dateString = moment(item.timestamp);
        tempMap.set(dateString, item.moodPercentile);
      });
      console.log(tempMap);
      console.log("tempmap size:" + tempMap.size);
      tempMap.forEach((value, key) => {
        tempCustomDatesStyles.push({
          startDate: key,
          dateContainerStyle: {
            borderWidth: 4,
            borderColor: valueToColor(value),
          },
        });
      });
      console.log("length!!!: " + tempCustomDatesStyles.length);
      setCustomDatesStyles(tempCustomDatesStyles);
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
          console.log("Loading Logs: " + isLoading);
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
      <CalendarStrip
        scrollable={true}
        startingDate={moment().add(1, "days").toDate()}
        maxDate={moment().add(14, "days").toDate()}
        minDate={moment().subtract(14, "days").toDate()}
        calendarAnimation={{ type: "parallel", duration: 20 }}
        daySelectionAnimation={{
          type: "border",
          duration: 200,
        }}
        calendarHeaderStyle={{
          fontSize: 20,
          marginBottom: 10,
          color: COLORS.darkBlue,
        }}
        renderColors
        customDatesStyles={customDatesStyles}
        style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
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
