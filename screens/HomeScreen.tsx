import * as React from "react";
import {
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  StatusBar,
} from "react-native";
import { Text, View } from "../components/Themed";
import Clock from "../components/Clock";
import Calendar from "../components/Calendar";
import CreateLog from "../components/CreateLog";
import TodoList from "../components/TodoList";
import firebase, { firestore } from "firebase";
import MyHeader from "../components/MyHeader";
import { COLORS } from "../assets/COLORS";
import { SafeAreaView } from "react-native-safe-area-context";
import TodayEntry from "../components/TodayEntry";
import EStyleSheet from "react-native-extended-stylesheet";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";

const valueToColor = require("../assets/ValueToColor");

const HomeScreen = (props: { navigation: any }) => {
  //added a call back function that is called when the save button is pressed
  const callbackCreateLog = () => {
    retrieveData();
    renderLogComp();
    getLog();
  };

  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const [moodPercentile, setMoodPercentile] = React.useState(50);
  const [text, setText] = React.useState("");
  const [timestamp, setTimestamp] = React.useState("");
  const [moodWords, setMoodWords] = React.useState([]);
  const [lastLogTS, setlastLogTS] = React.useState("");
  const [limit, setLimit] = React.useState(9);
  const [loading, setLoading] = React.useState(false);
  const [logs, setLogs] = React.useState<firestore.DocumentData[]>([]);
  const [customDatesStyles, setCustomDatesStyles] = React.useState(new Array());

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user.displayName + " is logged in!");
        setUser(user);
      }
    });
  }, [user]);

  useFocusEffect(
    React.useCallback(() => {
      let refresh = true;
      async function getData() {
        try {
          if (refresh) {
            await getLog();
            await retrieveData();
          }
        } catch (error) {
          console.log(error);
        }
      }
      getData();
      return () => (refresh = false);
    }, [])
  );

  // Retrieve most recent log
  async function getLog() {
    console.log("Retrieving most recent log:");
    try {
      const initialQuery = await firestore()
        .collection("users")
        .doc(user?.uid)
        .collection("userLogs")
        .orderBy("timestamp", "desc")
        .limit(1);
      let snapshot = await initialQuery.get();
      let documentData = snapshot.docs.map((document) => document.data());
      const log = documentData[0];
      //console.log("log:", log);
      setMoodPercentile(log.moodPercentile);
      setTimestamp(log.timestamp);
      setText(log.text);
      setMoodWords(log.moodWords);

      setlastLogTS(log.timestamp);
      console.log(log);
      return log.timestamp;
    } catch (error) {
      console.log(error);
    }
  }
  async function retrieveData() {
    let documentData: firestore.DocumentData[] = [];
    try {
      const tempMap = new Map();
      const tempCustomDatesStyles = new Array();
      console.log("Retrieving Data in Home Screen");
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
      tempMap.forEach((value, key) => {
        tempCustomDatesStyles.push({
          startDate: key,
          dateContainerStyle: {
            borderWidth: 4,
            borderColor: valueToColor(value),
          },
        });
      });
      setCustomDatesStyles(tempCustomDatesStyles);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }

    return documentData;
  }
  function renderLogComp() {
    let hasLogged = false;

    if (timestamp === "") {
    } else {
      let lastLog = new Date(timestamp);
      let today = new Date(Date.now());
      let date = today.getDate();
      let month = today.getMonth();
      let year = today.getFullYear();

      if (lastLog.getDate() == date) {
        if (lastLog.getMonth() == month) {
          if (lastLog.getFullYear() == year) {
            hasLogged = true;
          }
        }
      }
    }
    if (hasLogged) {
      return (
        <TodayEntry
          moodPercentile={moodPercentile}
          text={text}
          timestamp={timestamp}
          moodWords={moodWords}
          homeCallback={callbackCreateLog}
        />
      );
    } else {
      return (
        //added this homeCallback prop to the CreateLog component
        <CreateLog
          sliderValue={50}
          noteText=""
          homeCallback={callbackCreateLog}
        />
      );
    }
  }
  function renderGreeting() {
    let timeOfDay = new Date(Date.now()).getHours();
    let Greeting;
    if (timeOfDay < 5) {
      Greeting = "Good evening";
    } else if (timeOfDay < 11) {
      Greeting = "Good morning";
    } else if (timeOfDay < 18) {
      Greeting = "Good afternoon";
    } else {
      Greeting = "Good evening";
    }

    if (user == null) {
      return Greeting + "!";
    } else {
      return Greeting + " " + user.displayName + "!";
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollContainer}
          >
            <Text style={styles.textGreeting}>{renderGreeting()}</Text>
            <Clock showDate={true} showTime={true} />
            <View style={styles.spacer}></View>
            {renderLogComp()}
            <Calendar customDatesStyles={customDatesStyles} />
            <TodoList />
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
      <MyHeader navigation={props.navigation} />
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.beige,
    marginTop: StatusBar.currentHeight,
  },
  scrollContainer: {
    paddingHorizontal: "15rem",
  },
  textGreeting: {
    color: COLORS.darkBlue,
    fontSize: "25rem",
    fontWeight: "bold",
    fontFamily: "HindSiliguri_700Bold",
    textAlign: "right",
  },
  spacer: {
    width: "100%",
    aspectRatio: 15 / 1,
    backgroundColor: "transparent",
  },
});
