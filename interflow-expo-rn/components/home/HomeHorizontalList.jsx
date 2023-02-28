import React from "react";
import { View, ScrollView, Text, StyleSheet, Image, FlatList } from "react-native";
import EventCardComponent from "./EventCardComponent";
import GameCardComponent from "./GameCardComponent";
import InterdropComponent from "./InterdropComponent";
import RevealComponent from "./RevealComponent";



const HomeHorizontalList = ({ items, type, onPress }) => {

  const renderGameItem = ({ item }) => {
    return (
      <GameCardComponent game={item} onPress={onPress} />
    );
  }

  const renderEventItem = ({ item }) => {
    return (
      <EventCardComponent key={item.id} event={item} onPress={onPress} />
    );
  };

  const renderRevealItem = ({ item }) => {
    return (
      <RevealComponent key={item.id} uri={item.uri} onPress={onPress} />
    );
  };
  
  const renderInterdropItem = ({ item }) => {
    return (
      <InterdropComponent key={item.id} uri={item.uri} onPress={onPress} />
    );
  };


  const Separator = () => {
    return (
      <View
        style={{
          height: 50,
          width: 1,
          backgroundColor: "white",
        }}
      />
    );
  }


  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          height: 60,
          alignItems: "center",
          marginLeft: 10,
        }}
      >
        <Text style={styles.title}>Next {type}</Text>
      </View>
      {type == "events" && (
        // <View
        //   style={{
        //     flex: 1,
        //     height: 260,
        //   }}
        // >
        <FlatList

          horizontal
          data={items}
          renderItem={renderEventItem}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          // ItemSeparatorComponent={Separator}
          contentContainerStyle={styles.contentContainer}

        //  extraData={selectedId}
        />
        // </View>
      )}


      {type == "reveals" && (
        <FlatList
          horizontal
          data={items}
          renderItem={renderRevealItem}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}

        //  extraData={selectedId}
        />
      )}

      {type == "games" && (

        <FlatList
          horizontal
          data={items}
          renderItem={renderGameItem}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        />
      )}

      {type == "interdrops" && (

        <FlatList
          horizontal
          data={items}
          renderItem={renderInterdropItem}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        />
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 260,
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    // backgroundColor: "gray",
    width: 1000
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
    marginLeft: 10,
    color: "black",
  },
});

export default HomeHorizontalList;
