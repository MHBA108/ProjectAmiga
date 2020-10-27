import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, Alert } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import FriendItem from "./FriendItem";
import { COLORS } from "../assets/COLORS";

export default class FriendList extends Component {

    render() {
        return (
            <View>
                <View style={styles.spacing}/>
                <FriendItem/>
                <View style={styles.spacing}/>
                <FriendItem/>
                <View style={styles.spacing}/>
                <FriendItem/>
                <View style={styles.spacing} />
                <TouchableOpacity
                    style={styles.friendButton}
                    onPress={() => Alert.alert("Add friend button pressed")}
                >
                    <Text style={styles.buttonText}>Add more friends!</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    spacing: {
        padding: "10rem",
        backgroundColor: "transparent",
    },
    buttonText: {
        color: COLORS.darkBlue,
        backgroundColor: COLORS.pink,
   	alignSelf: "center",
        fontSize: "30rem",
        fontFamily: "HindSiliguri_600SemiBold",
	},
    friendButton: {
        width: "100%",
        aspectRatio: 10 / 2,
        backgroundColor: COLORS.pink,
        borderRadius: 10,
        flexDirection: "column",
        padding: "4rem",
        justifyContent: "space-around",
	},
});
