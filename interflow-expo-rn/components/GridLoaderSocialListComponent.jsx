import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import ContentLoader from "react-native-easy-content-loader";

const GridLoaderSocialListComponent = ({
  numColumns,
  onPress
}) => {

  const renderLoader = () => {
    return (
      <View>
        <ContentLoader
          active
          avatar
          avatarStyles={{
            width: 120,
            height: 100,
            borderRadius: 20,
          }}
          containerStyles={{
            flex: 0.5,
            flexDirection: "column",
          }}
          pRows={3}
          pWidth={["80%", "80%", "80%"]}
          title={false}
        />
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
      data={[1, 2, 3, 4, 5, 6, 7, 8]}
      renderItem={renderLoader}
      keyExtractor={(item) => item}
      numColumns={2}
      style={styles.centeredContainer}
    />
  );
};

export default GridLoaderSocialListComponent;
