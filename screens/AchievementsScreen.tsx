import * as React from "react";
import {
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { Text, View } from "../components/Themed";
import EStyleSheet from "react-native-extended-stylesheet";
import avatar from "../assets/images/avatars/male.png";
import MyHeader from "../components/MyHeader";
import { COLORS } from "../assets/COLORS";
import * as firebase from "firebase";
import AchievementsList from "../components/AchievementsList";

const AchievementsScreen = (props: { navigation: any }) => {
  const [user, setUser] = React.useState(firebase.auth().currentUser);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containerTop}>
          <View style={styles.containerUpperLeft}>
            <Text style={styles.usernameStyle}>
              {user?.displayName}'s Achievements
            </Text>
          </View>
          <View style={styles.containerUpperRight}>
            <View style={styles.circle}></View>
            <Image
              style={styles.circleContainer}
              resizeMode="contain"
              source={avatar}
            />
          </View>
        </View>
        <View style={styles.containerLog}>
          <AchievementsList />
        </View>
      </ScrollView>
      <MyHeader navigation={props.navigation} />
    </SafeAreaView>
  );
};
export default AchievementsScreen;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.beige,
    alignItems: "center",
  },
  scrollContainer: {
    paddingTop: "45rem",
    paddingHorizontal: "8rem",
  },
  containerTop: {
    width: "100%",
    aspectRatio: 3 / 1,
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  containerLog: {
    width: "100%",
    flexDirection: "column",
    backgroundColor: COLORS.yellow,
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
  containerUpperLeft: {
    paddingTop: "50rem",
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
    top: "1rem",
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
});
