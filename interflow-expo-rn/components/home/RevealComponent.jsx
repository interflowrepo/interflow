import { View, Text, Image } from "react-native";
import React from "react";

export default function RevealComponent({ uri }) {
  return (
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
  );
}
