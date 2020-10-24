import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";
// import "firebase/firestore";
import React, { useState } from "react";
import {
  Image,
  Keyboard, KeyboardAvoidingView,
  Platform, StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback, View
} from "react-native";
import { COLORS } from "../assets/COLORS";
import { AuthContext } from "../navigation/context";

export default function LoginScreen(props: { navigation: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const authContext = React.useContext(AuthContext);
  const navigation = useNavigation();

  async function onLoginSuccess() {
    console.log("login success");
    const user = firebase.auth().currentUser;
    if (user){
      let document = await firebase.firestore().collection("users").doc(user.uid).get();
      if (!(document && document.exists)){
        const data = {
          avatar: "TODO: add default avatar path", // TODO: add default avatar path
          streak: 0,
        };
        firebase.firestore().collection("users").doc(user.uid).set(data)
      }
    }
    authContext.signIn();
  }

  function onLoginFailure(errorMessage: string) {
    setErrorMessage(errorMessage);
    console.log(errorMessage);
  }

  async function signInWithEmail() {
    console.log(email + "  " + password);
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(onLoginSuccess)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == "auth/weak-password") {
          onLoginFailure("Weak Password!");
        } else {
          onLoginFailure(errorMessage);
        }
      });
  }

  return (
    <KeyboardAvoidingView
      style = {styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require("../assets/images/splash.png")}
          />
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Email..."
              placeholderTextColor={COLORS.darkBlue}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              secureTextEntry //hides test input with *****
              style={styles.inputText}
              placeholder="Password..."
              placeholderTextColor={COLORS.darkBlue}
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => signInWithEmail()}
          >
            <Text style={styles.loginText}>LOGIN WITH EMAIL</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginTop: 10 }}>
            <Text
              style={{
                fontWeight: "200",
                fontSize: 17,
                textAlign: "center",
                color: COLORS.darkBlue,
              }}
              onPress={() => {
                navigation.navigate("SignUpScreen");
              }}
            >
              Don't have an Account?
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBlue,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  logo: {
    width: 400,
    height: 400,
  },
  inputView: {
    backgroundColor: COLORS.yellow,
    width: "69%",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: COLORS.darkBlue,
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  loginBtn: {
    width: "69%",
    backgroundColor: COLORS.darkBlue,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  loginText: {
    color: COLORS.white,
  },
});
