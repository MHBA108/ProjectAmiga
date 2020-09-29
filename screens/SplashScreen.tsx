import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animation from 'lottie-react-native';
import splash from '../assets/images/splash.json';
import { useNavigation } from '@react-navigation/native';
import {useEffect} from 'react';

export default function SplashScreen() {
  const isLoggedIn = false
  const navigation = useNavigation();

  useEffect(() => {
    this.animation.play()
    setTimeout(load, 2000) // temporary timer
    // load()
  }, []);

  // authentication and stuffs
  function load(){
    // TODO check if logged in
    if (isLoggedIn) {
      // TODO load anything necessary for home page
      navigation.navigate("Root")
    } else {
      navigation.navigate("LoginScreen")
    }
  }

  console.log('I\'m in splash')

  return (
    <View style={styles.SplashScreen_RootView}>
      <View style={styles.SplashScreen_ChildView}>
        <Animation
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            width: 200,
            height: 200
          }}
          loop={true}
          source={splash}
        />
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  SplashScreen_RootView:
  {
  justifyContent: 'center', flex:1, 
  backgroundColor: '#6699CC',
  padding: 20,
  position: 'absolute', width: '100%',
  height: '100%',
  },
  SplashScreen_ChildView:
  {
  justifyContent: 'center', alignItems: 'center', backgroundColor: '#6699CC',
  flex:1,
  },
});
