import * as React from "react";
import { ScrollView, StatusBar } from "react-native";

import EStyleSheet from "react-native-extended-stylesheet";
import MyHeader from "../components/MyHeader";
import { Text, View } from "../components/Themed";
import ContactUsInfo from "../components/ContactUsInfo";
import { COLORS } from "../assets/COLORS";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    marginTop: StatusBar.currentHeight,
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
  usernameStyle: {
    color: COLORS.darkBlue,
    fontFamily: "HindSiliguri_700Bold",
    fontSize: "30rem",
  },
  containerTop: {
    width: "100%",
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
