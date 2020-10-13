import React, { Component } from "react";
import {View, StyleSheet, Platform } from "react-native";
import CalendarStrip from "react-native-calendar-strip";

export default class Calendar extends Component<
  {},
  { selectedStartDate: Date | null }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date: any) {
    // potential future error here, switched date: Date to date: any
    this.setState({
      selectedStartDate: date,
    });
  }

  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : "";
    return (
      <View style={styles.container}>
        <CalendarStrip
          calendarAnimation={{ type: "parallel", duration: 20 }}
          daySelectionAnimation={{
            type: "border",
            duration: 200,
            borderWidth: 2.5,
            borderHighlightColor: "#F9A2A2",
          }}
          calendarHeaderStyle={{
            fontSize: 20,
            marginBottom: 10,
            color: "#464D77",
          }}
          style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 25,
    fontFamily: "HindSiliguri_400Regular",
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 7,
      },
      android: {
        elevation: 5,
      },
    }),
  },

  textStyle: {
    fontFamily: "HindSiliguri_400Regular",
    color: "#464D77",
  },
});
