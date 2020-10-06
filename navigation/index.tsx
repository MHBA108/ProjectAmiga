import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { AuthContext } from "./context"
import LoginScreen from '../screens/LoginScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const authContext = React.useMemo(
    () => {
      return {
        signIn: () => {
          setIsSignedIn(true);
        },
        signOut: () => {
          setIsSignedIn(false);
        }
      }
    },
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
      </RootStack.Navigator>
    )
  } else {
    return (
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Root" component={BottomTabNavigator} />
        <RootStack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      </RootStack.Navigator>
    );
  }
}
