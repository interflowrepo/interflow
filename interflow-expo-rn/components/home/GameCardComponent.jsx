import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";


const GameCardComponent = ({ game, onPress }) => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <ImageBackground
          source={{
            uri: game.uri,
          }}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
          }}
        >
          <Text style={styles.title}>{game.title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },

  cardContainer: {
    width: "80%",
    height: 160,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
    // marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
    resizeMode: "center",
  },
});

export default GameCardComponent;
