import * as React from "react";
import { StyleSheet } from "react-native";
import {
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
} from "react-native";

import EStyleSheet from "react-native-extended-stylesheet";
import MyHeader from "../components/MyHeader";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import ContactUsInfo from "../components/ContactUsInfo";
import { COLORS } from "../assets/COLORS";
import LottieView from "lottie-react-native";

const ContactUsScreen = (props: { navigation: any }) => {
  return (
    <SafeAreaView style={styles.container}>
      <MyHeader navigation={props.navigation} />
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containerTop}>
          <Text style={styles.usernameStyle}> Contact Us </Text>
        </View>
        <View style={styles.containerLog}>
          <ContactUsInfo />
        </View>
        <View style={styles.animation}>
          <LottieView
            source={require("../assets/images/ContactUs.json")}
            autoPlay
            loop
            style={{ height: 300 }}
          />
        </View>
      </ScrollView>
      <MyHeader navigation={props.navigation} />
    </SafeAreaView>
  );
};

export default ContactUsScreen;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.beige,
    alignItems: "center",
  },
  scrollContainer: {
    paddingHorizontal: "8rem",
    paddingTop: "20rem",
  },
  containerLog: {
    width: "100%",
    flexDirection: "column",
    backgroundColor: COLORS.darkBlue,
    borderRadius: 10,
    padding: "10rem",
  },
  usernameStyle: {
    color: COLORS.darkBlue,
    fontFamily: "HindSiliguri_600SemiBold",
    fontSize: "40rem",
  },
  containerTop: {
    width: "100%",
    aspectRatio: 5 / 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  animation: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: COLORS.beige,
  },
});
