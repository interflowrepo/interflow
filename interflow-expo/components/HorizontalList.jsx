import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import AvatarPreviewComponent from "./customize/AvatarPreviewComponent";

const DATA = [
  { id: 1, title: "Item 1" , url:""},
  { id: 2, title: "Item 2", url:"" },
  { id: 3, title: "Item 3", url:"" },
  { id: 4, title: "Item 4", url:"" },
  { id: 5, title: "Item 5", url:"" },
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

const HorizontalList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flovatary</Text>
      <ScrollView horizontal={true}>
        {DATA.map((item) => (
          <AvatarPreviewComponent key={item.id} item={item} />
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
