import * as React from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { Text, View } from "../components/Themed";
import EStyleSheet from "react-native-extended-stylesheet";
import ResourcesMap from "../components/ResourcesMap";
import MyHeader from "../components/MyHeader";
import { COLORS } from "../assets/COLORS";

const ResourcesScreen = (props: { navigation: any }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containerTop}>
          <Text style={styles.textGreeting}> Resources </Text>
        </View>
        <View style={styles.containerLog}>
          <ResourcesMap />
        </View>
      </ScrollView>
      <MyHeader navigation={props.navigation} />
    </SafeAreaView>
  );
};
export default ResourcesScreen;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.beige,
  },
  scrollContainer: {
    paddingHorizontal: "8rem",
  },
  containerLog: {
    flexDirection: "column",
    backgroundColor: COLORS.darkBlue,
    borderRadius: 10,
    padding: "4rem",
  },
  containerTop: {
    width: "100%",
    aspectRatio: 6 / 1,
    marginBottom: "10rem",
    backgroundColor: "transparent",
  },
  textGreeting: {
    paddingTop: "25rem",
    color: COLORS.darkBlue,
    fontSize: "25rem",
    fontWeight: "bold",
    fontFamily: "HindSiliguri_700Bold",
    textAlign: "right",
  },
});
