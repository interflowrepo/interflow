import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const GridListComponent = ({ data, numColumns, onPress }) => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
        <TouchableOpacity onPress={onPress} style={{flex:1}}>
        <Text>{item.title}</Text>
    </TouchableOpacity>
      </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 62,
  },
  item: {
    backgroundColor: "white",
    height: 140,
    marginVertical: 10,
    marginHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    elevation: 1,
    borderRadius: 3,
  },
});

export default GridListComponent;
