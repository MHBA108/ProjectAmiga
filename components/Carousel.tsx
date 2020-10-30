import React, { Component } from "react";
import { View, ScrollView, Image } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../assets/COLORS";
import { TouchableHighlight } from "react-native-gesture-handler";

export default class Carousel extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true} indicatorStyle={"white"}>
          <TouchableHighlight onPress={() => {}}>
            <Image
              source={require("../assets/images/avatars/man.png")}
              style={styles.avatar}
            />
          </TouchableHighlight>

          <Image
            source={require("../assets/images/avatars/girl.png")}
            style={styles.avatar}
          />
          <Image
            source={require("../assets/images/avatars/boy.png")}
            style={styles.avatar}
          />
          <Image
            source={require("../assets/images/avatars/woman.png")}
            style={styles.avatar}
          />
          <Image
            source={require("../assets/images/avatars/man1.png")}
            style={styles.avatar}
          />
          <Image
            source={require("../assets/images/avatars/woman1.png")}
            style={styles.avatar}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  avatar: {
    height: "150rem",
    width: "150rem",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FCDDB9",
    borderRadius: 10,
  },
});
