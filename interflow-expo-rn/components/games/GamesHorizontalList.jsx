import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";

const VerticalGameCard = ({ backgroundImage, drops }) => {
  return (
    <ImageBackground style={styles.imgContainer} source={{ uri: backgroundImage }}  resizeMode={drops ? "contain" : "cover"}>
      {/* <Text>{name}</Text> */}
      {/* Additional content for the game card, such as game title and genre */}
    </ImageBackground>
  );
};

const GamesHorizontalList = ({ categories, drops }) => {
  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <>
          <View
            key={category.id}
            style={{
              display: "flex",
              flexDirection: "row",
              height: 80,
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <Text style={styles.title}> {category.title}</Text>
          </View>
          <ScrollView horizontal={true}>
            {category.games.map((game) => (
              <VerticalGameCard key={game.id} backgroundImage={game.uri} name={game.name} drops={drops}/>
            ))}
          </ScrollView>
        </>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // height: 100,
  },
  item: {
    backgroundColor: "gray",
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    margin: 10,
    color: "black",
  },

  imgContainer: {
    height:140,
    width: 100,
    margin: 20,
    elevation: 0.1,
    borderRadius: 10,
    // ios shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    // android shadow
    borderRadius: 12,
    overflow: "hidden",

    // Add additional styling as desired
  },
});

export default GamesHorizontalList;
