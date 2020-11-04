import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import Modal from "react-native-modal";
import { COLORS } from "../assets/COLORS";
import EStyleSheet from "react-native-extended-stylesheet";

export default class NotificationModal extends Component<
  { modalVisible: boolean; onModalHide: () => void },
  {
    modalVisible: boolean;
    reload: boolean;
  }
> {
  constructor(props: { modalVisible: boolean; onModalHide: () => void }) {
    console.log("setting states");
    super(props);
    this.state = {
      modalVisible: this.props.modalVisible,
      reload: true,
    };
  }

  closeModal() {
    this.setState({ reload: false });
    this.setState({ modalVisible: false });
  }

  reload() {
    if (
      this.state.reload == true &&
      this.props.modalVisible != this.state.modalVisible
    ) {
      this.setState({ modalVisible: this.props.modalVisible, reload: false });
    }
  }

  render() {
    // TODO retrieve streak
    let streak = 23;
    this.reload();
    return (
      <View>
        <Modal
          style={styles.modal}
          hasBackdrop={true}
          isVisible={this.state.modalVisible}
          backdropColor={COLORS.beige}
          backdropOpacity={0.95}
          animationIn="fadeIn"
          animationOut="fadeOut"
          animationInTiming={300}
          animationOutTiming={300}
          backdropTransitionInTiming={300}
          backdropTransitionOutTiming={300}
          coverScreen={true}
          onBackdropPress={() => this.closeModal()}
          onModalHide={() => this.props.onModalHide}
        >
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Keep it up!</Text>
              <Image
                source={require("../assets/images/streak.png")}
                style={styles.badge}
              />
            </View>
            <Text style={styles.subText}>
              You just inputted a journal for {streak} days in a row!
            </Text>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  modalContainer: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  saveButton: {
    backgroundColor: COLORS.pink,
    width: "25%",
    aspectRatio: 2 / 1,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    margin: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: COLORS.darkBlue,
    fontFamily: "HindSiliguri_700Bold",
    fontSize: "40rem",
    textAlign: "center",
    marginVertical: "10rem",
  },
  subText: {
    color: COLORS.darkBlue,
    fontFamily: "HindSiliguri_400Regular",
    fontSize: "20rem",
    textAlign: "center",
    marginVertical: "10rem",
    marginHorizontal: "30rem",
  },
  badge: {
    width: "50rem",
    height: "50rem",
    marginLeft: "10rem",
  },
});
