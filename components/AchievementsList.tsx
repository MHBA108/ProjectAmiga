import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../assets/COLORS";
import * as firebase from "firebase";
import { useFocusEffect } from "@react-navigation/native";

export default function AchievementsList() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [height, setHeight] = React.useState(0);
  const [selected, setSelected] = React.useState(false);
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const [streak, setStreak] = React.useState(0);
  const [avatar, setAvatar] = React.useState("");

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
  });

  return (
    <View>
      <View style={styles.spacing}></View>
      <View style={styles.achievement}>
        <View style={styles.achievementTitleContainer}>
          <Text style={styles.achievemetTitle}>Nurseryman</Text>
          <Text style={styles.achievementDescription}>
            Earn this award when log for the first time!
          </Text>
          <View style={styles.statusBar}></View>
          <View style={styles.spacing}></View>
          <Text style={styles.achievementDescription}>100% Complete</Text>
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
          <View style={styles.statusBar}></View>
          <View style={styles.spacing}></View>
          <Text style={styles.achievementDescription}>100% Complete</Text>
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
          <View style={styles.statusBar}></View>
          <View style={styles.spacing}></View>
          <Text style={styles.achievementDescription}>100% Complete</Text>
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
          <View style={styles.statusBar}></View>
          <View style={styles.spacing}></View>
          <Text style={styles.achievementDescription}>100% Complete</Text>
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
          <View style={styles.statusBar}></View>
          <View style={styles.spacing}></View>
          <Text style={styles.achievementDescription}>100% Complete</Text>
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
          <View style={styles.statusBar}></View>
          <View style={styles.spacing}></View>
          <Text style={styles.achievementDescription}>100% Complete</Text>
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
          <View style={styles.statusBar}></View>
          <View style={styles.spacing}></View>
          <Text style={styles.achievementDescription}>100% Complete</Text>
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
          <View style={styles.statusBar}></View>
          <View style={styles.spacing}></View>
          <Text style={styles.achievementDescription}>100% Complete</Text>
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
          <View style={styles.statusBar}></View>
          <View style={styles.spacing}></View>
          <Text style={styles.achievementDescription}>100% Complete</Text>
        </View>
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
          <View style={styles.statusBar}></View>
          <View style={styles.spacing}></View>
          <Text style={styles.achievementDescription}>100% Complete</Text>
        </View>
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
          <View style={styles.statusBar}></View>
          <View style={styles.spacing}></View>
          <Text style={styles.achievementDescription}>100% Complete</Text>
        </View>
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
          <View style={styles.statusBar}></View>
          <View style={styles.spacing}></View>
          <Text style={styles.achievementDescription}>100% Complete</Text>
        </View>
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
          <View style={styles.statusBar}></View>
          <View style={styles.spacing}></View>
          <Text style={styles.achievementDescription}>100% Complete</Text>
        </View>
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
  loadingStatusBar: {
    backgroundColor: COLORS.pink,
    width: "90%",
    aspectRatio: 40 / 1,
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
});
