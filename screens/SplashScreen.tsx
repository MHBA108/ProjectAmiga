import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animation from 'lottie-react-native';
import splash from '../assets/images/splash.json';

export default class SplashScreen extends React.Component {
  componentDidMount() {
    this.animation.play();
  }

  render() {
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
