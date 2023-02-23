import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import restClient from "../config/RestClient";
import UserService from "../services/UserService";

export default function RequestsComponent() {

  useEffect(() => {
  }, []);

  const getRequest = async () => {
    let id = "8d080d7d-c213-496e-b646-74647fe69880"
    let result = await UserService.getUserCollectionData(id)
    console.log('response', result)
  }

  return (
    <View style={styles.container}>
      <Button title={"Login"} onPress={getRequest} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    width: 50,
    height: 50,
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
});
