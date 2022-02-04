import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import InventoryScreen from "./screens/InventoryScreen";
import { Header } from "./components/Header";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const loadFonts = () => {
  return Font.loadAsync({
    "gibson-regular": require("./assets/fonts/Gibson-Regular.ttf"),
    "gibson-semibold": require("./assets/fonts/Gibson-Semibold.ttf"),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log("Data loading error: ", err)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <InventoryScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
