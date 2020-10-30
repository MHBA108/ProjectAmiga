import React, { Component, useState } from "react";
import {
  Text,
  View,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../assets/COLORS";

import { ContactActionSheet } from "react-native-contact-action-sheet";

export default class ContactUsInfo extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  // Open Action Sheet
  openActionSheet = () => {
    // Set State
    this.setState({
      visible: !this.state.visible,
    });
  };

  render() {
    const contacts = [
      {
        title: "Phone Number",
        type: "Phone Number",
        contact: "(123) 456-7890",
      },
      {
        title: "Contact Email",
        type: "Email",
        contact: "thisisa@fakeemail.com",
      },
      {
        title: "Website",
        type: "Website",
        contact: "https://projectamiga.com",
      },
    ];
    return (
      <View>
        <View style={styles.spacing}>
          <Text style={styles.textBoxStyle}>
            If you have any questions, concerns, or feedback feel free to
            contact us. Our team is happy to answer and respond to anything!
          </Text>
        </View>
        <View style={styles.resource}>
          <TouchableOpacity onPress={this.openActionSheet}>
            <View style={styles.button}>
              <Text style={styles.textStyle}>
                Tap here for our contact info
              </Text>
            </View>
          </TouchableOpacity>
          <ContactActionSheet
            visible={this.state.visible}
            toggle={this.openActionSheet}
            contactsList={contacts}
          />
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  spacing: {
    padding: "5rem",
    backgroundColor: "transparent",
  },
  button: {
    alignItems: "stretch",
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  resource: {
    aspectRatio: 8,
    backgroundColor: "#4E5E85",
    justifyContent: "center",
    borderRadius: 20,
    padding: 5,
  },
  textBoxStyle: {
    fontFamily: "HindSiliguri_400Regular",
    color: COLORS.beige,
    fontSize: "16rem",
  },
  textStyle: {
    fontFamily: "HindSiliguri_600SemiBold",
    color: "white",
    fontSize: "18rem",
  },
});
