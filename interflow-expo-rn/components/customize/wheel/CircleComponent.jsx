import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  PanResponder,
  Animated,
  ImageBackground,
} from "react-native";

const CircleComponent = ({
  diameter,
  color,
  spinning,
  interpolatedRotation,
}) => {
  const circleStyle = {
    width: diameter,
    height: diameter,
    borderRadius: diameter / 2,
    // backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 99,
    
  };

  const textStyle = {
    position: "absolute",
    color: "white",
    fontSize: 24,
  };

  const letters = "ABCDEFGHIJKLMNOP".split("");
  const rotate = useRef(new Animated.Value(0)).current;

  return (
    // <ImageBackground
    //   source={require("../../../assets/avatar/bg(1).png")}
    //   style={circleStyle}
    // >
      <Animated.View
        style={[
          spinning && {
            transform: [
              { rotate: interpolatedRotation },
              { perspective: 1000 },
            ],
          },
          circleStyle,
        ]}
      >
        {letters.map((letter, index) => {
          const angle = (index * 360) / letters.length;
          const radians = angle * (Math.PI / 180);
          const x = (diameter / 2 + 30) * Math.cos(radians);
          const y = (diameter / 2 + 30) * Math.sin(radians);
          const rotation =
            Math.atan2(diameter / 2 - y, diameter / 2 - x) + Math.PI / 2;
          const rotateZ = `${rotation}rad`;
          const translateX = -4;
          const translateY = -6;

          return (
            <View
              key={index}
              style={[
                textStyle,
                { top: diameter / 2 + y, left: diameter / 2 + x },
                {
                  transform: [
                    { translateX },
                    { translateY },
                    { rotate: rotateZ },
                  ],
                },
              ]}
            >
              <Text
              style={{
                color: "white",
                fontSize: 16,
              }}
              >{letter}</Text>
            </View>
          );
        })}
      </Animated.View>
    // </ImageBackground>
  );
};

export default CircleComponent;
