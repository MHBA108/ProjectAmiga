import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";
import "firebase/firestore";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { COLORS } from "../assets/COLORS";
import { AuthContext } from "../navigation/context";
import EStyleSheet from "react-native-extended-stylesheet";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen(props: { navigation: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const authContext = React.useContext(AuthContext);
  const navigation = useNavigation();

  async function onLoginSuccess() {
    console.log("login success");
    const user = firebase.auth().currentUser;
    if (user) {
      let document = await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get();
      if (!(document && document.exists)) {
        const data = {
          avatar: "",
          streak: 0,
        };
        firebase.firestore().collection("users").doc(user.uid).set(data);
      } else {
        authContext.avatar = document.get("avatar");
        console.log('authContext.avatar: "' + authContext.avatar + '"');
      }
    }
    authContext.signIn();
    // TODO: make log in go to home page. If you log out from the new
    // settings page and then log back in, you go to the settings page
    // and not the home page.
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
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <View style={styles.topContainer}>
              <Image
                style={styles.logo}
                source={require("../assets/images/splash.png")}
              />
            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.inputs}>
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
                  <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.signUpContainer}>
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
    flex: 1.25,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  bottomContainer: {
    flex: 1,
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
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: COLORS.darkBlue,
  },
  loginBtn: {
    width: "69%",
    backgroundColor: COLORS.darkBlue,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: COLORS.white,
  },
});
