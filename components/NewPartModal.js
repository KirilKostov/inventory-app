import React, { useState } from "react";
import { Modal, View, StyleSheet } from "react-native";
import { Button } from "./Button";
import { Input } from "./Input";
import { TitleText } from "./TitleText";
import Colors from "../constants/colors";

export const NewPartModal = (props) => {
  const [name, setName] = useState(null);
  const [barcode, setBarcode] = useState(null);

  const resetInputs = () => {
    setName(null);
    setBarcode(null);
  };

  const handleSave = () => {
    props.handleAddRecord({ name, barcode });
    resetInputs();
  };

  const handleCancel = () => {
    props.onClose();
    resetInputs();
  };

  return (
    <Modal
      visible={props.modalVisible}
      animationType="slide"
      statusBarTranslucent
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <TitleText style={styles.title}>{props.icon} Add new part</TitleText>
          <Input
            placeholder="name"
            style={styles.input}
            onChangeText={(name) => setName(name)}
            autoCorrect={false}
          />
          <Input
            placeholder="barcode"
            style={styles.input}
            onChangeText={(barcode) => setBarcode(barcode)}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Save"
              style={{ backgroundColor: Colors.green, width: "45%" }}
              onPress={handleSave}
              disabled={!name || !barcode}
            />
            <Button
              title="Cancel"
              style={{ backgroundColor: Colors.lightGray, width: "45%" }}
              textStyle={{ color: "black" }}
              onPress={handleCancel}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "80%",
    alignItems: "center",
  },
  title: {
    marginVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
  },
  buttonContainer: {
    marginVertical: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
