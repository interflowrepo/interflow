import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
//collectionSquareImage
const GridListComponent = ({ data, numColumns, onPress, isProfile }) => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
        <Image style={styles.backgroundImage} source={{
        uri: item[0].collectionSquareImage,
        }} />
        <TouchableOpacity
          onPress={() => onPress(item)}
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "black",
            }}
          >
            {item[0].collectionIdentifier}
          </Text>
        </TouchableOpacity>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: !isProfile ? 62 : 0,
    },
    item: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 100,
      width: 100,
      marginVertical: 10,
      marginHorizontal: 10,

      borderRadius: 3,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: "lightgrey",
      backgroundColor: "transparent",
    },
    image: {
      flex: 1,
      justifyContent: 'center',
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });

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

export default GridListComponent;
