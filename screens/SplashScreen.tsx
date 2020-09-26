import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animation from 'lottie-react-native';
import splash from './assets/splash.json';

export default class SplashScreen extends React.Component {
  componentDidMount() {
    this.animation.play();
  }

  render() {
    return (
      <View style={styles.animationContainer}>
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
    );
  }
}

const styles = StyleSheet.create({
  SplashScreen_RootView:
  {
  justifyContent: 'center', flex:1, 
  backgroundColor: '#6699CC',
  margin: 20,
  position: 'absolute', width: '100%',
  height: '100%',
  },
  SplashScreen_ChildView:
  {
  justifyContent: 'center', alignItems: 'center', backgroundColor: '#6699CC',
  flex:1,
  },
});
