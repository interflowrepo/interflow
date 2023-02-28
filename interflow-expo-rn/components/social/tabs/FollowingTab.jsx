import { View, Text, StyleSheet } from "react-native";
import React from "react";
import PrimaryBtnComponent from "../../PrimaryBtnComponent";
import useUserData from "../../../hooks/useUserData";
import GridListComponent from "../../GridListComponent";

export default function FollowingTab({ onPressNoFollowing, onPress }) {
  // destructure the user from the AuthContext
  const { followingUsers } = useUserData();

  return (
    <View style={styles.centeredContainer}>
      {followingUsers.length > 0 ? (
        <GridListComponent
          data={followingUsers}
          numColumns={2}
          onPress={onPress}
        />
      ) : (
        <>
          <Text>You're not following anyone yet</Text>
          <PrimaryBtnComponent label="FIND FRIENDS" onPress={onPressNoFollowing} />
        </>
      )}
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
