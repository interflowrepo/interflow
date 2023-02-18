import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function AvatarPreviewComponent({item}) {
  return (
    <View key={item.id} style={styles.item}>
        <Image 
          source={{uri: item.url}}
          style={{width: 90, height: 90}}
        />
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      // height: 100,
    },
    item: {
      backgroundColor: "transparent",
      marginHorizontal: 10,
      marginTop: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      margin: 10,
      color: "white",
    },
  });