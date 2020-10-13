import * as React from "react";
import { StyleSheet, ScrollView, TextInput } from "react-native";

import { Text, View } from "../components/Themed";
import Clock from "../components/Clock";
import Calendar from "../components/Calendar";
import Slider from "@react-native-community/slider";
import CreateLog from "../components/CreateLog";
import TodoList from "../components/TodoList";

export default function HomeScreen() {
  const [value, onChangeText] = React.useState("Write note here ...");

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.todayStyle}>Welcome user_name!</Text>
        <Clock />
        <CreateLog sliderValue={50} noteText="" />
        <Calendar />
        <TodoList />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2E9E3",
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
    backgroundColor: "#6699CC",
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
    color: "#464D77",
    fontSize: 34,
    fontWeight: "bold",
    fontFamily: "HindSiliguri_700Bold",
    marginLeft: 10,
    marginTop: 20,
  },

  textStyle: {
    color: "white",
    backgroundColor: "#6699CC",
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
