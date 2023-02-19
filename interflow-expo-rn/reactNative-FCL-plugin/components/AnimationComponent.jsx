import { View, Text, Image, Animated } from "react-native";
import React, { useEffect, useRef } from "react";

export default function AnimationComponent() {
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
    setTimeout(() => {
      fadeIn();
    }, 3000);
  }, []);

  return (
    <Animated.Image
      source={require("../assets/onboarding/avatar.png")}
      style={{
        width: 300,
        height: 400,
        position: "absolute",
        zIndex: -1,
        opacity: fadeAnim,
      }}
      resizeMode="contain"
    />
  );
}
