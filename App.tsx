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

// import {  }​​​​​​​​​ from "react-native";
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

// TODO: Pressing back in the root tab crashes the app! I am not sure the arrow
// should even be there.
export default function App() {
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
