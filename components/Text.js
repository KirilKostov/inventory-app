import React from "react";
import { Text as CustomText, StyleSheet } from "react-native";

export const Text = (props) => {
  return (
    <CustomText style={{ ...styles.text, ...props.style }}>
      {props.children}
    </CustomText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "gibson-regular",
    fontSize: 16,
  },
});
