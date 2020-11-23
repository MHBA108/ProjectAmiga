import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../assets/COLORS";
import * as firebase from "firebase";
import { useFocusEffect } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import moment from "moment";
import { summary } from "date-streaks";
import { firestore } from "firebase";
import { AuthContext } from "../navigation/context";

export default function AchievementsList() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [height, setHeight] = React.useState(0);
  const [selected, setSelected] = React.useState(false);
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const [streak, setStreak] = React.useState(0);
  const [avatar, setAvatar] = React.useState("");

  const [allDatesArray, setAllDatesArray] = React.useState(new Array());
  const [longestStreak, setLongestStreak] = React.useState(0);

  const authContext = React.useContext(AuthContext);
  const [friendData, setFriendData] = React.useState<firestore.DocumentData[]>(
        []
    );
    
  useFocusEffect(() => {
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
    let isLoading = true;
    async function retrieve() {
      try {
        if (isLoading) {
          await retrieveData();
        }
      } catch (error) {
        console.log(error);
      }
    }
    retrieve();
    isLoading = false;
  });

  async function retrieveData() {
    try {
      const dateArray = new Array();
      let initialQuery = await firebase
        .firestore()
        .collection("users")
        .doc(user?.uid)
        .collection("userLogs")
        .orderBy("timestamp", "desc");
      let documentSnapshots = await initialQuery.get();
      let documentData = documentSnapshots.docs.map((document) =>
        document.data()
      );
      documentData.map((item: any) => {
        var date = moment(item.timestamp).format("MM/DD/YYYY");
        dateArray.push(date);
      });
      setAllDatesArray(dateArray);
      setLongestStreak(summary({ dates: dateArray }).longestStreak);
    } catch (error) {
      console.log(error);
      }
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
  const nurseryStreak: number =
    (Number([longestStreak]) / 1) * 100 >= 100
      ? 100
      : (Number([longestStreak]) / 1) * 100;
  const gardenerStreak: number =
    (Number([longestStreak]) / 2) * 100 >= 100
      ? 100
      : (Number([longestStreak]) / 2) * 100;
  const guruStreak: number =
    (Number([longestStreak]) / 3) * 100 >= 100
      ? 100
      : Math.trunc((Number([longestStreak]) / 3) * 100);
  const whispererStreak: number =
    (Number([longestStreak]) / 5) * 100 >= 100
      ? 100
      : Math.trunc((Number([longestStreak]) / 5) * 100);
  const thumbStreak: number =
    (Number([longestStreak]) / 8) * 100 >= 100
      ? 100
      : Math.trunc((Number([longestStreak]) / 8) * 100);
  const machineStreak: number =
    (Number([longestStreak]) / 13) * 100 >= 100
      ? 100
      : Math.trunc((Number([longestStreak]) / 13) * 100);
  const weedStreak: number =
    (Number([longestStreak]) / 21) * 100 >= 100
      ? 100
      : Math.trunc((Number([longestStreak]) / 21) * 100);
  const motherStreak: number =
    (Number([longestStreak]) / 34) * 100 >= 100
      ? 100
            : Math.trunc((Number([longestStreak]) / 34) * 100);
    const seedShop: number =
        (Number( friendData.length ) / 1) * 100 >= 100
            ? 100
            : (Number(friendData.length) / 1) * 100;
    const flowerPatch: number =
        (Number(friendData.length) / 2) * 100 >= 100
            ? 100
            : (Number(friendData.length) / 2) * 100;
    const secretGarden: number =
        (Number(friendData.length) / 5) * 100 >= 100
            ? 100
            : Math.trunc(friendData.length / 5 * 100);
    const almostEden: number =
        (Number(friendData.length) / 8) * 100 >= 100
            ? 100
            : Math.trunc((Number(friendData.length) / 8) * 100);
    const gardenOfEden: number =
        (Number([longestStreak]) / 13) * 100 >= 100
            ? 100
            : Math.trunc((Number(friendData.length) / 13) * 100);
  return (
    <View>
      <View style={styles.spacing}></View>
      <View style={styles.achievement}>
        <View style={styles.achievementTitleContainer}>
          <Text style={styles.achievemetTitle}>Nurseryman</Text>
          <Text style={styles.achievementDescription}>
            Earn this award when you log for the first time!
          </Text>
          <View style={styles.spacing2}></View>
          <Progress.Bar
            progress={Number([nurseryStreak]) / 100}
            width={200}
            color={COLORS.darkPink}
            unfilledColor={COLORS.pink}
            height={7}
          />
          <Text style={styles.achievementDescription}>
            {nurseryStreak}% Complete
          </Text>
        </View>
        <View style={styles.circle2}>
          <Image
            style={styles.circleContainer}
            resizeMode="contain"
            source={require("../assets/images/achievements/sprout.png")}
          />
        </View>
      </View>

      <View style={styles.spacing}></View>
      <View style={styles.achievement}>
        <View style={styles.achievementTitleContainer}>
          <Text style={styles.achievemetTitle}>Gardener</Text>
          <Text style={styles.achievementDescription}>
            Earn this award when you log for two days in a row!
          </Text>
          <View style={styles.spacing2}></View>
          <Progress.Bar
            progress={Number([gardenerStreak]) / 100}
            width={200}
            color={COLORS.darkPink}
            unfilledColor={COLORS.pink}
            height={7}
          />
          <Text style={styles.achievementDescription}>
            {gardenerStreak}% Complete
          </Text>
        </View>
        <View style={styles.circle2}>
          <Image
            style={styles.circleContainer}
            resizeMode="contain"
            source={require("../assets/images/achievements/trowel.png")}
          />
        </View>
      </View>

      <View style={styles.spacing}></View>
      <View style={styles.achievement}>
        <View style={styles.achievementTitleContainer}>
          <Text style={styles.achievemetTitle}>Garden Guru</Text>
          <Text style={styles.achievementDescription}>
            Earn this award when you log for three days in a row!{" "}
          </Text>
          <View style={styles.spacing2}></View>
          <Progress.Bar
            progress={Number([guruStreak]) / 100}
            width={200}
            color={COLORS.darkPink}
            unfilledColor={COLORS.pink}
            height={7}
          />
          <Text style={styles.achievementDescription}>
            {guruStreak}% Complete
          </Text>
        </View>
        <View style={styles.circle2}>
          <Image
            style={styles.circleContainer}
            resizeMode="contain"
            source={require("../assets/images/achievements/gloves.png")}
          />
        </View>
      </View>

      <View style={styles.spacing}></View>
      <View style={styles.achievement}>
        <View style={styles.achievementTitleContainer}>
          <Text style={styles.achievemetTitle}>Plant Whisperer</Text>
          <Text style={styles.achievementDescription}>
            Earn this award when you log for five days in a row!{" "}
          </Text>

          <View style={styles.spacing2}></View>
          <Progress.Bar
            progress={Number([whispererStreak]) / 100}
            width={200}
            color={COLORS.darkPink}
            unfilledColor={COLORS.pink}
            height={7}
          />
          <Text style={styles.achievementDescription}>
            {whispererStreak}% Complete
          </Text>
        </View>
        <View style={styles.circle2}>
          <Image
            style={styles.circleContainer}
            resizeMode="contain"
            source={require("../assets/images/achievements/plantPot.png")}
          />
        </View>
      </View>

      <View style={styles.spacing}></View>
      <View style={styles.achievement}>
        <View style={styles.achievementTitleContainer}>
          <Text style={styles.achievemetTitle}>Green Thumb</Text>
          <Text style={styles.achievementDescription}>
            Earn this award when you log for eight days in a row!{" "}
          </Text>
          <View style={styles.spacing2}></View>
          <Progress.Bar
            progress={Number([thumbStreak]) / 100}
            width={200}
            color={COLORS.darkPink}
            unfilledColor={COLORS.pink}
            height={7}
          />
          <Text style={styles.achievementDescription}>
            {thumbStreak}% Complete
          </Text>
        </View>
        <View style={styles.circle2}>
          <Image
            style={styles.circleContainer}
            resizeMode="contain"
            source={require("../assets/images/achievements/sprout2.png")}
          />
        </View>
      </View>

      <View style={styles.spacing}></View>
      <View style={styles.achievement}>
        <View style={styles.achievementTitleContainer}>
          <Text style={styles.achievemetTitle}>Green Machine</Text>
          <Text style={styles.achievementDescription}>
            Earn this award when you log for thirteen days in a row!{" "}
          </Text>
          <View style={styles.spacing2}></View>
          <Progress.Bar
            progress={Number([machineStreak]) / 100}
            width={200}
            color={COLORS.darkPink}
            unfilledColor={COLORS.pink}
            height={7}
          />
          <Text style={styles.achievementDescription}>
            {machineStreak}% Complete
          </Text>
        </View>
        <View style={styles.circle2}>
          <Image
            style={styles.circleContainer}
            resizeMode="contain"
            source={require("../assets/images/achievements/hangingPot.png")}
          />
        </View>
      </View>

      <View style={styles.spacing}></View>
      <View style={styles.achievement}>
        <View style={styles.achievementTitleContainer}>
          <Text style={styles.achievemetTitle}>Weed Man</Text>
          <Text style={styles.achievementDescription}>
            Earn this award when you log for twenty-one days in a row!{" "}
          </Text>
          <View style={styles.spacing2}></View>
          <Progress.Bar
            progress={Number([weedStreak]) / 100}
            width={200}
            color={COLORS.darkPink}
            unfilledColor={COLORS.pink}
            height={7}
          />
          <Text style={styles.achievementDescription}>
            {weedStreak}% Complete
          </Text>
        </View>
        <View style={styles.circle2}>
          <Image
            style={styles.circleContainer}
            resizeMode="contain"
            source={require("../assets/images/achievements/fertilizer2.png")}
          />
        </View>
      </View>

      <View style={styles.spacing}></View>
      <View style={styles.achievement}>
        <View style={styles.achievementTitleContainer}>
          <Text style={styles.achievemetTitle}>Mother Nature</Text>
          <Text style={styles.achievementDescription}>
            Earn this award when you log for thirty-four days in a row!{" "}
          </Text>
          <View style={styles.spacing2}></View>
          <Progress.Bar
            progress={Number([motherStreak]) / 100}
            width={200}
            color={COLORS.darkPink}
            unfilledColor={COLORS.pink}
            height={7}
          />
          <Text style={styles.achievementDescription}>
            {motherStreak}% Complete
          </Text>
        </View>
        <View style={styles.circle2}>
          <Image
            style={styles.circleContainer}
            resizeMode="contain"
            source={require("../assets/images/achievements/wateringCan.png")}
          />
        </View>
      </View>

      <View style={styles.spacing}></View>
      <View style={styles.achievement}>
        <View style={styles.achievementTitleContainer}>
          <Text style={styles.achievemetTitle}>Seed Shop</Text>
          <Text style={styles.achievementDescription}>
            Earn this award when you connect with one friend!
          </Text>
                  <View style={styles.spacing2}></View>
                  <Progress.Bar
                      progress={Number([seedShop]) / 100}
                      width={200}
                      color={COLORS.darkPink}
                      unfilledColor={COLORS.pink}
                      height={7}
                  />
                  <Text style={styles.achievementDescription}>
                      {seedShop}% Complete
          </Text></View>
        <View style={styles.circle2}>
          <Image
            style={styles.circleContainer}
            resizeMode="contain"
            source={require("../assets/images/achievements/fertilizer.png")}
          />
        </View>
      </View>

      <View style={styles.spacing}></View>
      <View style={styles.achievement}>
        <View style={styles.achievementTitleContainer}>
          <Text style={styles.achievemetTitle}>Flower Patch</Text>
          <Text style={styles.achievementDescription}>
            Earn this award when you connect with two friends
          </Text>
                  <View style={styles.spacing2}></View>
                  <Progress.Bar
                      progress={Number([flowerPatch]) / 100}
                      width={200}
                      color={COLORS.darkPink}
                      unfilledColor={COLORS.pink}
                      height={7}
                  /><Text style={styles.achievementDescription}>
                      {flowerPatch}% Complete
          </Text></View>
        <View style={styles.circle2}>
          <Image
            style={styles.circleContainer}
            resizeMode="contain"
            source={require("../assets/images/achievements/flowerPot.png")}
          />
        </View>
      </View>

      <View style={styles.spacing}></View>
      <View style={styles.achievement}>
        <View style={styles.achievementTitleContainer}>
          <Text style={styles.achievemetTitle}>Secret Garden</Text>
          <Text style={styles.achievementDescription}>
            Earn this award when you connect with five friends!
          </Text>
                  <View style={styles.spacing2}></View>
                  <Progress.Bar
                      progress={Number([secretGarden]) / 100}
                      width={200}
                      color={COLORS.darkPink}
                      unfilledColor={COLORS.pink}
                      height={7}
                  /><Text style={styles.achievementDescription}>
                      {secretGarden}% Complete
          </Text></View>
        <View style={styles.circle2}>
          <Image
            style={styles.circleContainer}
            resizeMode="contain"
            source={require("../assets/images/achievements/flowers.png")}
          />
        </View>
      </View>

      <View style={styles.spacing}></View>
      <View style={styles.achievement}>
        <View style={styles.achievementTitleContainer}>
          <Text style={styles.achievemetTitle}>Almost Eden</Text>
          <Text style={styles.achievementDescription}>
            Earn this award when you connect with eight friends!
          </Text>
                  <View style={styles.spacing2}></View>
                  <Progress.Bar
                      progress={Number([almostEden]) / 100}
                      width={200}
                      color={COLORS.darkPink}
                      unfilledColor={COLORS.pink}
                      height={7}
                  /><Text style={styles.achievementDescription}>
                      {almostEden}% Complete
          </Text></View>
        <View style={styles.circle2}>
          <Image
            style={styles.circleContainer}
            resizeMode="contain"
            source={require("../assets/images/achievements/plantPot3.png")}
          />
        </View>
      </View>

      <View style={styles.spacing}></View>
      <View style={styles.achievement}>
        <View style={styles.achievementTitleContainer}>
          <Text style={styles.achievemetTitle}>Garden of Eden</Text>
          <Text style={styles.achievementDescription}>
            Earn this award when you connect with thirteen friends!
          </Text>
                  <View style={styles.spacing2}></View>
                  <Progress.Bar
                      progress={Number([gardenOfEden]) / 100}
                      width={200}
                      color={COLORS.darkPink}
                      unfilledColor={COLORS.pink}
                      height={7}
                  /><Text style={styles.achievementDescription}>
                      {gardenOfEden}% Complete
          </Text></View>
        <View style={styles.circle2}>
          <Image
            style={styles.circleContainer}
            resizeMode="contain"
            source={require("../assets/images/achievements/bonsai.png")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = EStyleSheet.create({
  circleContainer: {
    height: "90rem",
    width: "90rem",
    top: "1rem",
    left: "1rem",
  },
  nurseryLoading: {
    backgroundColor: COLORS.pink,
    height: "4%",
    position: "absolute",
    top: "100rem",
  },
  statusBar: {
    backgroundColor: "#F67373",
    width: "100%",
    aspectRatio: 40 / 1,
    position: "absolute",
    top: "100rem",
  },
  achievementTitleContainer: {
    width: "63%",
    backgroundColor: "transparent",
    aspectRatio: 1.5 / 1,
  },
  achievemetTitle: {
    color: COLORS.darkBlue,
    fontSize: "30rem",
    fontFamily: "HindSiliguri_500Medium",
    textAlign: "center",
  },
  achievementDescription: {
    color: COLORS.darkBlue,
    fontSize: "13rem",
    fontFamily: "HindSiliguri_400Regular",
    textAlign: "center",
  },
  circle2: {
    position: "absolute",
    top: "8rem",
    height: "120rem",
    width: "120rem",
    borderRadius: "60rem",
    backgroundColor: COLORS.lightBlue,
    borderColor: COLORS.lightBlue,
    borderWidth: "14rem",
    alignSelf: "flex-end",
    right: "7rem",
  },
  achievement: {
    width: "100%",
    aspectRatio: 5 / 2,
    backgroundColor: "#FCDDB9",
    borderRadius: 10,
    flexDirection: "column",
    padding: "5rem",
    justifyContent: "space-around",
  },
  spacing: {
    padding: "10rem",
    backgroundColor: "transparent",
  },
  spacing2: {
    padding: "5rem",
    backgroundColor: "transparent",
  },
});
