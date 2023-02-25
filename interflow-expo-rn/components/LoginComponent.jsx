import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function LoginComponent() {
  const { login, logout, userAuthData, auth, userFullData } =
    useAuth();
  console.log("getUserData inside login page: ", userAuthData);
  console.log("userFullData inside login page: ", userFullData);

  const getAllStorageData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      console.log("result", result);
      return result;
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <View style={styles.container}>
      {auth && (
        <>
          <View style={styles.userInfo}>
            {userAuthData && <Text>Welcome {userAuthData.email}</Text>}
          </View>
          <View style={styles.userInfo}>
            {userFullData && <Text>Welcome {userFullData.userExists.nickname}</Text>}
          </View>
        </>
      )}
      {!auth && <Button title={"Login"} onPress={login} />}
      {auth && <Button title="Logout" onPress={logout} />}
      <Button title="Get All" onPress={getAllStorageData} />
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
