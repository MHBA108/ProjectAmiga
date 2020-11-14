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
import firebase from "firebase";
import DatePicker from "react-native-datepicker";
import { useState } from "react";

export default function ProfileDetailsModal() {
  const [modalVisible, setModalVisible] = React.useState(false);

  const [user, setUser] = React.useState(firebase.auth().currentUser);
  const [streak, setStreak] = React.useState(0);
  const [avatar, setAvatar] = React.useState("");
  const [date, setDate] = useState("09-10-2010");
  const [editable, setEditable] = useState(false);
  const [editOrSave, setEditOrSave] = useState(
    <AntDesign name="edit" size={36} color={COLORS.pink} />
  );
  const [background, setBackground] = useState(COLORS.yellowAccent);

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
  }

  function renderEditSaveButton() {
    if (!editable) {
      setEditOrSave(
        <MaterialIcons name="save" size={36} color={COLORS.pink} />
      );
      setEditable(true);
      setBackground(COLORS.yellowAccent2);
    } else {
      setEditOrSave(<AntDesign name="edit" size={36} color={COLORS.pink} />);
      setEditable(false);
      setBackground(COLORS.yellowAccent);
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
              <Text style={styles.detailTitle}> Avatar: </Text>
              <View style={styles.spacing} />
              <View style={styles.spacing} />
              <View style={styles.spacing} />
              <View style={styles.spacing} />
              <View
                style={{
                  position: "absolute",
                  top: 6,
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
                ></TextInput>
              </View>
            </View>

            <View style={styles.spacing}></View>
            <View style={styles.detail}>
              <Text style={styles.detailTitle}> Email: </Text>

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
                  placeholder={user?.email}
                  editable={editable}
                  placeholderTextColor={COLORS.darkBlue}
                ></TextInput>
              </View>
            </View>

            <View style={styles.spacing}></View>
            <View style={styles.detail}>
              <Text style={styles.detailTitle}> Date of Birth: </Text>

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
                <View style={styles.date}>
                  <DatePicker
                    style={styles.datePickerStyle}
                    date={date} // Initial date from state
                    mode="date" // The enum of date, datetime and time
                    placeholder="select date"
                    format="MM-DD-YYYY"
                    minDate="01-01-1950"
                    maxDate="01-01-2020"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      btnTextConfirm: {
                        color: COLORS.pink,
                      },
                      dateIcon: {
                        position: "absolute",
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: {
                        marginLeft: 36,
                        borderWidth: 0,
                      },
                      dateText: {
                        color: COLORS.darkBlue,
                        fontFamily: "HindSiliguri_500Medium",
                        fontSize: 18,
                      },
                    }}
                    onDateChange={(date) => {
                      setDate(date);
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.spacing}></View>
            <TouchableOpacity
              style={styles.editContainer}
              onPress={() => renderEditSaveButton()}
            >
              {editOrSave}
            </TouchableOpacity>
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
    backgroundColor: "#FDE3C5",
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "space-around",
    alignSelf: "center",
    margin: "10rem",
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
