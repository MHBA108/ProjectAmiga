import * as React from "react";
import { StyleSheet, Image } from "react-native";


import { Text, View } from "../components/Themed";

import MyHeader from '../components/MyHeader'




const Feed = (props: { navigation: any; }) => {
    return (
        <View>
            <MyHeader navigation={props.navigation} />
            <Image
                source={require('../assets/images/FeedPlaceHolder.png')}
                style={{
                    width: 375, height: 750}} />
        </View>
    )
}

export default Feed


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
