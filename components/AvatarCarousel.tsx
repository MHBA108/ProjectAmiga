import React, { Component } from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../assets/COLORS";
import * as firebase from "firebase";
import { useFocusEffect } from "@react-navigation/native";

export default function AvatarCarousel({ setAvatar }: { setAvatar: Function }) {
  const [user, setUser] = React.useState(firebase.auth().currentUser);
  //TODO: on press set the avatar in firebase to avatar path
  const onPress = (avatar: number) => {
    setAvatar(avatar);
  };

  useFocusEffect(() => {
    let doc = getStreak();
    async function getStreak() {
      const doc = await firebase
        .firestore()
        .collection("users")
        .doc(user?.uid)
        .get();
    }
  });

  return (
    <View style={styles.container2}>
      <View style={styles.container}>
        <ScrollView horizontal={true} indicatorStyle={"white"}>
          <TouchableOpacity
            onPress={() => {
              onPress(1);
            }}
          >
            <Image
              source={require("../assets/images/avatars/1.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(11);
            }}
          >
            <Image
              source={require("../assets/images/avatars/11.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(14);
            }}
          >
            <Image
              source={require("../assets/images/avatars/14.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(16);
            }}
          >
            <Image
              source={require("../assets/images/avatars/16.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(17);
            }}
          >
            <Image
              source={require("../assets/images/avatars/17.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(18);
            }}
          >
            <Image
              source={require("../assets/images/avatars/18.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(19);
            }}
          >
            <Image
              source={require("../assets/images/avatars/19.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(2);
            }}
          >
            <Image
              source={require("../assets/images/avatars/2.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(20);
            }}
          >
            <Image
              source={require("../assets/images/avatars/20.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(21);
            }}
          >
            <Image
              source={require("../assets/images/avatars/21.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(22);
            }}
          >
            <Image
              source={require("../assets/images/avatars/22.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(23);
            }}
          >
            <Image
              source={require("../assets/images/avatars/23.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(25);
            }}
          >
            <Image
              source={require("../assets/images/avatars/25.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(26);
            }}
          >
            <Image
              source={require("../assets/images/avatars/26.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(29);
            }}
          >
            <Image
              source={require("../assets/images/avatars/29.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(31);
            }}
          >
            <Image
              source={require("../assets/images/avatars/31.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(32);
            }}
          >
            <Image
              source={require("../assets/images/avatars/32.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(33);
            }}
          >
            <Image
              source={require("../assets/images/avatars/33.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(34);
            }}
          >
            <Image
              source={require("../assets/images/avatars/34.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(38);
            }}
          >
            <Image
              source={require("../assets/images/avatars/38.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(39);
            }}
          >
            <Image
              source={require("../assets/images/avatars/39.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(4);
            }}
          >
            <Image
              source={require("../assets/images/avatars/4.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(40);
            }}
          >
            <Image
              source={require("../assets/images/avatars/40.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(41);
            }}
          >
            <Image
              source={require("../assets/images/avatars/41.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(42);
            }}
          >
            <Image
              source={require("../assets/images/avatars/42.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(44);
            }}
          >
            <Image
              source={require("../assets/images/avatars/44.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(45);
            }}
          >
            <Image
              source={require("../assets/images/avatars/45.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(46);
            }}
          >
            <Image
              source={require("../assets/images/avatars/46.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(48);
            }}
          >
            <Image
              source={require("../assets/images/avatars/48.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(49);
            }}
          >
            <Image
              source={require("../assets/images/avatars/49.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(5);
            }}
          >
            <Image
              source={require("../assets/images/avatars/5.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(50);
            }}
          >
            <Image
              source={require("../assets/images/avatars/50.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(51);
            }}
          >
            <Image
              source={require("../assets/images/avatars/51.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(52);
            }}
          >
            <Image
              source={require("../assets/images/avatars/52.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(53);
            }}
          >
            <Image
              source={require("../assets/images/avatars/53.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(54);
            }}
          >
            <Image
              source={require("../assets/images/avatars/54.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(55);
            }}
          >
            <Image
              source={require("../assets/images/avatars/55.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(56);
            }}
          >
            <Image
              source={require("../assets/images/avatars/56.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(57);
            }}
          >
            <Image
              source={require("../assets/images/avatars/57.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(59);
            }}
          >
            <Image
              source={require("../assets/images/avatars/59.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(60);
            }}
          >
            <Image
              source={require("../assets/images/avatars/60.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(61);
            }}
          >
            <Image
              source={require("../assets/images/avatars/61.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(62);
            }}
          >
            <Image
              source={require("../assets/images/avatars/62.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(63);
            }}
          >
            <Image
              source={require("../assets/images/avatars/63.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(64);
            }}
          >
            <Image
              source={require("../assets/images/avatars/64.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(65);
            }}
          >
            <Image
              source={require("../assets/images/avatars/65.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(66);
            }}
          >
            <Image
              source={require("../assets/images/avatars/66.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(67);
            }}
          >
            <Image
              source={require("../assets/images/avatars/67.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress(70);
            }}
          >
            <Image
              source={require("../assets/images/avatars/70.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = EStyleSheet.create({
  avatar: {
    height: "150rem",
    width: "150rem",
    backgroundColor: "transparent",
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 10,
    flexDirection: "row",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.yellowAccent,
    borderRadius: 10,
    flexDirection: "column",
  },
  spacing: {
    padding: "105rem",
    backgroundColor: "transparent",
  },
});
