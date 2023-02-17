import { View, Text, StyleSheet } from "react-native";
import React from "react";
import StepComponent from "./StepComponent";



export default function StepperComponent({steps, actualIdx}) {
  return (
    <View style={styles.container}>
      {steps.map((step, i) => (
        <StepComponent key={i} step={step} idx={i} actualIdx={actualIdx} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: 100,
    position: "absolute",
    marginTop:60
  },
});
