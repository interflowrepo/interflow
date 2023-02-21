import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";

const VerticalGameCard = ({ backgroundImage, name }) => {
  return (
    <ImageBackground style={styles.imgContainer} source={{ uri: backgroundImage }}>
      <Text>{name}</Text>
      {/* Additional content for the game card, such as game title and genre */}
    </ImageBackground>
  );
};

const GamesHorizontalList = ({ categories }) => {
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
              <VerticalGameCard key={game.id} backgroundImage={game.uri} name={game.name}/>
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

    // Add additional styling as desired
  },
});

export default GamesHorizontalList;
