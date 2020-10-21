import React, { Component } from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import FeedItem from "./FeedItem";

export default class FeedList extends Component {

    render() {
        return (
            <View>
                <View style={styles.spacing}></View>
                <FeedItem></FeedItem>
                <View style={styles.spacing}></View>
                <FeedItem></FeedItem>
                <View style={styles.spacing}></View>
                <FeedItem></FeedItem>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    spacing: {
        padding: "5rem",
        backgroundColor: "transparent",
    },
});
