import { View, Text, Animated } from "react-native";
import React, { useRef, useEffect } from "react";

export default function StepTxtComponent({ txt }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();

    setTimeout(() => {
        fadeOut();
    }, 3000);
  }, []);

  return (
    <Animated.View
      style={{
        // Bind opacity to animated value
        opacity: fadeAnim,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          textAlign: "center",
          padding: 40,
        }}
      >
        {txt}
      </Text>
    </Animated.View>
  );
}
