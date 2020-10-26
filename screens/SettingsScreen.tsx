import * as React from "react";
import { ScrollView, TouchableOpacity } from "react-native";

import { AuthContext } from "../navigation/context";
import EStyleSheet from "react-native-extended-stylesheet";
import MyHeader from "../components/MyHeader";
import { Text, View } from "../components/Themed";
import { COLORS } from "../assets/COLORS";
import firebase from "firebase";
import { Feather } from "@expo/vector-icons";

const SettingsScreen = (props: { navigation: any }) => {
  const authContext = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <MyHeader navigation={props.navigation} />
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containerTop}>
          <Text style={styles.headerStyle}> Settings </Text>
        </View>
        <View style={styles.containerLog}>
          <View style={styles.spacing}></View>
          <TouchableOpacity
            style={styles.resource}
            onPress={() => {
              authContext.signOut();
            }}
          >
            <Feather color={COLORS.beige} name="log-out" size={50} />
            <Text style={styles.logOffText}> Sign Out </Text>
          </TouchableOpacity>
          <View style={styles.spacing}></View>
          <View style={styles.resource}></View>
          <View style={styles.spacing}></View>
          <View style={styles.resource}></View>
          <View style={styles.spacing}></View>
          <View style={styles.resource}></View>
          <View style={styles.spacing}></View>
          <View style={styles.resource}></View>
          <View style={styles.spacing}></View>
          <View style={styles.resource}></View>
          <View style={styles.spacing}></View>
          <View style={styles.resource}></View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = EStyleSheet.create({
  resource: {
    width: "100%",
    aspectRatio: 7 / 2,
    backgroundColor: COLORS.darkBlueAccent,
    borderRadius: 10,
    flexDirection: "row",
    padding: "5rem",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  spacing: {
    padding: "5rem",
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.beige,
    alignItems: "center",
  },
  scrollContainer: {
    paddingHorizontal: "8rem",
  },
  containerLog: {
    width: "100%",
    flexDirection: "column",
    backgroundColor: COLORS.darkBlue,
    borderRadius: 10,
    padding: "10rem",
  },
  logOffText: {
    color: COLORS.beige,
    fontFamily: "HindSiliguri_600SemiBold",
    fontSize: "30rem",
  },
  headerStyle: {
    color: COLORS.darkBlue,
    fontFamily: "HindSiliguri_600SemiBold",
    fontSize: "40rem",
  },
  containerTop: {
    width: "100%",
    aspectRatio: 4 / 1,
    flexDirection: "row",
    backgroundColor: "transparent",
  },
});
