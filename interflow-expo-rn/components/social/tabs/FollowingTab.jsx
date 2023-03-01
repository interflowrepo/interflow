import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import PrimaryBtnComponent from "../../PrimaryBtnComponent";
import useUserData from "../../../hooks/useUserData";
import GridListComponent from "../../GridListComponent";
import GridSocialListComponent from "../../GridSocialListComponent";

export default function FollowingTab({ onPressNoFollowing, onPress }) {
  // destructure the user from the AuthContext
  const { followingUsers, getFollowingUsers } = useUserData();

  useEffect(() => {
    getFollowingUsers();
  }, [])

  return (
    <View style={styles.centeredContainer}>
      {followingUsers.length > 0 ? (
        <GridSocialListComponent
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
