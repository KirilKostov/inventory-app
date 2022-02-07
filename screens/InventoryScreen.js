import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/colors";
import { Button } from "../components/Button";
import { Text } from "../components/Text";
import { TitleText } from "../components/TitleText";
import { NewPartModal } from "../components/NewPartModal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import Config from "../constants/config";
import { useToast } from "react-native-toast-notifications";
import { LottieLoader } from "lottie-loader-react-native";

const AUTH_HEADER = {
  Authorization: `QB-USER-TOKEN ${Config.userToken}`,
  "QB-Realm-Hostname": Config.hostName,
};

const Divider = () => {
  return <View style={styles.divider} />;
};

const RenderItem = ({ name, barcode, rowId, handleDeleteRecord }) => {
  return (
    <TouchableOpacity onPress={() => handleDeleteRecord({ rowId })}>
      <View style={styles.listItem}>
        <View style={styles.columnLeft}>
          <Text>{name}</Text>
        </View>
        <View style={[styles.columnRight, styles.borderLeftGray]}>
          <Text>{barcode}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Icon = ({ name }) => {
  return <MaterialCommunityIcons name={name} size={24} color="black" />;
};

const InventoryScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const toast = useToast();

  const handleAddRecord = ({ name, barcode }) => {
    axios
      .post(
        `${Config.baseUrl}/records`,
        {
          to: Config.tableId,
          data: [
            {
              7: {
                value: name,
              },
              8: {
                value: barcode,
              },
            },
          ],
        },
        {
          headers: {
            ...AUTH_HEADER,
          },
        }
      )
      .then(function (response) {
        handleFetchRecords();
        toast.show("Record added", {
          type: "success",
        });
      })
      .catch(function (error) {
        toast.show(`Failed to add record: \n${error}`, {
          type: "warning",
        });
      });
  };

  const handleFetchRecords = () => {
    setLoadingData(true);
    axios
      .post(
        `${Config.baseUrl}/records/query`,
        { from: Config.tableId, select: [3, 7, 8] },
        {
          headers: { ...AUTH_HEADER },
        }
      )
      .then(function (response) {
        setData(response.data.data.reverse());
        setLoadingData(false);
      })
      .catch(function (error) {
        toast.show(`Failed to load records \n${error}`, {
          type: "warning",
        });
      });
  };

  const handleDeleteRecord = ({ rowId }) => {
    Alert.alert("Delete record", "Are you sure?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () =>
          axios
            .delete(`${Config.baseUrl}/records`, {
              data: {
                from: Config.tableId,
                where: `{3.EQ.\'${rowId}\'}`,
              },
              headers: {
                ...AUTH_HEADER,
              },
            })
            .then(function (response) {
              handleFetchRecords();
              toast.show("Record deleted", {
                type: "success",
              });
            })
            .catch(function (error) {
              toast.show(`Failed to delete record \n${error}`, {
                type: "warning",
              });
            }),
      },
    ]);
  };

  useEffect(() => {
    handleFetchRecords({ setData });
  }, []);

  return (
    <View style={styles.screen}>
      <TitleText style={styles.title}>
        <Icon name="cogs" /> Parts list
      </TitleText>
      <View style={styles.listHeader}>
        <View style={styles.columnLeft}>
          <Text style={styles.listHeaderText}>name</Text>
        </View>
        <View style={[styles.columnRight, styles.borderLeftWhite]}>
          <Text style={styles.listHeaderText}>barcode</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        {loadingData ? (
          <View style={styles.lottieLoaderContainer}>
            <LottieLoader
              visible
              source={require("../assets/animations/mechanical-gears.json")}
              animationStyle={styles.lottieLoader}
              speed={1}
            />
          </View>
        ) : (
          <FlatList
            contentContainerStyle={styles.list}
            data={data}
            renderItem={(itemData) => {
              return (
                <RenderItem
                  name={itemData.item["7"].value}
                  barcode={itemData.item["8"].value}
                  rowId={itemData.item["3"].value}
                  handleDeleteRecord={handleDeleteRecord}
                />
              );
            }}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={Divider}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Add new part"
          style={styles.button}
          onPress={() => setModalVisible(true)}
        />
      </View>
      <NewPartModal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        handleAddRecord={handleAddRecord}
        icon={<Icon name="cog" />}
      />
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
    elevation: 3,
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
    maxHeight: Dimensions.get("window").height * 0.51,
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
  buttonContainer: {
    marginTop: 40,
    width: "80%",
  },
  button: {
    width: "100%",
  },
  lottieLoaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  lottieLoader: {
    width: Dimensions.get("window").width / 2,
    height: Dimensions.get("window").width / 2,
  },
});

export default InventoryScreen;
