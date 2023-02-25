import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export default function StepComponent({ step,idx,  actualIdx, setActualIdx }) {
  const styles = StyleSheet.create({
    image: {
      width: actualIdx == idx ? 50 : 40,
      height: actualIdx == idx ? 50 : 40,
    },
  });

  return (
    <TouchableOpacity
      onPress={() => {
        setActualIdx(idx);
      }}
      style={{
        backgroundColor: actualIdx == idx ? "white" : "transparent",
        borderRadius: 50,
        padding: 5,
        margin: 5,
        zIndex: 1,
      }}
    >
      {/* <Text>{step.label}</Text> */}
      <Image source={step.src} style={styles.image} />
    </TouchableOpacity>
  );
}
