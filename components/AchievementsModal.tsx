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
import AchievementsList from "./AchievementsList";
import { COLORS } from "../assets/COLORS";

export default class AchievementsModal extends Component<
  {},
  {
    expanded: boolean;
    modalVisible: boolean;
    height: number;
    selected: boolean;
  }
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      modalVisible: false,
      expanded: false,
      height: 0,
      selected: false,
    };
  }

  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          hasBackdrop={true}
          isVisible={this.state.modalVisible}
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
                <Text style={styles.Header}>Achievements</Text>
                <View style={styles.backButton}>
                  <TouchableHighlight
                    onPress={() => this.closeModal()}
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
              <AchievementsList />
            </ScrollView>
          </View>
        </Modal>
        <View>
          <TouchableHighlight
            onPress={() => this.openModal()}
            underlayColor="none"
          >
            <View style={styles.badgeContainer}>
              <Text style={styles.countText}> 3</Text>
              <Image
                source={require("../assets/images/achievement.png")}
                style={styles.badge}
              />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
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
    height: "100rem",
  },
  badge: {
    backgroundColor: "transparent",
    width: "50rem",
    height: "50rem",
  },
  modalContainer: {
    margin: -10,
    marginTop: "20rem",
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
    backgroundColor: COLORS.yellowAccent,
    borderRadius: 20,
    padding: 5,
    alignSelf: "flex-start",
    left: "120rem",
  },
});
