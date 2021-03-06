import { Feather } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import { COLORS } from "../assets/COLORS";
import FriendsScreen from "../screens/FriendsScreen";
import ContactUsScreen from "../screens/ContactUsScreen";
import AchievementsScreen from "../screens/AchievementsScreen";
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
      avatar: "",
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
        inactiveTintColor: COLORS.beige,
        activeTintColor: COLORS.beige,
        inactiveBackgroundColor: "#555E90",
        activeBackgroundColor: "#8088B5",
        itemStyle: { marginVertical: 5 },
      }}
      drawerStyle={{
        backgroundColor: COLORS.darkBlue,
      }}
    >
      <Drawer.Screen
        name="Back"
        component={BottomTabNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Feather name="arrow-left" size={24} color={COLORS.beige} />
          ),
        }}
      />
      <Drawer.Screen
        name="Achievements"
        component={AchievementsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Feather name="award" size={24} color={COLORS.beige} />
          ),
        }}
      />
      <Drawer.Screen
        name="Friends"
        component={FriendsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Feather name="users" size={24} color={COLORS.beige} />
          ),
        }}
      />
      <Drawer.Screen
        name="Contact Us"
        component={ContactUsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Feather name="book-open" size={24} color={COLORS.beige} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
