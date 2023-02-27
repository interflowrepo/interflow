import React from "react";
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const EventCardComponent = ({ event, onPress }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <ImageBackground
        source={{
          uri: event.image,
        }}
        style={styles.bgImg}
      >
        <LinearGradient
        colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.1)']}
        style={styles.overlay}
      />
        <Text style={styles.title}>{event.title}</Text>
        {/* Content for the bgImg */}
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
      </ImageBackground>
    
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
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  cardContainer: {
    width: 300,
    height: 160,
    borderRadius: 12,
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
  bgImg: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius:12,
    overflow: "hidden",
  },
  footer: {
    height: "16%",
    flexDirection: "row",
    position:"absolute",
    bottom:0,
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
