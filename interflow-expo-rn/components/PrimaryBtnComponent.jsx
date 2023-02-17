import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";

export default function PrimaryBtnComponent({ label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          borderRadius: 50,
          height: 60,
          overflow: "hidden",
        }}
      >
        <ImageBackground
          source={require("../assets/avatar/bg(1).png")}
          style={{
            width: 300,
            height: 60,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* // linear gradient inverted */}
          <Text
            style={{
              color: "white",
              fontSize: 20,
              textTransform: "uppercase",
              fontWeight: "900",
            }}
          >
            {label}
          </Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}
