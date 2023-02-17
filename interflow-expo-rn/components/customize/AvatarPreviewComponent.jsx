import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function AvatarPreviewComponent({item}) {
  return (
    <View key={item.id} style={styles.item}>
    <Text>{item.title}</Text>
  </View>
  )
}

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