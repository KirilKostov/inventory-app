import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "../constants/colors";

export const Header = () => {
  return (
    <View style={styles.header}>
      <Image source={require("../assets/images/qb_logo_white.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 80,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
});
