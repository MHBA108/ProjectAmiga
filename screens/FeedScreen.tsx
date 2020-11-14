import * as React from "react";
import {
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";
import { Text, View } from "../components/Themed";
import EStyleSheet from "react-native-extended-stylesheet";
import avatar from "../assets/images/avatars/1.png";
import FeedList from "../components/FeedList";
import MyHeader from "../components/MyHeader";
import OpenStreaks from "../components/OpenStreaks";
import { COLORS } from "../assets/COLORS";
import * as firebase from "firebase";
import { SafeAreaView } from "react-native-safe-area-context";

const FeedScreen = (props: { navigation: any }) => {
  const [user, setUser] = React.useState(firebase.auth().currentUser);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containerTop}>
          <View style={styles.containerUpperLeft}>
            <Text style={styles.badgeText}>Streak</Text>
            <View style={styles.containerAchievementsStreaks}>
              <View style={styles.lowerTopLeft}>
                <View style={styles.badgeContainer1}>
                  <OpenStreaks />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.containerUpperRight}>
            <View style={styles.circle}></View>
            <Image
              style={styles.circleContainer}
              resizeMode="contain"
              source={avatar}
            />
            <View style={styles.feedButtons}>
              <View style={styles.button}>
                <Text style={styles.buttonText}> Friends: 4 </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.containerLog}>
          <FeedList />
        </View>
      </ScrollView>
      <MyHeader navigation={props.navigation} />
    </SafeAreaView>
  );
};
export default FeedScreen;

const styles = EStyleSheet.create({
  feedButtons: {
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "flex-end",
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.beige,
    alignItems: "center",
    marginTop: StatusBar.currentHeight,
  },
  scrollContainer: {
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
    backgroundColor: COLORS.darkBlue,
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
    paddingTop: "35rem",
    paddingBottom: "10rem",
    flex: 3,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  usernameStyle: {
    color: COLORS.darkBlue,
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
    top: "6rem",
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
    padding: "10rem",
    borderRadius: 18,
    alignItems: "center",
    flexDirection: "row",
    margin: "5rem",
  },
  buttonText: {
    color: COLORS.darkBlue,
    fontFamily: "HindSiliguri_600SemiBold",
    fontSize: "12rem",
  },
  lowerTopLeft: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  badgeText: {
    color: COLORS.darkBlue,
    fontFamily: "HindSiliguri_500Medium",
    fontSize: "15rem",
  },
  badgeContainer1: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    width: "90%",
    aspectRatio: 1 / 1,
    padding: "50rem",
  },
  countText: {
    color: COLORS.darkBlue,
    fontFamily: "HindSiliguri_500Medium",
    fontSize: "30rem",
  },
  badge: {
    width: "50rem",
    height: "50rem",
  },
});
