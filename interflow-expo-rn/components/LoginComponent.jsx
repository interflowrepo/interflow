import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function LoginComponent() {
  const { login, logout, userAuthData, getUserData, auth } = useAuth();
  console.log("getUserData inside login page: ", userAuthData);

  useEffect(() => {
    getUserData();
  }, [auth]);

  return (
    <View style={styles.container}>
      {auth && (
        <View style={styles.userInfo}>
          {userAuthData && <Text>Welcome {userAuthData.email}</Text>}
        </View>
      )}
      {!auth && <Button title={"Login"} onPress={login} />}
      {auth && <Button title="Logout" onPress={logout} />}
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
