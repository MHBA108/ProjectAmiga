import React, { Component } from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../assets/COLORS";

export default class AchievementsList extends Component {

    render() {
        return (
            <View>
                <View style={styles.spacing}></View>
                <View style={styles.achievement}>
                    <View style={styles.achievementTitleContainer}>
                        <Text style={styles.achievemetTitle}>Busy Bee</Text>
                        <Text style={styles.achievementDescription}>Earn this award when you complete a to do list</Text>
                        <View style={styles.statusBar}></View>
                        <View style={styles.spacing}></View>
                        <Text style={styles.achievementDescription}>100% Complete</Text>
                    </View>
                    <View style={styles.circle2}></View>
                    <View style={styles.circle}></View>
                </View>

                <View style={styles.spacing}></View>
                <View style={styles.achievement}>
                    <View style={styles.achievementTitleContainer}>
                        <Text style={styles.achievemetTitle}>Social Butterfly</Text>
                        <Text style={styles.achievementDescription}>Earn this award when you connect with one friend</Text>
                        <View style={styles.statusBar}></View>
                        <View style={styles.spacing}></View>
                        <Text style={styles.achievementDescription}>100% Complete</Text>
                    </View>
                    <View style={styles.circle2}></View>
                    <View style={styles.circle}></View>
                </View>

                <View style={styles.spacing}></View>
                <View style={styles.achievement}>
                    <View style={styles.achievementTitleContainer}>
                        <Text style={styles.achievemetTitle}>Nursery Man</Text>
                        <Text style={styles.achievementDescription}>Earn this award when you make your first log</Text>
                        <View style={styles.statusBar}></View>
                        <View style={styles.spacing}></View>
                        <Text style={styles.achievementDescription}>100% Complete</Text>
                    </View>
                    <View style={styles.circle2}></View>
                    <View style={styles.circle}></View>
                </View>

                <View style={styles.spacing}></View>
                <View style={styles.achievement}>
                    <View style={styles.achievementTitleContainer}>
                        <Text style={styles.achievemetTitle}>Gardener</Text>
                        <Text style={styles.achievementDescription}>Earn this award when you log for 25 days in a row</Text>
                        <View style={styles.statusBar}></View>
                        <View style={styles.spacing}></View>
                        <Text style={styles.achievementDescription}>100% Complete</Text>
                    </View>
                    <View style={styles.circle2}></View>
                    <View style={styles.circle}></View>
                </View>

                <View style={styles.spacing}></View>
                <View style={styles.achievement}>
                    <View style={styles.circle2}></View>
                    <View style={styles.circle}></View>
                </View>

                <View style={styles.spacing}></View>
                <View style={styles.achievement}>
                    <View style={styles.circle2}></View>
                    <View style={styles.circle}></View>
                </View>

                <View style={styles.spacing}></View>
                <View style={styles.achievement}>
                    <View style={styles.circle2}></View>
                    <View style={styles.circle}></View>
                </View>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    statusBar: {
        backgroundColor: COLORS.pink,
        width: "100%",
        aspectRatio: 40 / 1,
        position: "absolute",
        top: "100rem",
    },
    achievementTitleContainer: {
        width: "63%",
        backgroundColor: "transparent",
        aspectRatio: 1.5 / 1,
    },
    achievemetTitle: {
        color: COLORS.darkBlue,
        fontSize: "30rem",
        fontFamily: "HindSiliguri_500Medium",
        textAlign: "center",
    },
    achievementDescription: {
        color: COLORS.darkBlue,
        fontSize: "13rem",
        fontFamily: "HindSiliguri_400Regular",
        textAlign: "center",
    },
    circle: {
        position: "absolute",
        top: "6rem",
        height: "125rem",
        width: "125rem",
        borderRadius: "63rem",
        backgroundColor: "transparent",
        borderColor: COLORS.lightBlue,
        borderWidth: "14rem",
        alignSelf: "flex-end",
    },
    circle2: {
        position: "absolute",
        top: "16rem",
        height: "105rem",
        width: "105rem",
        borderRadius: "57rem",
        backgroundColor: COLORS.darkBlue,
        borderColor: COLORS.darkBlue,
        borderWidth: "14rem",
        alignSelf: "flex-end",
        right: "7rem",
    },
    achievement: {
        width: "100%",
        aspectRatio: 5 / 2,
        backgroundColor: "#FCDDB9",
        borderRadius: 10,
        flexDirection: "column",
        padding: "5rem",
        justifyContent: "space-around",
    },
    spacing: {
        padding: "10rem",
        backgroundColor: "transparent",
    },
});
