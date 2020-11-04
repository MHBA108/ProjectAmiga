import * as React from "react";
import {
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  StatusBar,
} from "react-native";
import { AuthContext } from "../navigation/context";
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

function renderGreeting(user: firebase.User | null) {
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
// TODO: Return type firestore.DocumentData of the most recent log
// async function retrieveLastLog(user: firebase.User | null) {
//   try {
//     // Set State: Loading
//     console.log("Retrieving Log");
//     // Cloud Firestore: Query
//     let initialQuery = await firestore()
//       .collection("users")
//       .doc(user?.uid)
//       .collection("userLogs")
//       .orderBy("timestamp", "desc")
//       .limit(1);
//     // Cloud Firestore: Query Snapshot
//     let documentSnapshots = await initialQuery.get();
//     // Cloud Firestore: Document Data
//     let documentData = documentSnapshots.docs.map((document) =>
//       document.data()
//     );
//     let logData = documentData[0];
//     console.log(logData);
//     console.log(logData.timestamp);
//     return logData;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

// function renderLogComp(user: firebase.User | null) {
//   let hasLogged = false;
//   let logData = retrieveLastLog(user);
//   console.log("retrieved logData: " + logData);

//   //TODO handle if no logs?
//   if (logData === null) {
//     return <CreateLog sliderValue={50} noteText="" />;
//   }

//   let mostRecentDay = new Date(logData.timestamp);

//   let today = new Date(Date.now());
//   let date = today.getDate();
//   let month = today.getMonth();
//   let year = today.getFullYear();

//   if (mostRecentDay.getDate() == date) {
//     if (mostRecentDay.getMonth() == month) {
//       if (mostRecentDay.getFullYear() == year) {
//         hasLogged = true;
//       }
//     }
//   }

//   if (hasLogged) {
//     return (
//       <TodayEntry
//         moodPercentile={lastLog.moodPercentile}
//         text={lastLog.text}
//         timestamp={lastLog.timestamp}
//         moodWords={lastLog.moodWords}
//       />
//     );
//   } else {
//     return <CreateLog sliderValue={50} noteText="" />;
//   }
// }

// TODO: delete this function in favor of the commented out one above
function renderLogComp(user: firebase.User | null) {
  let hasLogged = false;
  let dummyTimestamp = "2020-11-04T23:52:59-04:00";
  let lastLog = new Date(dummyTimestamp);

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

  if (hasLogged) {
    return (
      <TodayEntry
        moodPercentile={12}
        text="I felt really sad today. I had a really bad dream and it ruined my day. I also failed my math quiz. It rained the whole day and I forgot my umbrella :("
        timestamp={dummyTimestamp}
        moodWords={["stressed", "sad"]}
      />
    );
  } else {
    return <CreateLog sliderValue={50} noteText="" />;
  }
}

const HomeScreen = (props: { navigation: any }) => {
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const authContext = React.useContext(AuthContext);
  // TODO:
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user.displayName + " is logged in!");
        setUser(user);
      }
    });
  });

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
            <Text style={styles.textGreeting}>{renderGreeting(user)}</Text>
            <Clock showDate={true} showTime={true} />
            <View style={styles.spacer}></View>
            {renderLogComp(user)}
            <Calendar />
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
