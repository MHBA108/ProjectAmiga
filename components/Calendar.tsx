import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { COLORS } from "../assets/COLORS";
import moment from "moment";
import firebase, { firestore } from "firebase";
import { useFocusEffect } from "@react-navigation/native";
const valueToColor = require("../assets/ValueToColor");

export default function Calendar(props: { customDatesStyles: any }) {
  useFocusEffect(React.useCallback(() => {}, [props.customDatesStyles]));
  React.useEffect(() => {}, [props.customDatesStyles]);

  return (
    <View style={styles.container}>
      <CalendarStrip
        scrollable={true}
        useIsoWeekday={false}
        updateWeekView={moment().toDate()}
        maxDate={moment().toDate()}
        minDate={moment().subtract(6, "days").toDate()}
        calendarAnimation={{ type: "parallel", duration: 20 }}
        daySelectionAnimation={{
          type: "border",
          duration: 200,
        }}
        calendarHeaderStyle={{
          fontSize: 20,
          marginBottom: 10,
          color: COLORS.darkBlue,
        }}
        renderColors
        customDatesStyles={props.customDatesStyles}
        style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
        iconStyle={{ height: 0, width: 0 }}
        iconContainer={{ flex: 0.05 }}
        //shouldAllowFontScaling={false}
      />
    </View>
  );
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
    color: COLORS.darkBlue,
  },
});
