import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import EStyleSheet from "react-native-extended-stylesheet";
import { Feather, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../assets/COLORS";
import avatarPlaceHolder from "../assets/images/avatars/1.png";
import { useFocusEffect } from "@react-navigation/native";
import firebase, { firestore } from "firebase";
import DatePicker from "react-native-datepicker";
import { useState } from "react";
import AvatarCarousel from "./AvatarCarousel";

export default function ProfileDetailsModal() {
  const [modalVisible, setModalVisible] = React.useState(false);

  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const [streak, setStreak] = React.useState(0);
  const [avatar, setAvatar] = React.useState("");
  const [date, setDate] = useState("");
  const [editable, setEditable] = useState(false);
  const [editOrSave, setEditOrSave] = useState(
    <AntDesign name="edit" size={36} color={COLORS.pink} />
  );
  const [background, setBackground] = useState(COLORS.yellowAccent);
  const [name, setName] = useState("");
  const [height, setHeight] = useState(140);
  const [topHeight, setTopHeight] = useState(6);
  const [carHeight, setCarHeight] = useState(0);
  const [previewHeight, setPreviewHeight] = useState(0);
  const [saveHeight, setSaveHeight] = useState(0);

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
    setEditable(false);
    setEditOrSave(<AntDesign name="edit" size={36} color={COLORS.pink} />);
    setBackground(COLORS.yellowAccent);
    setHeight(140);
    setTopHeight(6);
    setCarHeight(0);
    setPreviewHeight(0);
    setSaveHeight(0);
  }

  function renderEditSaveButton() {
    if (!editable) {
      setEditOrSave(
        <MaterialIcons name="save" size={36} color={COLORS.pink} />
      );
      setEditable(true);
      setBackground(COLORS.yellowAccent2);
      setHeight(140);
      setCarHeight(3 / 2);
      setPreviewHeight(5 / 2);
      setSaveHeight(250);
    } else {
      setEditOrSave(<AntDesign name="edit" size={36} color={COLORS.pink} />);
      setEditable(false);
      setBackground(COLORS.yellowAccent);
      saveDetails();
      setHeight(140);
      setCarHeight(0);
      setPreviewHeight(0);
      setSaveHeight(0);
    }
  }

  function saveDetails() {
    const user = firebase.auth().currentUser;
    if (name != "") {
      user?.updateProfile({
        displayName: name,
      });
    }
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
              <Text style={styles.Header}>Profile Details</Text>
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
            <View style={styles.spacing} />
            <View style={styles.detail}>
              <Text style={styles.detailTitle}> Email: </Text>
              <View style={styles.lighterDetail}>
                <Text style={styles.detailDescription}> {user?.email} </Text>
              </View>
            </View>
            <View style={styles.spacing} />
            <View style={styles.detail}>
              <Text style={styles.detailTitle}> Name: </Text>

              <View style={styles.spacing}></View>
              <View
                style={{
                  width: "92%",
                  aspectRatio: 7 / 2,
                  backgroundColor: background,
                  borderRadius: 10,
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignSelf: "center",
                  margin: 10,
                }}
              >
                <TextInput
                  style={styles.detailDescription}
                  placeholder={user?.displayName}
                  placeholderTextColor={COLORS.darkBlue}
                  editable={editable}
                  onChangeText={(name) => setName(name)}
                  value={name}
                ></TextInput>
              </View>
            </View>
            <View style={styles.spacing} />
            <View
              style={{
                width: "100%",
                height: height,
                backgroundColor: COLORS.yellowAccent,
                borderRadius: 10,
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <Text style={styles.detailTitle}> Avatar: </Text>
              <View style={styles.spacing} />
              <View style={styles.spacing} />
              <View style={styles.spacing} />
              <View style={styles.spacing} />
              <View
                style={{
                  position: "absolute",
                  height: 125,
                  width: 125,
                  borderRadius: 63,
                  backgroundColor: background,
                  borderColor: background,
                  borderWidth: 14,
                  alignSelf: "center",
                }}
              >
                <Image
                  style={styles.circle2}
                  resizeMode="contain"
                  source={avatarPlaceHolder}
                />
              </View>
            </View>
            <View style={styles.spacing}></View>

            <View style={{ height: saveHeight }}>
              <View
                style={{
                  width: "100%",
                  aspectRatio: carHeight,
                  backgroundColor: COLORS.yellowAccent2,
                  borderRadius: 10,
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <View style={styles.header}>
                  <Text style={styles.Header}>CHOOSE YOUR AVATAR:</Text>
                </View>
                <View
                  style={{
                    width: "92%",
                    height: "70%",
                    backgroundColor: COLORS.yellowAccent2,
                    borderRadius: 10,
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignSelf: "center",
                    margin: 10,
                  }}
                >
                  <AvatarCarousel />
                </View>
              </View>
              <View style={styles.spacing}></View>
            </View>
            <View style={styles.spacing}></View>

            <TouchableOpacity
              style={styles.editContainer}
              onPress={() => renderEditSaveButton()}
            >
              {editOrSave}
            </TouchableOpacity>
            <View style={styles.spacing} />
            <View style={styles.spacing} />
            <View style={styles.spacing} />
            <View style={styles.spacing} />
            <View style={styles.spacing} />
            <View style={styles.spacing} />
            <View style={styles.spacing} />
            <View style={styles.spacing} />
            <View style={styles.spacing} />
            <View style={styles.spacing} />
            <View style={styles.spacing} />
            <View style={styles.spacing} />
          </ScrollView>
        </View>
      </Modal>
      <View>
        <TouchableHighlight onPress={() => openModal()} underlayColor="none">
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>Edit Profile</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.yellowAccent,
    borderRadius: 10,
  },
  date: {
    alignSelf: "center",
  },
  circle: {
    position: "absolute",
    top: "6rem",
    height: "125rem",
    width: "125rem",
    borderRadius: "63rem",
    backgroundColor: COLORS.pink,
    borderColor: COLORS.pink,
    borderWidth: "14rem",
    alignSelf: "center",
  },
  circle2: {
    position: "absolute",
    left: "-10rem",
    top: "-3rem",
    height: "115rem",
    width: "115rem",
    borderRadius: "57.5rem",
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: "14rem",
    alignSelf: "flex-end",
  },
  detailDescription: {
    color: COLORS.darkBlue,
    fontSize: "20rem",
    fontFamily: "HindSiliguri_400Regular",
    textAlign: "center",
  },
  editContainer: {
    alignSelf: "flex-end",
    backgroundColor: COLORS.yellowAccent,
    borderRadius: 10,
  },
  detailTitle: {
    color: COLORS.darkBlue,
    fontSize: "27rem",
    fontFamily: "HindSiliguri_500Medium",
    alignSelf: "flex-start",
  },
  lighterDetail: {
    width: "92%",
    aspectRatio: 7 / 2,
    backgroundColor: COLORS.yellowAccent,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "space-around",
    alignSelf: "center",
    margin: 10,
  },
  detail: {
    width: "100%",
    aspectRatio: 5 / 2,
    backgroundColor: "#FCDDB9",
    borderRadius: 10,
    flexDirection: "column",
    padding: "5rem",
    justifyContent: "space-around",
  },
  spacing: {
    padding: "5rem",
    backgroundColor: "transparent",
  },
  badgeText: {
    color: "#464D77",
    fontFamily: "HindSiliguri_500Medium",
    fontSize: "11rem",
  },
  Header: {
    color: COLORS.darkBlue,
    fontFamily: "HindSiliguri_500Medium",
    fontSize: "28rem",
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
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    aspectRatio: 2 / 1,
    height: "30rem",
  },
  badge: {
    backgroundColor: "#FCD7AE",
    width: "50rem",
    height: "50rem",
  },
  modalContainer: {
    margin: "-10rem",
    marginTop: "50rem",
    flex: 1,
    backgroundColor: COLORS.yellow,
    borderRadius: "20rem",
    padding: "10rem",
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
    left: "120rem",
  },
});
