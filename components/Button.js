import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "./Text";
import Colors from "../constants/colors";

export const Button = (props) => {
  const { onPress, title = "" } = props;
  return (
    <Pressable
      style={({ pressed }) => [
        pressed && { opacity: 0.7 },
        styles.button,
        props.style,
      ]}
      onPress={onPress}
      disabled={props.disabled}
    >
      <Text style={{ ...styles.text, ...props.textStyle }}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: Colors.blue,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
  },
});
