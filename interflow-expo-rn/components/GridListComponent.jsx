import React, { useCallback, useMemo } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { useFcl } from "../contexts/FclContext";
import PrimaryBtnComponent from "./PrimaryBtnComponent";
const GridListComponent = ({ data, numColumns, onPress, isProfile }) => {
  const { authenticate } = useFcl();
  console.log("data", data);
  const renderItem = ({ item }) => {
    return (
      <>
        {item == "User has no NFTs" ? (
          <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 200,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "grey",
              marginBottom: 20,
            }}
          >
            You don't have any NFT Collection
          </Text>
          <PrimaryBtnComponent
            label={"CONNECT WALLETS"}
            onPress={() => authenticate()}
          />
        </View>
        ) : (
          <View style={styles.item}>
            <Image
              style={styles.backgroundImage}
              source={{
                uri:
                  item[0]?.collectionSquareImage ||
                  item.bgImage ||
                  "https://interflow-app.s3.amazonaws.com/bgImage.png",
              }}
            />
            <TouchableOpacity
              onPress={() => onPress(item)}
              style={{ height: 100, width: 100 }}
            ></TouchableOpacity>
          </View>
        )}
      </>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: !isProfile ? 62 : 0,
    },
    item: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 100,
      width: 100,
      marginVertical: 10,
      marginHorizontal: 10,

      borderRadius: 3,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: "lightgrey",
      backgroundColor: "transparent",
    },
    image: {
      flex: 1,
      justifyContent: "center",
    },
    backgroundImage: {
      position: "absolute",
      borderRadius: 50,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });

  console.log("data", data);

  return (
    <>
      {data[0] == "NOT-LOGGED" ? (
        <View
          style={{
            height: 80,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 10,
          }}
        >
          <Text style={{ fontSize: 24 }}>You are not Logged!</Text>
        </View>
      ) : (
        <>
          {data.length >= 1 ? (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={numColumns}
              style={styles.container}
            />
          ) : (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 200,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "grey",
                  marginBottom: 20,
                }}
              >
                You don't have any NFT Collection
              </Text>
              <PrimaryBtnComponent
                label={"CONNECT WALLETS"}
                onPress={() => authenticate()}
              />
            </View>
          )}
        </>
      )}
    </>
  );
};

export default GridListComponent;
