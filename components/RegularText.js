import React from "react";
import { Text, StyleSheet } from "react-native";

export const RegularText = (props) => {
  return (
    <Text style={{ ...styles.regularText, ...props.style }}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  regularText: {
    fontFamily: "gibson-regular",
    fontSize: 16,
  },
});
