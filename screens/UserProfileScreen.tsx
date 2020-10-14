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
import LogModal from "../components/LogModal";
import EStyleSheet from "react-native-extended-stylesheet";
import profilePlaceholder from "../assets/images/profilePicPlaceholder.png";
import LogList from "../components/LogList";
import { Ionicons } from "@expo/vector-icons";

export default function UserProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containerTop}>
          <View style={styles.containerUpperLeft}>
            <Text style={styles.usernameStyle}>@UserName's Log</Text>
            <View style={styles.containerAchievementsStreaks}>
              <View style={styles.lowerTopLeft}>
                <Text style={styles.badgeText}>Achievements</Text>
                <TouchableOpacity
                  style={styles.badgeContainer}
                  onPress={() => Alert.alert("Achievement button pressed")}
                >
                  <Text style={styles.countText}> 3</Text>
                  <Image
                    source={require("../assets/images/achievement.png")}
                    style={styles.badge}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.lowerTopLeft}>
                <Text style={styles.badgeText}>Streak</Text>
                <TouchableOpacity
                  style={styles.badgeContainer}
                  onPress={() => Alert.alert("Streak button pressed")}
                >
                  <Text style={styles.countText}> 23</Text>
                  <Image
                    source={require("../assets/images/streak.png")}
                    style={styles.badge}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.containerUpperRight}>
            <Image
              style={styles.circleContainer}
              resizeMode="contain"
              source={profilePlaceholder}
            />
            <View style={styles.circle}></View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Alert.alert("Edit profile button pressed")}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Alert.alert("New entry button pressed")}
            >
              <Ionicons
                name="ios-add-circle-outline"
                size={20}
                color="#464D77"
              />
              <Text style={styles.buttonText}> New Entry</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerLog}>
          <LogList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2E9E3",
    alignItems: "center",
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
    paddingTop: "20rem",
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
    top: "8rem",
    height: "100rem",
    width: "100rem",
    borderRadius: "50rem",
    backgroundColor: "transparent",
    borderColor: "#6699CC",
    borderWidth: "5rem",
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
