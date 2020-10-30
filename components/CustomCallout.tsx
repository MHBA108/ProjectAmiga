import React from "react";
import PropTypes from "prop-types";
import { COLORS } from "../assets/COLORS";
import { StyleSheet, View } from "react-native";

const propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

class CustomCallout extends React.Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.bubble}>
          <View style={styles.amount}>{this.props.children}</View>
        </View>
        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
      </View>
    );
  }
}

CustomCallout.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignSelf: "flex-start",
  },
  bubble: {
    width: 190,
    flex: 1,
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: COLORS.lightBlue,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: COLORS.lightBlue,
    borderWidth: 0.5,
    marginTop: 60,
  },
  amount: {
    flex: 1,
  },
  arrow: {
    backgroundColor: "transparent",
    borderWidth: 16,
    borderColor: "transparent",
    borderTopColor: COLORS.lightBlue,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderWidth: 16,
    borderColor: "transparent",
    borderTopColor: COLORS.lightBlue,
    alignSelf: "center",
    marginTop: -0.5,
  },
});

export default CustomCallout;
