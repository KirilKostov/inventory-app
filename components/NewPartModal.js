import React, { useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Button } from "./Button";
import { Input } from "./Input";
import { TitleText } from "./TitleText";
import Colors from "../constants/colors";
import { BarCodeScanner } from "expo-barcode-scanner";

export const NewPartModal = (props) => {
  const [name, setName] = useState(null);
  const [barcode, setBarcode] = useState(null);
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setBarcode(data);
  };

  const resetValues = () => {
    setName(null);
    setBarcode(null);
    setScanned(false);
  };

  const handleSave = () => {
    props.handleAddRecord({ name, barcode });
    props.onClose();
    resetValues();
  };

  const handleCancel = () => {
    props.onClose();
    resetValues();
  };

  return (
    <Modal
      visible={props.modalVisible}
      animationType="slide"
      statusBarTranslucent
      onRequestClose={props.onClose}
    >
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <TitleText style={styles.title}>
              {props.icon} Add new part
            </TitleText>
            {Platform.OS === "android" && (
              <>
                <View style={styles.barcodeScannerContainer}>
                  <BarCodeScanner
                    onBarCodeScanned={
                      scanned ? undefined : handleBarCodeScanned
                    }
                    style={styles.barcodeScanner}
                  />
                </View>
                {scanned && (
                  <Button
                    title={"Scan again?"}
                    onPress={() => setScanned(false)}
                    style={styles.buttonScan}
                  />
                )}
              </>
            )}

            <View style={styles.inputsContainer}>
              <Input
                placeholder="name"
                style={styles.input}
                onChangeText={(name) => setName(name)}
                autoCorrect={false}
                value={name}
              />
              <Input
                placeholder="barcode"
                style={styles.input}
                onChangeText={(barcode) => setBarcode(barcode)}
                value={barcode}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Save"
                style={styles.buttonSave}
                onPress={handleSave}
                disabled={!name || !barcode}
              />
              <Button
                title="Cancel"
                style={styles.buttonCancel}
                textStyle={{ color: "black" }}
                onPress={handleCancel}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
  inputsContainer: {
    marginTop: 20,
    width: "100%",
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
  buttonSave: {
    backgroundColor: Colors.green,
    width: "45%",
  },
  buttonCancel: { backgroundColor: Colors.lightGray, width: "45%" },
  buttonScan: {
    backgroundColor: Colors.secondary,
  },
  barcodeScannerContainer: {
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").width * 0.8,
    width: Dimensions.get("window").width * 0.8,
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: Colors.gray,
  },
  barcodeScanner: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * 1.5,
  },
});
