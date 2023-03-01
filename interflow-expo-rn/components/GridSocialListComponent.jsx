import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import ContentLoader from "react-native-easy-content-loader";

const GridSocialListComponent = ({ data, numColumns, onPress }) => {
  console.log("data ---------------- ", data);

  const renderItem = ({ item }) => {
    return (
      <View>
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
          <Image
            style={styles.avatarImage}
            source={{
              uri: item.pfpImage,
            }}
          />
        </View>
        <View style={styles.itemText}>
          <Text style={styles.userText}>@{item.nickname}</Text>
          <Text style={styles.userTextAddr}>{item.address}</Text>
          <View style={{ marginTop: 5 }}>
            {item.collectionInCommon.length > 0 && (
              <>
                <Text style={styles.userTextAddr}>Collection in common:</Text>
                <Text style={styles.userTextAddr}>
                  {item.collectionInCommon.length > 1
                    ? item.collectionInCommon[0] +
                      "..." +
                      item.collectionInCommon.length
                    : item.collectionInCommon}
                </Text>
              </>
            )}
          </View>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    itemText: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      marginHorizontal: 20,
    },
    userText: {
      fontSize: 12,
    },
    userTextAddr: {
      fontSize: 8,
    },
    item: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 100,
      width: 120,
      marginVertical: 10,
      marginHorizontal: 10,

      borderRadius: 3,
      borderRadius: 20,
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
      borderRadius: 20,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    avatarImage: {
      position: "absolute",
      bottom: -6,
      left: 0,
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    centeredContainer: {
      flex: 1,
    },
  });

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      style={styles.container}
    />
  );
};

export default GridSocialListComponent;
