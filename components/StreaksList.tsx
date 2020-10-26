import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import profilePlaceholder from "../assets/images/profilePicPlaceholder.png";
import { COLORS } from "../assets/COLORS";

export default class StreaksList extends Component {

    render() {
        return (
            <View>
                <View style={styles.spacing}></View>
                <View style={styles.achievement}>
                    <View style={styles.achievementTitleContainer}>
                        <Text style={styles.achievemetTitle}>@JimSmith23</Text>
                        <View style={styles.spacing}></View>
                        <View style={styles.streakContainer}>
                            <Text style={styles.achievementDescription}>23</Text>
                            <Image
                                source={require("../assets/images/streak.png")}
                                style={styles.badge}
                            />
                        </View>
                    </View>
                    <Image
                        style={styles.circle2}
                        resizeMode="contain"
                        source={profilePlaceholder}
                    />
                    <View style={styles.circle}></View>
                </View>

                <View style={styles.spacing}></View>
                <View style={styles.achievement}>
                    <View style={styles.achievementTitleContainer}>
                        <Text style={styles.achievemetTitle}>@SaraFin54</Text>
                        <View style={styles.spacing}></View>
                        <View style={styles.streakContainer}>
                            <Text style={styles.achievementDescription}>13</Text>
                            <Image
                                source={require("../assets/images/streak.png")}
                                style={styles.badge}
                            />
                        </View>
                    </View>
                    <Image
                        style={styles.circle2}
                        resizeMode="contain"
                        source={profilePlaceholder}
                    />
                    <View style={styles.circle}></View>
                </View>

                <View style={styles.spacing}></View>
                <View style={styles.achievement}>
                    <View style={styles.achievementTitleContainer}>
                        <Text style={styles.achievemetTitle}>@DanzelFit</Text>
                        <View style={styles.spacing}></View>
                        <View style={styles.streakContainer}>
                            <Text style={styles.achievementDescription}>23</Text>
                            <Image
                                source={require("../assets/images/streak.png")}
                                style={styles.badge}
                            />
                        </View>
                    </View>
                    <Image
                        style={styles.circle2}
                        resizeMode="contain"
                        source={profilePlaceholder}
                    />
                    <View style={styles.circle}></View>
                </View>

                <View style={styles.spacing}></View>
                <View style={styles.achievement}>
                    <View style={styles.achievementTitleContainer}>
                        <Text style={styles.achievemetTitle}>@MelanieLFrank</Text>
                        <View style={styles.spacing}></View>
                        <View style={styles.streakContainer}>
                            <Text style={styles.achievementDescription}>1</Text>
                            <Image
                                source={require("../assets/images/streak.png")}
                                style={styles.badge}
                            />
                        </View>
                    </View>
                    <Image
                        style={styles.circle2}
                        resizeMode="contain"
                        source={profilePlaceholder}
                    />
                    <View style={styles.circle}></View>
                </View>

                <View style={styles.spacing}></View>
                <View style={styles.achievement}>
                    <Image
                        style={styles.circle2}
                        resizeMode="contain"
                        source={profilePlaceholder}
                    />
                    <View style={styles.circle}></View>
                </View>

                <View style={styles.spacing}></View>
                <View style={styles.achievement}>
                    <Image
                        style={styles.circle2}
                        resizeMode="contain"
                        source={profilePlaceholder}
                    />
                    <View style={styles.circle}></View>
                </View>

                <View style={styles.spacing}></View>
                <View style={styles.achievement}>
                    <Image
                        style={styles.circle2}
                        resizeMode="contain"
                        source={profilePlaceholder}
                    />
                    <View style={styles.circle}></View>
                </View>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    badge: {
        backgroundColor: "transparent",
        width: "50rem",
        height: "50rem",
    },
    streakContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf:"center",
	},
    profilePic: {
        width: "100%",
        height: "100%",
    },
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
        fontSize: "27rem",
        fontFamily: "HindSiliguri_500Medium",
        textAlign: "center",
    },
    achievementDescription: {
        color: COLORS.darkBlue,
        fontSize: "25rem",
        fontFamily: "HindSiliguri_500Medium",
        textAlign: "center",
    },
    circle: {
        position: "absolute",
        top: "6rem",
        height: "125rem",
        width: "125rem",
        borderRadius: "63rem",
        backgroundColor: "transparent",
        borderColor: COLORS.pink,
        borderWidth: "14rem",
        alignSelf: "flex-end",
    },
    circle2: {
        position: "absolute",
        top: "18rem",
        height: "105rem",
        width: "105rem",
        borderRadius: "57rem",
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: "14rem",
        alignSelf: "flex-end",
        right: "9rem",
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
        padding: "8rem",
        backgroundColor: "transparent",
    },
});
