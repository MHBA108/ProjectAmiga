import React, { Component, useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import LogItem from "./LogItem";
import { LogData, Log } from "../types";
import { COLORS } from "../assets/COLORS";
import firebase, { firestore } from "firebase";
import moment, { Moment } from "moment";
import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

var valueToColor = require("../assets/ValueToColor");
let lastDoc = 0;
// let documentData : firestore.DocumentData;

export default function LogList() {
  const [documentData, setDocumentData] = useState<firestore.DocumentData[]>(
    []
  );
  const [limit, setLimit] = useState(9);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState(firebase.auth().currentUser);

  useFocusEffect(() => {
    async function getData() {
      try {
        // Cloud Firestore: Initial Query
        // if (this.state.lastVisible == null){
        if (!loading) await retrieveData();
        // }
      } catch (error) {
        console.log(error);
      }
    }
    lastDoc = -1;
    getData();
  });

  // Retrieve Data
  async function retrieveData() {
    try {
      // Set State: Loading
      setLoading(true);
      console.log("Retrieving Data");
      // Cloud Firestore: Query
      let initialQuery = await firestore()
        .collection("users")
        .doc(user?.uid)
        .collection("userLogs")
        .orderBy("timestamp", "desc")
        .limit(limit);
      // Cloud Firestore: Query Snapshot
      let documentSnapshots = await initialQuery.get();
      // Cloud Firestore: Document Data
      let documentData = documentSnapshots.docs.map((document) =>
        document.data()
      );
      console.log("retrieve data length " + documentData.length);
      lastDoc = documentData.length;
      if (lastDoc != 0) {
        // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
        let lastDocVisible = documentData[documentData.length - 1].id;
        // Set State
        setDocumentData(documentData);
        setLastVisible: lastDocVisible;
      }
      setLoading: false;
    } catch (error) {
      console.log(error);
    }
  }

  // Retrieve More
  async function retrieveMore() {
    if (!(lastDoc < 9)) {
      try {
        // Set State: Refreshing
        setRefreshing(true);
        console.log("Retrieving additional Data");
        // Cloud Firestore: Query (Additional Query)
        let additionalQuery: any = await firestore()
          .collection("users")
          .doc(user?.uid)
          .collection("userLogs")
          .orderBy("timestamp", "desc")
          .startAfter(lastVisible)
          .limit(limit);
        // Cloud Firestore: Query Snapshot
        let documentSnapshots = await additionalQuery.get();
        // Cloud Firestore: Document Data
        let docData = documentSnapshots.docs.map(
          (document: firestore.DocumentData) => document.data()
        );
        console.log("retrievemore data length " + docData.length);
        lastDoc = docData.length;
        // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
        let lastDocVisible = docData[docData.length - 1].id;
        // Set State

        setDocumentData([...documentData, ...docData]);
        setLastVisible: lastDocVisible;
        setRefreshing: false;
      } catch (error) {
        console.log(error);
      }
    }
  }

  // // Render Header
  // renderHeader = () => {
  //   try {
  //     return <Text style={styles.headerText}>Items</Text>;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // Render Footer
  function renderFooter() {
    try {
      // Check If Loading
      if (loading) {
        return <ActivityIndicator />;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return lastDoc == 0 ? (
    <View style={styles.log}>
      <Text style={styles.text}>It's quiet... too quiet.</Text>
    </View>
  ) : (
    <View>
      {/* {this.state.documentData.map((item, key) => ( */}
      {/* <View key={key}> */}
      <View style={styles.spacing}></View>
      <FlatList
        data={documentData}
        renderItem={({ item }: { item: firestore.DocumentData }) => (
          console.log("hello?"),
          (
            <LogItem
              moodPercentile={item.moodPercentile}
              moodWords={item.moodWords}
              text={item.text}
              timestamp={item.timestamp}
            ></LogItem>
          )
        )}
        // keyExtractor={(item, index) => String(index)}
        // ListFooterComponent={renderFooter()}
        onEndReached={retrieveMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
      ></FlatList>
    </View>
  );
  //   ))}
  // </View>
}

const styles = EStyleSheet.create({
  spacing: {
    padding: "5rem",
    backgroundColor: "transparent",
  },
  log: {
    width: "100%",
    aspectRatio: 5 / 2,
    backgroundColor: "#4E5E85",
    borderRadius: 10,
    flexDirection: "column",
    padding: "5rem",
    justifyContent: "space-around",
  },
  text: {
    color: COLORS.beige,
    fontSize: "20rem",
    textAlign: "center",
    fontFamily: "HindSiliguri_300Light",
  },
  headerText: {
    fontFamily: "System",
    fontSize: 36,
    fontWeight: "600",
    color: "#000",
    marginLeft: 12,
    marginBottom: 12,
  },
});
