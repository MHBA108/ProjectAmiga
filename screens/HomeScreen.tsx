import * as React from "react";
import {
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  SafeAreaView,
  Platform,
} from "react-native";
import { AuthContext } from "../navigation/context";
import { Text, View } from "../components/Themed";
import Clock from "../components/Clock";
import Calendar from "../components/Calendar";
import CreateLog from "../components/CreateLog";
import TodoList from "../components/TodoList";
import firebase, { FirebaseError } from "firebase";
import MyHeader from "../components/MyHeader";
import { COLORS } from "../assets/COLORS";

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
            <CreateLog sliderValue={50} noteText="" />
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
  },
  scrollContainer: {
    paddingHorizontal: "15rem",
  },
  textGreeting: {
    paddingTop: "25rem",
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
