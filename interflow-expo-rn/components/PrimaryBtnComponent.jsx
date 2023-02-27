import { View, Text, ImageBackground, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function PrimaryBtnComponent({ label, onPress, disabled }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={disabled && {opacity: 0.5}}>
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
            display: "flex",
            flexDirection: "row",
            justifyContent: label !== "PURCHASE" ? "center" : "space-between",
            alignItems: "center",
            paddingHorizontal: 20
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
          {
            label == "PURCHASE" &&
            <View style={{
              display: "flex",
              flexDirection: "row",
              width: "27%",
              height: "100%",
              justifyContent: "space-around",
              alignItems: "center",
            }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "white",
                }}

              >33</Text>
              <Image source={{
                uri: "https://res.cloudinary.com/ddbgaessi/image/upload/v1677272668/logo_kkdwhj.png"
              }}
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: "cover"
                }}
              />
            </View>

          }
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}
