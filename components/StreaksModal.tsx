import React, { Component } from "react";
import {
    Text,
    View,
    Button,
    ScrollView,
    StyleSheet,
    TextInput,
    Image,
    TouchableHighlight,
    Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import EStyleSheet from "react-native-extended-stylesheet";
import { Feather } from "@expo/vector-icons";
import StreaksList from "./StreaksList";
import { COLORS } from "../assets/COLORS";
import * as firebase from "firebase";
import { useFocusEffect } from "@react-navigation/native";
import { User } from "realm";

export default function StreaksModal(){
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

  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }
    return (
      <View style={styles.container}>
        <Modal
          hasBackdrop={true}
          isVisible={modalVisible}
          backdropColor={COLORS.darkBlue}
          backdropOpacity={0.5}
          animationInTiming={300}
          animationOutTiming={300}
          backdropTransitionInTiming={300}
          backdropTransitionOutTiming={300}
        >
          <View style={styles.modalContainer}>
            <ScrollView style={styles.innerContainer}>
              <View style={styles.achievementsHeader}>
                <Text style={styles.Header}>Log Streaks</Text>
                <View style={styles.backButton}>
                  <TouchableHighlight
                    onPress={() => closeModal()}
                    underlayColor="none"
                  >
                    <Feather
                      name="chevron-up"
                      size={24}
                      color={COLORS.darkBlue}
                    />
                  </TouchableHighlight>
                </View>
              </View>
              <StreaksList />
            </ScrollView>
          </View>
        </Modal>
        <View>
          <TouchableHighlight
            onPress={() => openModal()}
            underlayColor="none"
          >
            <View style={styles.badgeContainer}>
              <Text style={styles.countText}>{streak}</Text>
              <Image
                source={require("../assets/images/streak.png")}
                style={styles.badge}
              />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

const styles = EStyleSheet.create({
    Header: {
        color: COLORS.darkBlue,
        fontFamily: "HindSiliguri_500Medium",
        fontSize: "30rem",
    },
    achievementsHeader: {
        flexDirection: "row",
    },
    countText: {
        color: COLORS.darkBlue,
        fontFamily: "HindSiliguri_500Medium",
        fontSize: "30rem",
    },
    badgeContainer: {
        flexDirection: "row",
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        aspectRatio: 1 / 1,
        height: "100rem"
    },
    badge: {
        backgroundColor: "#FCD7AE",
        width: "50rem",
        height: "50rem",
    },
    modalContainer: {
        margin: -10,
        marginTop: 50,
        flex: 1,
        backgroundColor: COLORS.yellow,
        borderRadius: 20,
        padding: 10,
        shadowColor: COLORS.darkBlue,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 7,
        elevation: 5,
    },
    backButton: {
        backgroundColor: "#FCDDB9",
        borderRadius: 20,
        padding: 5,
        alignSelf: "flex-start",
        left: "155rem"
    },
});
