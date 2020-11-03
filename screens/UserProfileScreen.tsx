import * as React from "react";
import {
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Text, View } from "../components/Themed";
import EStyleSheet from "react-native-extended-stylesheet";
import avatarPlaceHolder from "../assets/images/avatars/male.png";
import LogList from "../components/LogList";
import MyHeader from "../components/MyHeader";
import OpenAchievements from "../components/OpenAchievements";
import * as firebase from "firebase";
import { useFocusEffect } from "@react-navigation/native";
import OpenProfileDetails from "../components/OpenProfileDetails";
import { COLORS } from "../assets/COLORS";

const UserProfileScreen = (props: { navigation: any }) => {
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const [streak, setStreak] = React.useState(0);
  const [avatar, setAvatar] = React.useState("");

  useFocusEffect(() => {
    console.log(
      "getting the streak right now from firebase in UserProfileScreen.tsx"
    );
    let doc = getStreak();
    async function getStreak() {
      const doc = await firebase
        .firestore()
        .collection("users")
        .doc(user?.uid)
        .get();
      setStreak(doc.get("streak"));
      setAvatar(doc.get("avatar"));
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <MyHeader navigation={props.navigation} />
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containerTop}>
          <View style={styles.containerUpperLeft}>
            <Text style={styles.usernameStyle}>{user?.displayName}'s Log</Text>
            <View style={styles.containerAchievementsStreaks}>
              <View style={styles.lowerTopLeft}>
                <Text style={styles.badgeText}>Achievements</Text>
                <View style={styles.badgeContainer1}>
                  <OpenAchievements />
                </View>
              </View>
              <View style={styles.lowerTopLeft}>
                <Text style={styles.badgeText}>Streak</Text>
                <TouchableOpacity
                  style={styles.badgeContainer}
                  onPress={() => Alert.alert("Streak button pressed")}
                >
                  <Text style={styles.countText}>{streak}</Text>
                  <Image
                    source={require("../assets/images/streak.png")}
                    style={styles.badge}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.containerUpperRight}>
            <View style={styles.circle}></View>
            <Image
              style={styles.circleContainer}
              resizeMode="contain"
              source={avatarPlaceHolder}
            />
            <OpenProfileDetails />
          </View>
        </View>
        <View style={styles.spacing}></View>
        <View style={styles.containerLog}>
          <LogList />
        </View>
        <View style={styles.spacing}></View>
        <View style={styles.spacing}></View>
        <View style={styles.spacing}></View>
      </ScrollView>
      <MyHeader navigation={props.navigation} />
    </SafeAreaView>
  );
};
export default UserProfileScreen;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2E9E3",
    alignItems: "center",
  },
  scrollContainer: {
    paddingTop: "45rem",
    paddingHorizontal: "8rem",
  },
  containerTop: {
    width: "100%",
    aspectRatio: 2 / 1,
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  containerLog: {
    width: "100%",
    flexDirection: "column",
    backgroundColor: "#464D77",
    borderRadius: 10,
    padding: "10rem",
  },
  spacing: {
    padding: "5rem",
    backgroundColor: "transparent",
  },
  containerUpperRight: {
    flex: 2,
    flexDirection: "column",
    alignItems: "flex-end",
    backgroundColor: "transparent",
    justifyContent: "space-around",
    padding: "10rem",
  },
  containerAchievementsStreaks: {
    flex: 3,
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  containerUpperLeft: {
    flex: 3,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "transparent",
    paddingTop: "10rem",
  },
  buttonEditProfile: {
    backgroundColor: "#464D77",
    justifyContent: "center",
    borderRadius: 20,
    color: "#F2E9E3",
    fontSize: "10rem",
    flexShrink: 1,
  },
  usernameStyle: {
    color: "#464D77",
    fontFamily: "HindSiliguri_500Medium",
    fontSize: "20rem",
  },
  circleContainer: {
    height: "90rem",
    width: "90rem",
    borderRadius: "45rem",
    alignSelf: "center",
  },
  circle: {
    position: "absolute",
    top: "9rem",
    height: "100rem",
    width: "100rem",
    borderRadius: "50rem",
    backgroundColor: COLORS.lightBlue,
    borderColor: COLORS.lightBlue,
    borderWidth: "7rem",
    alignSelf: "center",
  },
  profilePic: {
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: "#FCD7AE",
    padding: "5rem",
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "#464D77",
    fontFamily: "HindSiliguri_600SemiBold",
    fontSize: "10rem",
  },
  lowerTopLeft: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  badgeText: {
    color: "#464D77",
    fontFamily: "HindSiliguri_500Medium",
    fontSize: "11rem",
  },
  badgeContainer: {
    flexDirection: "row",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FCD7AE",
    aspectRatio: 1 / 1,
    padding: "15rem",
  },
  badgeContainer1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    aspectRatio: 1 / 1,
    padding: "10rem",
  },
  countText: {
    color: "#464D77",
    fontFamily: "HindSiliguri_500Medium",
    fontSize: "30rem",
  },
  badge: {
    width: "50rem",
    height: "50rem",
  },
});
