import { Feather } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import AppsandDevicesScreen from "../screens/Apps&DevicesScreen";
import CloseContactsScreen from "../screens/CloseContactsScreen";
import ContactUsScreen from "../screens/ContactUsScreen";
import FeedScreen from "../screens/FeedScreen";
import LoginScreen from "../screens/LoginScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import { AuthContext } from "./context";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setIsSignedIn(true);
      },
      signOut: () => {
        firebase.auth().signOut();
        setIsSignedIn(false);
      },
    };
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        {/* TODO: Probably swap out isSignedIn for user token or something? */}
        <RootNavigator isSignedIn={isSignedIn} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const RootStack = createStackNavigator<RootStackParamList>();
function RootNavigator({ isSignedIn }: { isSignedIn: boolean }) {
  if (!isSignedIn) {
    return (
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="LoginScreen" component={LoginScreen} />
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
      </RootStack.Navigator>
    );
  } else {
    return <HamburgerDrawer />;
  }
}

const Drawer = createDrawerNavigator();

function HamburgerDrawer() {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        inactiveTintColor: "#F2E9E3",
        activeTintColor: "#F2E9E3",
        inactiveBackgroundColor: "#555E90",
        activeBackgroundColor: "#8088B5",
        itemStyle: { marginVertical: 5 },
      }}
      drawerStyle={{
        backgroundColor: "#464D77",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Feather name="home" size={24} color={"#F2E9E3"} />
          ),
        }}
      />
      <Drawer.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Feather name="list" size={24} color={"#F2E9E3"} />
          ),
        }}
      />
      <Drawer.Screen
        name="Close Contacts"
        component={CloseContactsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Feather name="users" size={24} color={"#F2E9E3"} />
          ),
        }}
      />
      <Drawer.Screen
        name="Apps and Devices"
        component={AppsandDevicesScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Feather name="smartphone" size={24} color={"#F2E9E3"} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Feather name="settings" size={24} color={"#F2E9E3"} />
          ),
        }}
      />
      <Drawer.Screen
        name="Contact Us"
        component={ContactUsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Feather name="book-open" size={24} color={"#F2E9E3"} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
