import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import CalendarScreen from '../screens/CalendarScreen';
import ResourceScreen from '../screens/ResourcesScreen';
import StatsScreen from '../screens/StatsScreen';
import MoreScreen from '../screens/MoreScreen';
import { BottomTabParamList, HomeParamList, StatsParamList, ResourcesParamList, MoreParamList } from '../types';
import CalendarIcon from '../components/icons/CalendarIcon';
import StatsIcon from '../components/icons/StatsIcon';
import SettingsIcon from '../components/icons/SettingsIcon';
import HomePencilIcon from '../components/icons/HomePencilIcon';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  // TODO: Find a way to remove the header
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <CalendarIcon/>,
        }}
      />
      <BottomTab.Screen
        name="Stats"
        component={StatsNavigator}
        options={{
          tabBarIcon: ({ color }) => <HomePencilIcon/>,
        }}
      />
      <BottomTab.Screen
        name="Resources"
        component={ResourcesNavigator}
        options={{
          tabBarIcon: ({ color }) => <StatsIcon/>,
        }}
      />
      <BottomTab.Screen
        name="More"
        component={MoreNavigator}
        options={{
          tabBarIcon: ({ color }) => <SettingsIcon/>,
        }}
      />
    </BottomTab.Navigator >
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const CalendarStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name="HomeScreen"
        component={CalendarScreen}
      />
    </CalendarStack.Navigator>
  );
}

const StatsStack = createStackNavigator<StatsParamList>();

function StatsNavigator() {
  return (
    <StatsStack.Navigator>
      <StatsStack.Screen
        name="StatsScreen"
        component={StatsScreen}
      />
    </StatsStack.Navigator>
  );
}

const ResourcesStack = createStackNavigator<ResourcesParamList>();

function ResourcesNavigator() {
  return (
    <ResourcesStack.Navigator>
      <ResourcesStack.Screen
        name="ResourcesScreen"
        component={ResourceScreen}
      />
    </ResourcesStack.Navigator>
  );
}

const MoreStack = createStackNavigator<MoreParamList>();

function MoreNavigator() {
  return (
    <MoreStack.Navigator>
      <MoreStack.Screen
        name="MoreScreen"
        component={MoreScreen}
      />
    </MoreStack.Navigator>
  );
}
