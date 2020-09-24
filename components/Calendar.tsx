import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";

export default class Calendar extends Component <{}, {selectedStartDate: Date | null}>{
    constructor(props: any) {
        super(props);
        this.state = {
          selectedStartDate: null,
        };
        this.onDateChange = this.onDateChange.bind(this);
      }

    onDateChange(date: any) { // potential future error here, switched date: Date to date: any
    this.setState({
        selectedStartDate: date,
    });
    }

    render() {
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
          <View style={styles.container}>
            <CalendarPicker
              onDateChange={this.onDateChange}     // potential future error here
              textStyle={{fontFamily: 'HindSiliguri_400Regular', color: '#464D77'}}
            />
            <View>
              <Text style={styles.textStyle}>SELECTED DATE:{ startDate }</Text>
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      marginTop: 25,
      fontFamily: 'HindSiliguri_400Regular',
      color: 'red'
    },

    textStyle: {
        fontFamily: 'HindSiliguri_400Regular',
        color: '#464D77'
      },
  });


