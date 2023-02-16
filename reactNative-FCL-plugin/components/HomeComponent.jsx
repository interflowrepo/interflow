import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Button from "./Button";
// import * as Linking from "expo-linking";
import { useFcl } from "../contexts/FclContext";

export default function HomeComponent() {
  const {authenticate, getAllStoredData} = useFcl()
//   getAllStoredData()
//   const redirectUrl = Linking.createURL();
//   console.log(redirectUrl);
  return (
    <View style={styles.container}>
      <View style={styles.footerContainer}>
        <Button label="LOGIN" onPressAction={() => authenticate()} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
