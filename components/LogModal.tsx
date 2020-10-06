import React, { Component } from 'react';
import { Text, View, Button, Modal, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import Slider from '@react-native-community/slider';

export default class LogModal extends Component<{sliderValue: any, noteText: any}, {value: string, expanded: boolean, modalVisible: boolean, height: any,  }>{
    onChangeText = (text: any) => {
        this.setState({ value: text })
    }

    constructor(props: any) {
        super(props);
        this.state = {
            value: '',
            modalVisible: false,
            expanded: false,
            height: 0,
        }
    }

    perc2color(perc: any) {
        var r, g, b = 0;
        if (perc < 50) {
            r = 255;
            g = Math.round(5.1 * perc);
        }
        else {
            g = 255;
            r = Math.round(510 - 5.10 * perc);
        }
        var h = r * 0x10000 + g * 0x100 + b * 0x1;
        return '#' + ('000000' + h.toString(16)).slice(-6);
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
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.closeModal()}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.innerContainer}>
                            <Text style={styles.questionStyle}>How are you feeling today, Anna?</Text>
                            <Slider
                                style={{
                                    height: 40,
                                    margin: 20,
                                    marginBottom: 10
                                }}
                                value={this.props.sliderValue}
                                minimumValue={0}
                                maximumValue={100}
                                trackImage={require('../assets/images/RYG-slider-image.png')}
                                thumbTintColor="#F2E9E3"
                                onSlidingComplete={value =>
                                    console.log(this.perc2color(value))
                                }
                            />
                            <View style={styles.textCon}>
                                <Text style={styles.textStyle}>Poor</Text>
                                <Text style={styles.textStyle}>Neutral</Text>
                                <Text style={styles.textStyle}>Good</Text>
                            </View>
                            <TextInput
                                // placeholder="Write note here ..."
                                style={[styles.note, { height: this.state.height }]}
                                onChangeText={text => this.onChangeText(text)}
                                onContentSizeChange={(event) => {
                                    this.setState({ height: (event.nativeEvent.contentSize.height + 20) })
                                }}
                                value={this.props.noteText}
                                placeholderTextColor="#F2E9E3"
                                multiline={true}
                            />
                            <Text style={[styles.textStyle, { textAlign: "center", marginTop: 20 }]}>
                                Mood Descriptions:
                                </Text>
                            <View style={styles.moodContainer}>
                                {/* <TouchableHighlight onPress={() => this.setState()} title="Close modal" color="#F2E9E3"> </TouchableHighlight> */}
                            </View>
                            <View style={styles.saveButton}>
                                <Button
                                    onPress={() => this.closeModal()}
                                    title="Save Entry"
                                    color="#F2E9E3"
                                >
                                </Button>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Button
                    onPress={() => this.openModal()}
                    title="Add more thoughts"
                    color="#F2E9E3"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    modalContainer: {
        margin: 20,
        marginTop: 50,
        flex: 1,
        backgroundColor: "#464D77",
        borderRadius: 20,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },

    innerContainer: {
        marginTop: 50
    },

    textCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#464D77",
        marginLeft: 10,
        marginRight: 10
    },

    note: {
        height: 40,
        color: '#F2E9E3',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
        padding: 15,
        backgroundColor: '#4F5D85',
        borderRadius: 20
    },

    textStyle: {
        color: '#F2E9E3',
        backgroundColor: "#464D77",
        fontSize: 20,
    },

    questionStyle: {
        color: '#F2E9E3',
        fontSize: 30,
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'center'
    },

    moodContainer: {
        backgroundColor: '#4F5D85',
        borderRadius: 20
    },

    saveButton: {
        backgroundColor: '#F9A2A2',
        borderRadius: 20,
        padding: 5,
        alignSelf: "center"
    },


});