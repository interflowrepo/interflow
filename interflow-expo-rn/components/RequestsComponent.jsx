import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import UserService from "../services/UserService";

export default function RequestsComponent() {
  const [result, setResult] = useState();

  const {userFullData} = useAuth();

//   console.log("userFullData from requests", userFullData)

  const userId = userFullData?.userExists?.id;

  //SOCIAL PART -------------------------------------------

  // //START TO FOLLOW A USER
  const followUnfollowUser = async (id) => {
    let data = {
      userToFollowId: "ca915194-5d83-4eaa-938f-06c836055aaf",
    };
    let result = await UserService.postFollowUnfollow(id, data);
    console.log("response", result);
    setResult(result);
  };

//  GET THE ACCOUNTS THAT THE USER IS FOLLOWING SORTED
  const getUserFollowing = async (id) => {
    let result = await UserService.getUserFollowing(id);
    console.log("response", result);
    setResult(result);
  };

  //GET THE ACCOUNTS THAT ARE FOLLOWING THE USER SORTED
  const getUserFollowers = async (id) => {
    let result = await UserService.getUserFollowers(id);
    console.log("response", result);
    setResult(result);
  };

  const getUserExplorePageData = async (id) => {
    let result = await UserService.getUserExplore(id);
    console.log("response", result);
    setResult(result);
  };

  const getRanking = async () => {
    let result = await UserService.getRaking();
    console.log("response", result);
    setResult(result);
  };

  //SOCIAL PART -------------------------------------------

  //CREATE A POST FOR THE USER
  const createPost = async (id) => {
    //get timestamp now
    let timestamp = new Date().getTime();
    let data = {
      nftId: "1234444",
      nftImageLink: "https/.testtttt",
      nftCollectionName: "First Post using Expo",
      nftType: "THE BEST",
      postText: "Let's make history",
      timestamp: timestamp.toString(),
      isOwner: true,
    };
    let result = await UserService.postCreatePost(id, data);
    console.log("response", result);
    setResult(result);
  };

  //THIS GET ALL POSTS FROM ALL USERS
  const getAllPosts = async () => {
    let result = await UserService.getAllPosts();
    console.log("response", result);
    setResult(result);
  };

  //GET ALL NFTS FROM A USER WITH NFT DATA
  const getUserNfts = async (id) => {
    let result = await UserService.getUserNfts(id);
    console.log("response", result);
    setResult(result);
  };

  const getUserCollectionData = async (id) => {
    let result = await UserService.getUserCollectionData(id);
    console.log("response", result);
    setResult(result);
  };

  const updateUserData = async (id) => {
    let data = {
      nickname: "FRLABS",
      bloctoAddress: "0x123121312342",
      dapperAddress: "0x62b61f9f7fc77f7e",
    };
    let result = await UserService.updateUserData(id, data);
    console.log("response", result);
    setResult(result);
  };

  return (
    <View style={styles.container}>
      <Button title={"Create Post"} onPress={() => createPost(userId)} />
      <Button title={"Get All Posts"} onPress={getAllPosts} />
      <Button title={"Get User Nfts"} onPress={() => getUserNfts(userId)} />
      <Button title={"Follow / Unfollow User"} onPress={() => followUnfollowUser(userId)} />
      <Button title={"Get User Following"} onPress={() => getUserFollowing(userId)} />
      <Button title={"Get User Followers"} onPress={() => getUserFollowers(userId)} />
      <Button
        title={"Get User Explore Page Data"}
        onPress={() => getUserExplorePageData(userId)}
      />
      <Button title={"Get Ranking"} onPress={getRanking} />
      <Button title={"Update User Data"} onPress={() => updateUserData(userId)} />
      <Button
        title={"Get User Collection Data"}
        onPress={() => getUserCollectionData(userId)}
      />
      {/* <View style={styles.userInfo}>
        <Text>{result}</Text>
      </View> */}
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