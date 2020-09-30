import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { useNavigation } from '@react-navigation/native';


export default function LoginScreen() {

  const [state, setState] = React.useState({ isLoggedIn: false });
  const navigation = useNavigation();

  // TODO: Pass the LogInResult as a Navigation parameter
  async function signInWithGoogle(): Promise<Google.LogInResult> {
    const result = await Google.logInAsync({
      androidClientId: "778316018433-r6fk17in0n3olu8num4dffoqab2bc82n.apps.googleusercontent.com",
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      console.log(result.user);
      setState({ isLoggedIn: true });
      return result;
    } else {
      return { type: 'cancel' };
    }

  }

  if (!state.isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>AMIGA</Text>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText} onPress={signInWithGoogle}>LOGIN WITH GOOGLE</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    navigation.navigate("Root");
    return null;
  }

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
