import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import InventoryScreen from "./screens/InventoryScreen";
import { Header } from "./components/Header";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Config from "./constants/config";
import { BarCodeScanner } from "expo-barcode-scanner";

const loadFonts = () => {
  return Font.loadAsync({
    "gibson-regular": require("./assets/fonts/Gibson-Regular.ttf"),
    "gibson-semibold": require("./assets/fonts/Gibson-Semibold.ttf"),
  });
};

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.permissionContainer}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text>No access to camera</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Allow camera"
            onPress={() => askForCameraPermission()}
          />
        </View>
      </View>
    );
  }

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(err) => console.log("Error loading fonts: ", err)}
      />
    );
  }

  return (
    <ToastProvider {...Config.toastOptions}>
      <View style={styles.container}>
        <Header />
        <InventoryScreen />
      </View>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  permissionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    margin: 20,
  },
});
