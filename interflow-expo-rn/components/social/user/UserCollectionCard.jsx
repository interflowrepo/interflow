import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function UserCollectionCard({
  onPress,
  name,
  bgImage,
  nftLength,
  nft
}) {
  return (
    <TouchableOpacity
      onPress={() => onPress(nft)}
      style={{
        height: 100,
        width: "80%",
        backgroundColor: "#fff",
        elevation: 1,
        margin: 30,
      }}
    >
      <Image
        style={styles.backgroundImage}
        source={{
          uri: bgImage,
        }}
      />
      <Text style={styles.nameTitle}>Collection Name: {name}</Text>
      <Text style={styles.nameTitle}>User NFTs: {nftLength}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "80%",
    backgroundColor: "#fff",
    elevation: 1,
    margin: 30,
  },
  backgroundImage: {
    position: 'absolute',
    opacity: 0.80,
    borderRadius: 10,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  nameTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
    paddingLeft: 5,
    paddingTop: 3
  },
});
