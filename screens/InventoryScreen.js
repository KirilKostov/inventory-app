import React from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import Colors from "../constants/colors";
import { RegularText } from "../components/RegularText";
import { TitleText } from "../components/TitleText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const data = [
  { name: "one", barcode: 1111 },
  { name: "two", barcode: 2222 },
  { name: "three", barcode: 3333 },
  { name: "four", barcode: 4444 },
  { name: "five", barcode: 5555 },
  { name: "six", barcode: 6666 },
  { name: "one", barcode: 1111 },
  { name: "two", barcode: 2222 },
  { name: "three", barcode: 3333 },
  { name: "four", barcode: 4444 },
  { name: "five", barcode: 5555 },
  { name: "six", barcode: 6666 },
  { name: "one", barcode: 1111 },
  { name: "two", barcode: 2222 },
  { name: "three", barcode: 3333 },
  { name: "four", barcode: 4444 },
  { name: "five", barcode: 5555 },
  { name: "six", barcode: 6666 },
  { name: "one", barcode: 1111 },
  { name: "two", barcode: 2222 },
  { name: "three", barcode: 3333 },
  { name: "four", barcode: 4444 },
  { name: "five", barcode: 5555 },
  { name: "six", barcode: 6666 },
  { name: "one", barcode: 1111 },
  { name: "two", barcode: 2222 },
  { name: "three", barcode: 3333 },
  { name: "four", barcode: 4444 },
  { name: "six", barcode: 6666 },
  { name: "one", barcode: 1111 },
  { name: "two", barcode: 2222 },
  { name: "three", barcode: 3333 },
  { name: "four", barcode: 4444 },
  { name: "five", barcode: 5555 },
  { name: "six", barcode: 6666 },
];

const Divider = () => {
  return <View style={styles.divider} />;
};

const RenderItem = ({ name, barcode }) => {
  return (
    <View style={styles.listItem}>
      <View style={styles.columnLeft}>
        <RegularText>{name}</RegularText>
      </View>
      <View style={[styles.columnRight, styles.borderLeftGray]}>
        <RegularText>{barcode}</RegularText>
      </View>
    </View>
  );
};

const InventoryScreen = () => {
  return (
    <View style={styles.screen}>
      <TitleText style={styles.title}>
        <MaterialCommunityIcons name="cogs" size={24} color="black" /> Parts
        list
      </TitleText>
      <View style={styles.listHeader}>
        <View style={styles.columnLeft}>
          <RegularText style={styles.listHeaderText}>name</RegularText>
        </View>
        <View style={[styles.columnRight, styles.borderLeftWhite]}>
          <RegularText style={styles.listHeaderText}>barcode</RegularText>
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          contentContainerStyle={styles.list}
          data={data}
          renderItem={(itemData) => (
            <RenderItem
              name={itemData.item.name}
              barcode={itemData.item.barcode}
            />
          )}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={Divider}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    marginVertical: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  listHeader: {
    flexDirection: "row",
    width: "80%",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4,
    shadowOpacity: 0.5,
    elevation: 2,
    backgroundColor: Colors.gray,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  listHeaderText: {
    color: "white",
  },
  listContainer: {
    flex: 1,
    width: "80%",
    maxHeight: Dimensions.get("window").height * 0.5,
    shadowColor: "black",
  },
  list: {
    flexGrow: 1,
  },
  listItem: {
    flexDirection: "row",
  },
  columnLeft: {
    flex: 3,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  columnRight: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  borderLeftWhite: {
    borderLeftWidth: 1,
    borderColor: "white",
  },
  borderLeftGray: {
    borderLeftWidth: 1,
    borderColor: Colors.lightGray,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: Colors.lightGray,
  },
});

export default InventoryScreen;
