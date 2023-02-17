import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function StepComponent({ step,idx,  actualIdx }) {
  const styles = StyleSheet.create({
    image: {
      width: actualIdx == idx ? 50 : 40,
      height: actualIdx == idx ? 50 : 40,
    },
  });

  return (
    <View>
      {/* <Text>{step.label}</Text> */}
      <Image source={step.src} style={styles.image} />
    </View>
  );
}
