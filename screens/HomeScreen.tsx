import * as React from "react";
import { ScrollView, SafeAreaView, Button } from "react-native";
import { AuthContext } from "../navigation/context";
import { Text, View } from "../components/Themed";
import Clock from "../components/Clock";
import Calendar from "../components/Calendar";
import CreateLog from "../components/CreateLog";
import TodoList from "../components/TodoList";
import firebase from "firebase";
import MyHeader from "../components/MyHeader";
import { COLORS } from "../assets/COLORS";
import { useNavigation } from "@react-navigation/native";

import EStyleSheet from "react-native-extended-stylesheet";

const HomeScreen = (props: { navigation: any }) => {
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const [value, onChangeText] = React.useState("Write note here ...");
  const authContext = React.useContext(AuthContext);
  const navigation = useNavigation();

  // TODO:
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user.displayName + " has logged in!");
        setUser(user);
      }
    });
  });

  return (
    <View style={styles.container}>
      <MyHeader navigation={props.navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        <Text style={styles.todayStyle}>
          {"Welcome"} {user?.displayName}!
        </Text>
        <Clock showDate={true} showTime={true} />
        <CreateLog sliderValue={50} noteText="" />
        <Calendar />
        <TodoList />
        <Text style={{ alignContent: "stretch" }}>
          {user == null ? "" : user.email}
        </Text>
        <Button
          title="Log Off"
          onPress={() => {
            authContext.signOut();
          }}
        />
      </ScrollView>
    </View>
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
    paddingHorizontal: "8rem",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },

  textCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.lightBlue,
    marginLeft: 10,
    marginRight: 10,
  },

  note: {
    height: 40,
    color: "#CCD0E1",
    marginLeft: 10,
    marginRight: 10,
  },

  todayStyle: {
    color: COLORS.darkBlue,
    fontSize: 34,
    fontWeight: "bold",
    fontFamily: "HindSiliguri_700Bold",
    marginLeft: 10,
  },

  textStyle: {
    color: "white",
    backgroundColor: COLORS.lightBlue,
    fontSize: 20,
  },

  questionStyle: {
    color: "white",
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
    textAlign: "center",
  },
});
