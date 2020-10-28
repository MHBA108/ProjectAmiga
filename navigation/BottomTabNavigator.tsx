import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet, Image } from "react-native";
import { COLORS } from "../assets/COLORS";
import HomeScreen from "../screens/HomeScreen";
import StatsScreen from "../screens/StatsScreen";
import ResourcesScreen from "../screens/ResourcesScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import {
  BottomTabParamList,
  HomeParamList,
  StatsParamList,
  ResourcesParamList,
  UserProfileParamList,
} from "../types";
import avatar from "../assets/images/avatars/male.png";
import EStyleSheet from "react-native-extended-stylesheet";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#FFFFFF",
        inactiveTintColor: COLORS.darkBlue,
        tabStyle: styles.tabBar,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Stats"
        component={StatsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="trending-up"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Resources"
        component={ResourcesNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="lightbulb-on"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="You"
        component={UserProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => (
                <Image
                    style={styles.avatarContainer}
                    resizeMode="contain"
                    source={avatar}
                />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

const StatsStack = createStackNavigator<StatsParamList>();

function StatsNavigator() {
  return (
    <StatsStack.Navigator screenOptions={{ headerShown: false }}>
      <StatsStack.Screen name="StatsScreen" component={StatsScreen} />
    </StatsStack.Navigator>
  );
}

const ResourcesStack = createStackNavigator<ResourcesParamList>();

function ResourcesNavigator() {
  return (
    <ResourcesStack.Navigator screenOptions={{ headerShown: false }}>
      <ResourcesStack.Screen
        name="ResourcesScreen"
        component={ResourcesScreen}
      />
    </ResourcesStack.Navigator>
  );
}

const UserProfileStack = createStackNavigator<UserProfileParamList>();

function UserProfileNavigator() {
  return (
    <UserProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <UserProfileStack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
      />
    </UserProfileStack.Navigator>
  );
}

const styles = EStyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.lightBlue,
    },
    avatarContainer: {
        height: "24rem",
        width: "24rem",
        alignSelf: "center",
        top:"2rem",
    },
});
