import React from "react";
import {
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import "firebase/firestore";
import firebase from "firebase";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../assets/COLORS";
import EStyleSheet from "react-native-extended-stylesheet";

export default function SignUpScreen() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  function onLoginSuccess(props: any) {
    //TODO: Sign the user in instead of kicking them back to the login screen
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
      .then(function (result) {
        return result.user?.updateProfile({
          displayName: displayName,
        });
      })
      .then(onLoginSuccess)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        onLoginFailure(errorMessage);
      });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <View style={styles.topContainer}></View>
            <View style={styles.bottomContainer}>
              <View style={styles.inputs}>
                <View style={styles.inputView}>
                  <TextInput
                    placeholder="First Name"
                    returnKeyType="next"
                    textContentType="name"
                    value={displayName}
                    onChangeText={(displayName) => setDisplayName(displayName)}
                    style={styles.inputText}
                    placeholderTextColor={COLORS.darkBlue}
                  />
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    placeholder="Email"
                    returnKeyType="next"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                    style={styles.inputText}
                    placeholderTextColor={COLORS.darkBlue}
                  />
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    secureTextEntry //hides test input with *****
                    style={styles.inputText}
                    placeholderTextColor={COLORS.darkBlue}
                    placeholder="Password"
                    returnKeyType="done"
                    textContentType="newPassword"
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                  />
                </View>

                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={() => createUserWithEmail()}
                >
                  <Text style={styles.loginText}>SIGN UP</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.signUpContainer}>
                <Text
                  style={{
                    fontWeight: "200",
                    fontSize: 17,
                    textAlign: "center",
                    fontFamily: "HindSiliguri_300Light",
                    color: COLORS.darkBlue,
                  }}
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  Already have an account?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.lightBlue,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  inputs: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  topContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  bottomContainer: {
    flex: 2,
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  signUpContainer: {
    backgroundColor: "transparent",
    paddingBottom: "20rem",
  },
  logo: {
    width: "350rem",
    height: "350rem",
  },
  inputView: {
    backgroundColor: COLORS.yellow,
    width: "69%",
    borderRadius: 25,
    height: "50rem",
    marginBottom: "20rem",
    justifyContent: "center",
    paddingHorizontal: "20rem",
  },
  inputText: {
    color: COLORS.darkBlue,
    fontFamily: "HindSiliguri_400Regular",
  },
  loginBtn: {
    width: "69%",
    backgroundColor: COLORS.darkBlue,
    borderRadius: 25,
    height: "50rem",
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: COLORS.white,
    fontFamily: "HindSiliguri_700Bold",
    fontSize: "20rem",
  },
});
