import { View, Text, Image, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";

export default function AnimationComponent({ actualIdx }) {
  const [IsFadedIn, setIsFadedIn] = useState(false)
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
      setIsFadedIn(true)


  }, [actualIdx]);

  const resolveUri = () => {
    if (actualIdx === "0") {
      return "https://cdn.discordapp.com/attachments/953339977083797504/1079124317008310342/Walletsvprueba.gif";
    } else if (actualIdx === "1") {
      return "https://res.cloudinary.com/ddbgaessi/image/upload/v1677305165/flota_juqmrm.gif";
    } else if (actualIdx === "2") {
      return "https://cdn.discordapp.com/attachments/953339977083797504/1079124317008310342/Walletsvprueba.gif";
    }
  };


  return (
    <>
      <Animated.Image
        source={{
          uri: resolveUri()
        }}
        style={{
          width: 400,
          height: 500,
          position: "absolute",
          zIndex: -1,
          opacity: fadeAnim,
        }}
        resizeMode="contain"
      />
      <Animated.Image
        source={{
          uri: "https://res.cloudinary.com/ddbgaessi/image/upload/v1677306884/base_soqfaa.png"
        }}
        style={{
          width: 400,
          height: 500,
          position: "absolute",
          zIndex: -2,
          opacity: fadeAnim,
          bottom: 50,
        }}
        resizeMode="contain"
      />
    </>
  );
}
