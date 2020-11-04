import * as React from "react";
import { ScrollView, Image, StatusBar } from "react-native";
import { Text, View } from "../components/Themed";
import EStyleSheet from "react-native-extended-stylesheet";
import avatar from "../assets/images/avatars/male.png";
import MyHeader from "../components/MyHeader";
import { COLORS } from "../assets/COLORS";
import * as firebase from "firebase";
import AchievementsList from "../components/AchievementsList";
import { SafeAreaView } from "react-native-safe-area-context";

const AchievementsScreen = (props: { navigation: any }) => {
  const [user, setUser] = React.useState(firebase.auth().currentUser);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containerTop}>
          <View style={styles.textBox}>
            <Text style={styles.usernameStyle}>Achievements</Text>
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
    marginTop: StatusBar.currentHeight,
  },
  scrollContainer: {
    paddingHorizontal: "8rem",
  },
  containerTop: {
    width: "100%",
    aspectRatio: 3 / 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
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
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-end",
    backgroundColor: "transparent",
    justifyContent: "space-around",
    padding: "10rem",
  },
  usernameStyle: {
    color: COLORS.darkBlue,
    fontSize: "25rem",
    fontWeight: "bold",
    fontFamily: "HindSiliguri_700Bold",
    textAlign: "right",
  },
  textBox: {
    flex: 1.5,
    backgroundColor: "transparent",
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
