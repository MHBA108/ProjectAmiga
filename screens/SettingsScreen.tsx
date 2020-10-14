import * as React from "react";
import { StyleSheet } from "react-native";

import MyHeader from '../components/MyHeader'

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";



const SettingsScreen = (props: { navigation: any; }) => {
    return (
        <View>
            <MyHeader navigation={props.navigation} />
            <View
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <EditScreenInfo path="/screens/SettingsScreen.tsx" />
        </View>
    )
}

export default SettingsScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
