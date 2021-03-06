import * as React from "react";
import { ScrollView, Image, StatusBar } from "react-native";
import { Text, View } from "../components/Themed";
import EStyleSheet from "react-native-extended-stylesheet";
import FriendsList from "../components/FriendsList";
import MyHeader from "../components/MyHeader";
import { COLORS } from "../assets/COLORS";
import * as firebase from "firebase";
import avatars from "../assets/images/avatars/avatars";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../navigation/context";
import { useFocusEffect } from "@react-navigation/native";
import { firestore } from "firebase";

const FriendsScreen = (props: { navigation: any }) => {
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const authContext = React.useContext(AuthContext);
  const [friendData, setFriendData] = React.useState<firestore.DocumentData[]>(
    []
  );
  async function retrieveData() {
    try {
      const tempMap = new Map();
      let initialQuery = await firestore()
        .collection("users")
        .doc(user?.uid)
        .collection("friends");
      let documentSnapshots = await initialQuery.get();
      let documentData = documentSnapshots.docs.map((document) =>
        document.data()
      );
      setFriendData(documentData);
    } catch (error) {
      console.log(error);
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      let refresh = true;
      async function getData() {
        try {
          if (refresh) {
            await retrieveData();
          }
        } catch (error) {
          console.log(error);
        }
      }
      getData();
      return () => (refresh = false);
    }, [friendData])
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containerTop}>
          <View style={styles.containerUpperLeft}>
            <Text style={styles.usernameStyle}>
              {user?.displayName}'s Friends
            </Text>
          </View>
          <View style={styles.containerUpperRight}>
            <View style={styles.circle}></View>
            <Image
              style={styles.circleContainer}
              resizeMode="contain"
              source={avatars[`${authContext.avatar}`]}
            />
            <View style={styles.feedButtons}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  {" "}
                  Friends: {friendData.length}{" "}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.containerLog}>
          <FriendsList />
        </View>
      </ScrollView>
      <MyHeader navigation={props.navigation} />
    </SafeAreaView>
  );
};
export default FriendsScreen;

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
    marginBottom: "10rem",
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
    backgroundColor: "transparent",
    alignSelf: "center",
  },
  usernameStyle: {
    color: COLORS.darkBlue,
    fontFamily: "HindSiliguri_500Medium",
    fontSize: "20rem",
  },
  circleContainer: {
    height: "115rem",
    width: "115rem",
    borderRadius: "90rem",
    alignSelf: "center",
    top: "3rem",
  },
  circle: {
    position: "absolute",
    height: "125rem",
    width: "125rem",
    borderRadius: "90rem",
    backgroundColor: COLORS.lightBlue,
    borderColor: COLORS.lightBlue,
    borderWidth: "7rem",
    top: "2rem",
    alignSelf: "center",
  },
  profilePic: {
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: COLORS.yellow,
    padding: "10rem",
    borderRadius: 18,
    alignItems: "center",
    flexDirection: "row",
    margin: "5rem",
    top: "10rem",
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
