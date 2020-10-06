import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import CalendarScreen from '../screens/CalendarScreen';
import EditScreen from '../screens/EditScreen';
import StatsScreen from '../screens/StatsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { BottomTabParamList, CalendarParamList, EditParamList, StatsParamList, SettingsParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Calendar"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Calendar"
        component={CalendarNavigator}
        options={{
          tabBarIcon: ({ color }) => <Feather name="calendar" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Edit"
        component={EditNavigator}
        options={{
          tabBarIcon: ({ color }) => <Feather name="edit" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Stats"
        component={StatsNavigator}
        options={{
          tabBarIcon: ({ color }) => <Feather name="bar-chart" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ color }) => <Feather name="settings" size={24} color={color} />,
        }}
      />
    </BottomTab.Navigator >
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const CalendarStack = createStackNavigator<CalendarParamList>();

function CalendarNavigator() {
  return (
    <CalendarStack.Navigator screenOptions={{ headerShown: false }}>
      <CalendarStack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
      />
    </CalendarStack.Navigator>
  );
}

const EditStack = createStackNavigator<EditParamList>();

function EditNavigator() {
  return (
    <EditStack.Navigator screenOptions={{ headerShown: false }}>
      <EditStack.Screen
        name="EditScreen"
        component={EditScreen}
      />
    </EditStack.Navigator>
  );
}

const StatsStack = createStackNavigator<StatsParamList>();

function StatsNavigator() {
  return (
    <StatsStack.Navigator screenOptions={{ headerShown: false }}>
      <StatsStack.Screen
        name="StatsScreen"
        component={StatsScreen}
        options={{ headerTitle: 'Tab Three Title' }}
      />
    </StatsStack.Navigator>
  );
}

const SettingsStack = createStackNavigator<SettingsParamList>();

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerTitle: 'Tab Four Title' }}
      />
    </SettingsStack.Navigator>
  );
}
