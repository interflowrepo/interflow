import React from "react";
import { View, Text } from "react-native";
import GridListComponent from "../../GridListComponent";

const data = [
  { id: 1, title: "Item 1" },
  { id: 2, title: "Item 2" },
  { id: 3, title: "Item 3" },
  { id: 4, title: "Item 4" },
  { id: 5, title: "Item 5" },
  { id: 6, title: "Item 6" },
  { id: 7, title: "Item 7" },
  { id: 8, title: "Item 8" },
  { id: 9, title: "Item 9" },
  { id: 10, title: "Item 10" },
];

const ExploreTab = ({onPress}) => {
  return (
    <View
      style={{
        flex: 1,
        
      }}
    >

      <GridListComponent data={data} numColumns={2} onPress={onPress} />
    </View>
  );
};

export default ExploreTab;
