import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function RevealComponent({ uri, onPress, idx }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          height: 160,
          width: 160,
          display:"flex",
          alignItems:"center",
          justifyContent:"center"
        }}
      >
        <Image
          style={{
            height: idx == 0 ? 120 : 160,
            width: idx == 0 ? 120 : 160,
            borderRadius: 10,
          }}
          source={{ uri: uri }}
        />
      </View>
    </TouchableOpacity>
  );
}
