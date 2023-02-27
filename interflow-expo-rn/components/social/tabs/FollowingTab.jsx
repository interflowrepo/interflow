import { View, Text, StyleSheet } from "react-native";
import React from "react";
import PrimaryBtnComponent from "../../PrimaryBtnComponent";
// import useAuth from the AuthContext
import { useAuth } from "../../../contexts/AuthContext";

export default function FollowingTab({onPress}) {
  // destructure the user from the AuthContext

  return (
    <View style={styles.centeredContainer}>
      <Text>You're not following anyone yet</Text>
      <PrimaryBtnComponent label="FIND FRIENDS" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

 