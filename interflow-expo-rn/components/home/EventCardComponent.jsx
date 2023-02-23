import React from "react";
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from "react-native";

const EventCardComponent = ({ event, onPress }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <ImageBackground
        source={{
          uri: event.image,
        }}
        style={styles.header}
      >
        <Text style={styles.title}>{event.title}</Text>
        {/* Content for the header */}
      </ImageBackground>
      <View style={styles.footer}>
        {/* Content for the footer */}
        <View style={styles.footerElement}>
          <Text>{event.date}</Text>
        </View>
        <View style={styles.footerElement}>
          <Text>{event.location}</Text>
        </View>
        <View style={styles.footerElement}>
          <Text>check icon</Text>
        </View>
      </View>
    </TouchableOpacity>
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
    width: "40%",
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
  },
  header: {
    height: "84%",
    width: "100%",
    resizeMode: "contain",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  footer: {
    height: "16%",
    flexDirection: "row",
  },
  footerElement: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: "#ccc",
    borderRightWidth: 1,
  },
});

export default EventCardComponent;
