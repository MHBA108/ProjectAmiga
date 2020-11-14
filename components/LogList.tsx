import React, { useState } from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import LogItem from "./LogItem";
import { COLORS } from "../assets/COLORS";
import firebase, { firestore } from "firebase";
import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

let lastDoc = 0;

export default function LogList(props: {
  userProfileCallback: Function;
  documentData: firestore.DocumentData[];
}) {
  const [limit, setLimit] = useState(11);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(firebase.auth().currentUser);

  useFocusEffect(React.useCallback(() => {}, [props.documentData]));
  React.useEffect(() => {}, [props.documentData]);

  const callbackUserProfile = () => {
    props.userProfileCallback();
  };

  return (
    <View>
      <View style={styles.spacing}></View>
      <FlatList
        data={props.documentData}
        renderItem={({ item }: { item: firestore.DocumentData }) => (
          console.log("render log: " + item.timestamp),
          (
            <View>
              <LogItem
                moodPercentile={item.moodPercentile}
                moodWords={item.moodWords}
                text={item.text}
                timestamp={item.timestamp}
                logListCallback={callbackUserProfile}
              />
              <View style={styles.spacing} />
            </View>
          )
        )}
        //onEndReached={retrieveMore}
        onEndReachedThreshold={0.5}
        // This requires more research
        // refreshing={refreshing}
      />
    </View>
  );
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
