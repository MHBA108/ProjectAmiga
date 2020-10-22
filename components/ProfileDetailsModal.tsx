import React, { Component } from "react";
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Alert,
} from "react-native";
import Modal from "react-native-modal";
import EStyleSheet from "react-native-extended-stylesheet";
import { Feather, AntDesign } from "@expo/vector-icons";
import { COLORS } from "../assets/COLORS";
import profilePlaceholder from "../assets/images/profilePicPlaceholder.png";



export default class ProfileDetailsModal extends Component<
    {},
    {
        expanded: boolean;
        modalVisible: boolean;
    }
    > {


    constructor(props: {}) {
        super(props);
        this.state = {
            modalVisible: false,
            expanded:false,
            
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
                                <Text style={styles.Header}>Profile Details</Text>
                                <View style={styles.backButton}>
                                    <TouchableHighlight
                                        onPress={() => this.closeModal()}
                                        underlayColor="none"
                                    >
                                        <Feather name="chevron-up" size={24} color={COLORS.darkBlue} />
                                    </TouchableHighlight>
                                </View>
                            </View>
                            <View style={styles.spacing}></View>
                            <View style={styles.detail}>
                                <Text style={styles.detailTitle}> Username: </Text>
                                <TouchableOpacity
                                    style={styles.editContainer}
                                    onPress={() => Alert.alert("Edit button pressed")}
                                >
                                    <AntDesign name="edit" size={24} color={COLORS.pink} />
                                </TouchableOpacity>
                                <View style={styles.spacing}></View>
                                <View style={styles.lighterDetail}>
                                    <Text style={styles.detailDescription}> JimSmith23 </Text>
                            </View>
                            </View>

                            <View style={styles.spacing}></View>
                            <View style={styles.detail}>
                                <Text style={styles.detailTitle}> Profile Picture: </Text>
                                <TouchableOpacity
                                    style={styles.circle}
                                    onPress={() => Alert.alert("Edit button pressed")}
                                >
                                    <Image
                                        style={styles.circle2}
                                        resizeMode="contain"
                                        source={profilePlaceholder}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.spacing}></View>
                            <View style={styles.detail}>
                                <Text style={styles.detailTitle}> Email: </Text>
                                <TouchableOpacity
                                    style={styles.editContainer}
                                    onPress={() => Alert.alert("Edit button pressed")}
                                >
                                    <AntDesign name="edit" size={24} color={COLORS.pink} />
                                </TouchableOpacity>
                                <View style={styles.spacing}></View>
                                <View style={styles.lighterDetail}>
                                    <Text style={styles.detailDescription}> JimSmith23@gmail.com </Text>
                                </View>
                            </View>

                            <View style={styles.spacing}></View>
                            <View style={styles.detail}>
                                <Text style={styles.detailTitle}> Date of Birth: </Text>
                                <TouchableOpacity
                                    style={styles.editContainer}
                                    onPress={() => Alert.alert("Edit button pressed")}
                                >
                                    <AntDesign name="edit" size={24} color={COLORS.pink} />
                                </TouchableOpacity>
                                <View style={styles.spacing}></View>
                                <View style={styles.lighterDetail}>
                                    <Text style={styles.detailDescription}> 12/23/1999 </Text>
                                </View>
                            </View>

                        </ScrollView>
                    </View>
                </Modal>
                <View>
                    <TouchableHighlight
                        onPress={() => this.openModal()}
                        underlayColor="none"
                    >
                        <View style={styles.badgeContainer}>
                            <Text style={styles.badgeText}>Edit Profile</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
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
        left: "-4rem",
        top: "-3rem",
        height: "105rem",
        width: "105rem",
        borderRadius: "57rem",
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: "14rem",
        alignSelf: "flex-end",
    },
    detailDescription: {
        color: COLORS.darkBlue,
        fontSize: "20rem",
        fontFamily: "HindSiliguri_400Regular",
        textAlign: "center",
    },
    editContainer: {
        position: "absolute",
        alignSelf: "flex-end",
        backgroundColor: "#FDE3C5",
        borderRadius: 10,
        padding: "5rem",
        right: "5rem",
        top: "5rem",
    },
    detailTitle: {
        color: COLORS.darkBlue,
        fontSize: "27rem",
        fontFamily: "HindSiliguri_500Medium",
        textAlign: "center",
        alignSelf: "flex-start",
    },
    lighterDetail: {
        width: "92%",
        aspectRatio: 7 / 2,
        backgroundColor: "#FDE3C5",
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: "space-around",
        alignSelf: "center",
        margin: "10rem",
    },
    detail: {
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
    badgeText: {
        color: "#464D77",
        fontFamily: "HindSiliguri_500Medium",
        fontSize: "11rem",
    },
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
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        aspectRatio: 2 / 1,
        height: "30rem"
    },
    badge: {
        backgroundColor: "#FCD7AE",
        width: "50rem",
        height: "50rem",
    },
    modalContainer: {
        margin: "-10rem",
        marginTop: "50rem",
        flex: 1,
        backgroundColor: COLORS.yellow,
        borderRadius: "20rem",
        padding: "10rem",
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
        backgroundColor: "#FCDDB9",
        borderRadius: 20,
        padding: 5,
        alignSelf: "flex-start",
        left: "120rem"
    },
});