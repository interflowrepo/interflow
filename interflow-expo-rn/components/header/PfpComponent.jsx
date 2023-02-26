import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function PfpComponent({ pfpUrl }) {
  return (
    // <View style={styles.imgContainer}>
      <Image source={{ uri: pfpUrl }} style={styles.pfp} />
    // </View>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    height: 110,
    width: 110,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  pfp: {
    height: 40,
    width: 40,
    overflow: "hidden",
    borderRadius: 30,
  },
});
