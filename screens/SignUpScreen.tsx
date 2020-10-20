import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import "firebase/firestore";
import firebase from "firebase";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function SignUpScreen() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  function onLoginSuccess(props: any) {
    // TODO: Sign the user in instead of kicking them back to the login screen
    console.log("successfully made user!");
    Alert.alert("Account Created!");
    // The only way to get to the SignUpScreen is from the LoginScreen
    navigation.goBack();
  }

  function onLoginFailure(errorMessage: string) {
    setErrorMessage(errorMessage);
    Alert.alert(errorMessage);
  }

  async function createUserWithEmail() {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(result){
        return result.user?.updateProfile({
          displayName: displayName,
        })
      })
      .then(onLoginSuccess)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        onLoginFailure(errorMessage);
      });
  }

  return (
    // TODO: Add styling from LoginScreen
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#B1B1B1"
        returnKeyType="next"
        textContentType="name"
        value={displayName}
        onChangeText={(displayName) => setDisplayName(displayName)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#B1B1B1"
        returnKeyType="next"
        keyboardType="email-address"
        textContentType="emailAddress"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#B1B1B1"
        returnKeyType="done"
        textContentType="newPassword"
        secureTextEntry={true}
        value={password}
        onChangeText={(password) => setPassword(password)}
      />

      <TouchableOpacity
        style={{ width: "86%", marginTop: 10 }}
        onPress={() => createUserWithEmail()}
      >
        <Text>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: 10 }}>
        <Text
          style={{ fontWeight: "200", fontSize: 17, textAlign: "center" }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          Already have an account?
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    borderColor: "#707070",
    borderBottomWidth: 1,
    paddingBottom: 1.5,
    marginTop: 25.5,
  },
  inputView: {
    width: "69%",
    backgroundColor: "#FBD1A2",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "#464D77",
  },
});
