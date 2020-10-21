import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { View, LogBox } from "react-native";
import {
  useFonts,
  HindSiliguri_700Bold,
  HindSiliguri_400Regular,
  HindSiliguri_300Light,
  HindSiliguri_600SemiBold,
  HindSiliguri_500Medium,
} from "@expo-google-fonts/hind-siliguri";
import { AppLoading } from "expo";
import * as Application from "expo-application";
import * as firebase from "firebase";
import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";

// import { LogBox }​​​​​​​​​ from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const firebaseConfig = {
  apiKey: "AIzaSyAdmZhF_Qr8-5hLmVXtmq013CLnOpkG6Cc",
  authDomain: "project-amiga-370.firebaseapp.com",
  databaseURL: "https://project-amiga-370.firebaseio.com",
  projectId: "project-amiga-370",
  storageBucket: "project-amiga-370.appspot.com",
  appId:
    "159429589027-ftghqpo7042lo7miv41eucuvboc09mh6.apps.googleusercontent.com",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

console.log("application id: " + Application.applicationId);

// TODO: Pressing back in the root tab crashes the app! I am not sure the arrow
// should even be there.
export default function App() {
  const entireScreenWidth = Dimensions.get("window").width;
  EStyleSheet.build({
    $rem: entireScreenWidth / 380,
  });
  
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  
  let [fontsLoaded] = useFonts({
    HindSiliguri_700Bold,
    HindSiliguri_400Regular,
    HindSiliguri_300Light,
    HindSiliguri_600SemiBold,
    HindSiliguri_500Medium,
  });

  if (!fontsLoaded || !isLoadingComplete) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
