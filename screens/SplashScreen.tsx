import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

export default function SplashScreen() {
  const isLoggedIn = false; // temporary
  const navigation = useNavigation();

  // authentication and stuffs
  function load() {
    // TODO check if logged in
    if (isLoggedIn) {
      // TODO load anything necessary for home page
      navigation.navigate("Root");
    } else {
      navigation.navigate("LoginScreen");
    }
  }

  // skip playing animation for android!!!
  if (Platform.OS === "android") {
    load();
    return <View style={styles.animationContainer}></View>;
  }

  // animation
  useEffect(() => {
    this.animation.play();
    setTimeout(load, 2000); // temporary timer
    // load()
  }, []);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        ref={(animation) => {
          this.animation = animation;
        }}
        style={{
          width: 200,
          height: 200,
          backgroundColor: "#6699CC",
        }}
        loop={true}
        source={require("../assets/images/splash.json")}
    </View>
  );
}
const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#6699CC",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
