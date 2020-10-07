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
      initialRouteName="Calendar"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Calendar"
        component={CalendarNavigator}
        options={{
          tabBarIcon: ({ color }) => <CalendarIcon/>,
        }}
      />
      <BottomTab.Screen
        name="Edit"
        component={EditNavigator}
        options={{
          tabBarIcon: ({ color }) => <HomePencilIcon/>,
        }}
      />
      <BottomTab.Screen
        name="Stats"
        component={StatsNavigator}
        options={{
          tabBarIcon: ({ color }) => <StatsIcon/>,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ color }) => <SettingsIcon/>,
        }}
      />
    </BottomTab.Navigator >
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const CalendarStack = createStackNavigator<CalendarParamList>();

function CalendarNavigator() {
  return (
    <CalendarStack.Navigator>
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
    <EditStack.Navigator>
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
    <StatsStack.Navigator>
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
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerTitle: 'Tab Four Title' }}
      />
    </SettingsStack.Navigator>
  );
}
