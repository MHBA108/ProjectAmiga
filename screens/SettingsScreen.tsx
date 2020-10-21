import * as React from "react";
import { StyleSheet } from "react-native";
import {
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
    SafeAreaView,
    StatusBar,
} from "react-native";

import EStyleSheet from "react-native-extended-stylesheet";
import MyHeader from '../components/MyHeader'
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import SettingsList from "../components/SettingsList";
import { COLORS } from "../assets/COLORS";



const SettingsScreen = (props: { navigation: any; }) => {
    return (
        <View style={styles.container}>
            <MyHeader navigation={props.navigation} />
            <ScrollView
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.containerTop}>
                    <Text style={styles.usernameStyle}> Settings </Text>
                </View>
                <View style={styles.containerLog}>
                    <SettingsList />
                </View>
            </ScrollView>
        </View>
    )
}

export default SettingsScreen


const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.beige,
        alignItems: "center",
    },
    scrollContainer: {
        paddingHorizontal: "8rem",
    },
    containerLog: {
        width: "100%",
        flexDirection: "column",
        backgroundColor: COLORS.darkBlue,
        borderRadius: 10,
        padding: "10rem",
    },
    spacing: {
        padding: "5rem",
        backgroundColor: "transparent",
    },
    usernameStyle: {
        color: COLORS.darkBlue,
        fontFamily: "HindSiliguri_600SemiBold",
        fontSize: "40rem",
    },
    containerTop: {
        width: "100%",
        aspectRatio: 4 / 1,
        flexDirection: "row",
        backgroundColor: "transparent",
    },
});
