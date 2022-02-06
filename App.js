import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import InventoryScreen from "./screens/InventoryScreen";
import { Header } from "./components/Header";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Config from "./constants/config";

const loadFonts = () => {
  return Font.loadAsync({
    "gibson-regular": require("./assets/fonts/Gibson-Regular.ttf"),
    "gibson-semibold": require("./assets/fonts/Gibson-Semibold.ttf"),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
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
});
