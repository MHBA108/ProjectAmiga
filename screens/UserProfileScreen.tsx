import * as React from "react";
import { ScrollView, Image, StatusBar, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import EStyleSheet from "react-native-extended-stylesheet";
import LogList from "../components/LogList";
import MyHeader from "../components/MyHeader";
import OpenAchievements from "../components/OpenAchievements";
import OpenStreaks from "../components/OpenStreaks";
import * as firebase from "firebase";
import { useFocusEffect } from "@react-navigation/native";
import OpenProfileDetails from "../components/OpenProfileDetails";
import { COLORS } from "../assets/COLORS";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../navigation/context";
import { Feather } from "@expo/vector-icons";
import { firestore } from "firebase";
import avatars from "../assets/images/avatars/avatars";

const UserProfileScreen = (props: { navigation: any }) => {
  //let lastDoc = -1;
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const [streak, setStreak] = React.useState(0);
  const authContext = React.useContext(AuthContext);

  const [documentData, setDocumentData] = React.useState<
    firestore.DocumentData[]
  >([]);
  const [limit, setLimit] = React.useState(11);
  const [loading, setLoading] = React.useState(false);

  const callbackLogList = () => {
    retrieveData();
  };
  const callbackOpenProfileDetails = () => {
    retrieveData();
  };

  async function retrieveData() {
    try {
      setLoading(true);
      let initialQuery = await firestore()
        .collection("users")
        .doc(user?.uid)
        .collection("userLogs")
        .orderBy("timestamp", "desc")
        .limit(limit);
      let documentSnapshots = await initialQuery.get();
      let documentData = documentSnapshots.docs.map((document) =>
        document.data()
      );
      setDocumentData(documentData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    return documentData;
  }

  useFocusEffect(
    React.useCallback(() => {
      let refresh = true;
      async function getStreak() {
        const doc = await firebase
          .firestore()
          .collection("users")
          .doc(user?.uid)
          .get();
        setStreak(doc.get("streak"));
      }
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

      if (refresh) {
        let doc = getStreak();
      }
      return () => (refresh = false);
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <MyHeader navigation={props.navigation} />
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containerTop}>
          <View style={styles.containerUpperLeft}>
            <View style={styles.containerAchievementsStreaks}>
              <View style={styles.lowerTopLeft}>
                <Text style={styles.badgeText}>Achievements</Text>
                <View style={styles.badgeContainer1}>
                  <OpenAchievements />
                </View>
              </View>
              <View style={styles.lowerTopLeft}>
                <Text style={styles.badgeText}>Streak</Text>
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
              source={avatars[`${authContext.avatar}`]}
            />
            <OpenProfileDetails
              callbackUserProfileScreen={callbackOpenProfileDetails}
            />
          </View>
        </View>
        <View style={styles.spacing}></View>
        <View style={styles.containerLog}>
          <LogList
            userProfileCallback={callbackLogList}
            documentData={documentData}
          />
        </View>
        <View style={styles.spacing}></View>
        <TouchableOpacity
          style={styles.resource}
          onPress={() => {
            authContext.signOut();
          }}
        >
          <Feather color={COLORS.beige} name="log-out" size={25} />
          <Text style={styles.logOffText}> Sign Out </Text>
        </TouchableOpacity>
      </ScrollView>
      <MyHeader navigation={props.navigation} />
    </SafeAreaView>
  );
};
export default UserProfileScreen;

const styles = EStyleSheet.create({
  logOffText: {
    color: COLORS.beige,
    fontFamily: "HindSiliguri_600SemiBold",
    fontSize: "15rem",
  },
  resource: {
    width: "30%",
    aspectRatio: 4 / 2,
    backgroundColor: COLORS.darkBlue,
    borderRadius: 10,
    flexDirection: "row",
    padding: "5rem",
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "flex-end",
    marginBottom: "10rem",
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
    flex: 3,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "transparent",
    paddingTop: "10rem",
  },
  buttonEditProfile: {
    backgroundColor: COLORS.darkBlue,
    justifyContent: "center",
    borderRadius: 20,
    color: COLORS.beige,
    fontSize: "10rem",
    flexShrink: 1,
  },
  usernameStyle: {
    color: COLORS.darkBlue,
    fontFamily: "HindSiliguri_500Medium",
    fontSize: "20rem",
  },
  circleContainer: {
    height: "90rem",
    width: "90rem",
    borderRadius: "90rem",
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
    backgroundColor: COLORS.yellow,
    padding: "5rem",
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: COLORS.darkBlue,
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
    color: COLORS.darkBlue,
    fontFamily: "HindSiliguri_500Medium",
    fontSize: "11rem",
  },
  badgeContainer: {
    flexDirection: "row",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.yellow,
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
    color: COLORS.darkBlue,
    fontFamily: "HindSiliguri_500Medium",
    fontSize: "30rem",
  },
  badge: {
    width: "50rem",
    height: "50rem",
  },
});
