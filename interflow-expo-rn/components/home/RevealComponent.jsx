import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function RevealComponent({ uri, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          height: 160,
          width: 160,
        }}
      >
        <Image
          style={{
            height: 160,
            width: 160,
            borderRadius: 10,
          }}
          source={{ uri: uri }}
        />
      </View>
    </TouchableOpacity>
  );
}
