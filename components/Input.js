import React from "react";
import { TextInput, StyleSheet } from "react-native";
import Colors from "../constants/colors";

export const Input = (props) => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 4,
    marginVertical: 10,
    textAlign: "center",
  },
});
