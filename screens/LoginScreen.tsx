import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { AuthContext } from "../navigation/context"


export default function LoginScreen() {

  const authContext = React.useContext(AuthContext);
  const config: Google.GoogleLogInConfig = {
    androidClientId: "778316018433-r6fk17in0n3olu8num4dffoqab2bc82n.apps.googleusercontent.com",
    iosClientId: "778316018433-g734kgicr0bdmh9iq24r354v3dki37ei.apps.googleusercontent.com",
    scopes: ['profile'],
  }


  // TODO: Pass the LogInResult to the AuthContext
  async function signInWithGoogle(): Promise<Google.LogInResult> {
    const result = await Google.logInAsync(config);

    if (result.type === 'success') {
      console.log(result.user);
      authContext.signIn();
    }
    return result;
  }

  // added temporary login for IOS button
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>AMIGA</Text>
      <TouchableOpacity style={styles.loginBtn} onPress={signInWithGoogle}>
        <Text style={styles.loginText} >LOGIN WITH GOOGLE</Text>
      </TouchableOpacity>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#464D77',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#F9A2A2",
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    backgroundColor: "#6699CC",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
  },
  forgot: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#F9A2A2",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "white"
  }
});
