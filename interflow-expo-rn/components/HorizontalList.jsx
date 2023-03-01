import React from "react";
import { View, ScrollView, Text, StyleSheet, Image } from "react-native";
import AvatarPreviewComponent from "./customize/AvatarPreviewComponent";

const DATA = [
  {
    id: 1,
    title: "base",
    url: "https://res.cloudinary.com/ddbgaessi/image/upload/v1677585652/base-avatar-removebg-preview_xx7hlp.png",
  },
  {
    id: 2,
    title: "glasses",
    url: "https://res.cloudinary.com/ddbgaessi/image/upload/v1676665565/expo_1-removebg-preview_kbpvr1.png",

  },
  {
    id: 3,
    title: "inverted",
    url: "https://res.cloudinary.com/ddbgaessi/image/upload/v1677587578/avatar-4-removebg-preview_lua0cx.png",
  },
  {
    id: 4,
    title: "happy",
    url: "https://res.cloudinary.com/ddbgaessi/image/upload/v1677585308/doodly_nenkuo.png",
  },
  {
    id: 5,
    title: "base",
    url: "https://res.cloudinary.com/ddbgaessi/image/upload/v1677588421/template5_aiarys.png",
  },
];

const Divider = () => {
  return (
    <View
      style={{
        height: 0.5,
        width: "100%",
        backgroundColor: "rgba(100,100,100,0.5)",
      }}
    />
  );
};

const HorizontalList = ({ handleTemplateSelection, setSelectedCategory }) => {
  return (
    <View style={styles.container}>
      <View style={{
        display: "flex",
        flexDirection: "row",
        height: 70,
        alignItems: "center",
        marginLeft: 10,
      }}>
        <Image
          source={{
            uri: "https://res.cloudinary.com/ddbgaessi/image/upload/v1676667835/flovaty-removebg-preview_dj7vdp.png",
          }}
          style={{
            width: 30,
            height: 30,
          }}
        />
        <Text style={styles.title}>Flovatary</Text>
      </View>

      <ScrollView horizontal={true}>
        {DATA.map((item) => (
          <AvatarPreviewComponent key={item.id} item={item} handleTemplateSelection={handleTemplateSelection} setSelectedCategory={setSelectedCategory} />
        ))}
      </ScrollView>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 100,
  },
  item: {
    backgroundColor: "gray",
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    color: "white",
  },
});

export default HorizontalList;
