import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function InterdropComponent({ uri, onPress, idx }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          height: 100,
          width: 100,
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          marginVertical:20,
          marginRight:30,
          marginLeft:20,
          padding:10,
        }}
      >
        <Image
          style={{
            height:  100,
            width:  100,
            borderRadius: 10,

          }}
          source={{ uri: uri }}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
}
